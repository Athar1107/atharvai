import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function env(name: string): string | undefined {
  const raw = process.env[name];
  if (raw === undefined) return;
  return raw.replace(/^\ufeff/, '').replace(/\u200b/g, '').trim();
}

/** Gmail app passwords are often pasted with spaces; SMTP expects 16 chars without spaces. */
function smtpPassword(): string | undefined {
  const p = env('SMTP_PASS');
  if (!p) return;
  return p.replace(/\s+/g, '');
}

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

type MaybeSmtpErr = Error & {
  code?: string;
  responseCode?: number;
  response?: string;
};

type EmailTemplate = {
  text: string;
  html: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function smtpErrorText(err: unknown): string {
  if (!(err instanceof Error)) return String(err);
  const e = err as MaybeSmtpErr;
  return [e.message, e.response, e.code, String(e.responseCode ?? '')].filter(Boolean).join(' ');
}

function classifySmtpFailure(text: string): string {
  const t = text.toLowerCase();
  if (
    /invalid login|authentication failed|535|534|auth failed|username and password not accepted|eauth|bad credentials|application-specific password|less secure app/i.test(
      text
    )
  ) {
    return 'smtp_auth_failed';
  }
  if (/econnrefused|etimedout|enotfound|ehostunreach|getaddrinfo|connection closed|socket|connect/i.test(t)) {
    return 'smtp_connection_failed';
  }
  if (/certificate|ssl|tls|unable_to_verify|self signed|cert_authority_invalid/i.test(t)) {
    return 'smtp_tls_failed';
  }
  if (/550|552|553|554|message rejected|not permitted|sender|from address/i.test(text)) {
    return 'smtp_message_rejected';
  }
  return 'send_failed';
}

function createTransporter(
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string
) {
  const gmailHost = host.toLowerCase().includes('gmail');
  if (gmailHost) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure && port === 587
  });
}

function contactOwnerTemplate(name: string, email: string, message: string): EmailTemplate {
  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  }).format(new Date());
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: Portfolio contact from ${name}`
  )}`;

  return {
    text: [
      'New portfolio contact message',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Submitted: ${submittedAt} IST`,
      '',
      'Message:',
      message
    ].join('\n'),
    html: `
      <div style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfe7f3;border-radius:16px;overflow:hidden;">
          <div style="padding:28px 32px;background:#0f172a;color:#ffffff;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd;">Portfolio Contact</p>
            <h1 style="margin:0;font-size:24px;line-height:1.3;">New message from ${safeName}</h1>
          </div>
          <div style="padding:28px 32px;">
            <div style="margin-bottom:24px;padding:18px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;">
              <p style="margin:0 0 10px;font-size:14px;color:#64748b;">Sender</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;">${safeName}</p>
              <p style="margin:6px 0 0;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a></p>
              <p style="margin:12px 0 0;font-size:13px;color:#64748b;">Submitted ${escapeHtml(submittedAt)} IST</p>
            </div>
            <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#334155;">Message</p>
            <div style="padding:18px 20px;border-left:4px solid #2563eb;background:#eff6ff;border-radius:10px;color:#172033;font-size:16px;line-height:1.65;">
              ${safeMessage}
            </div>
            <div style="margin-top:28px;">
              <a href="${escapeHtml(mailto)}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#2563eb;color:#ffffff;font-weight:700;text-decoration:none;">Reply to ${safeName}</a>
            </div>
          </div>
          <div style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
            This email was sent from your portfolio contact form.
          </div>
        </div>
      </div>
    `
  };
}

function senderReceiptTemplate(name: string): EmailTemplate {
  const safeName = escapeHtml(name);

  return {
    text: [
      `Hi ${name},`,
      '',
      'Thanks for reaching out through my portfolio contact form. I received your message and will reply when I can.',
      '',
      'Best,',
      'Atharv'
    ].join('\n'),
    html: `
      <div style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dfe7f3;border-radius:16px;overflow:hidden;">
          <div style="padding:26px 30px;background:#2563eb;color:#ffffff;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#dbeafe;">Message Received</p>
            <h1 style="margin:0;font-size:24px;line-height:1.3;">Thanks for reaching out</h1>
          </div>
          <div style="padding:28px 30px;font-size:16px;line-height:1.65;color:#334155;">
            <p style="margin:0 0 16px;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;">Thanks for contacting me through my portfolio. I received your message and will reply when I can.</p>
            <p style="margin:0;">Best,<br/><strong style="color:#0f172a;">Atharv</strong></p>
          </div>
          <div style="padding:16px 30px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
            This is an automatic confirmation from the portfolio contact form.
          </div>
        </div>
      </div>
    `
  };
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = isNonEmptyString(body.name) ? body.name.trim() : '';
  const email = isNonEmptyString(body.email) ? body.email.trim() : '';
  const message = isNonEmptyString(body.message) ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }
  if (message.length > 10000) {
    return NextResponse.json({ ok: false, error: 'message_too_long' }, { status: 400 });
  }

  const host = env('SMTP_HOST');
  const user = env('SMTP_USER');
  const pass = smtpPassword();
  const to = env('SMTP_TO') || user;
  const fromRaw = env('SMTP_FROM') || user || '';
  const from = fromRaw.replace(/^["']|["']$/g, '').trim();

  if (!host || !user || !pass || !to || !from) {
    return NextResponse.json({ ok: false, error: 'mail_not_configured' }, { status: 503 });
  }

  const portRaw = env('SMTP_PORT');
  const port = portRaw ? Number(portRaw) : 587;
  const secure =
    env('SMTP_SECURE') === 'true' || env('SMTP_SECURE') === '1' || port === 465;

  try {
    const transporter = createTransporter(host, port, secure, user, pass);

    const subject = `Portfolio contact: ${name}`;
    const ownerEmail = contactOwnerTemplate(name, email, message);

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: ownerEmail.text,
      html: ownerEmail.html
    });

    const skipReceipt =
      env('SMTP_SEND_RECEIPT_TO_SENDER') === 'false' ||
      env('SMTP_SEND_RECEIPT_TO_SENDER') === '0';
    const sameMailbox = email.toLowerCase() === to.toLowerCase();
    if (!skipReceipt && !sameMailbox) {
      try {
        const receiptEmail = senderReceiptTemplate(name);

        await transporter.sendMail({
          from,
          to: email,
          subject: 'Thanks - I received your message',
          text: receiptEmail.text,
          html: receiptEmail.html
        });
      } catch (receiptErr) {
        console.error('[api/contact] receipt to sender failed', receiptErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('[api/contact]', err);
    const fullText = smtpErrorText(err);
    const error = classifySmtpFailure(fullText);
    const isDev = process.env.NODE_ENV === 'development';
    const devHint =
      isDev && err instanceof Error ? err.message.slice(0, 500) : undefined;
    return NextResponse.json({ ok: false, error, ...(devHint ? { devHint } : {}) }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

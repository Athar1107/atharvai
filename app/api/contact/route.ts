import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const LOGO_CID = 'portfolio-logo';
const LOGO_PATH = 'public/logo.png';

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

function logoAttachment() {
  return {
    filename: 'logo.png',
    path: LOGO_PATH,
    cid: LOGO_CID
  };
}

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
      <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
        <div style="max-width:750px;margin:0 auto;padding:34px 30px 36px;background:#050505;">
          <div style="padding-bottom:28px;border-bottom:1px solid #232323;">
            <img src="cid:${LOGO_CID}" width="156" alt="Atharv portfolio" style="display:block;width:156px;max-width:156px;height:auto;border:0;outline:none;text-decoration:none;" />
          </div>

          <div style="padding:34px 0 0;">
            <h1 style="margin:0 0 18px;font-size:26px;line-height:1.3;font-weight:800;color:#ffffff;">New portfolio request from ${safeName}</h1>
            <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#d9e2ef;">
              A new message arrived through your portfolio contact form. Reply directly to
              <a href="mailto:${safeEmail}" style="color:#ff7a1a;text-decoration:underline;">${safeEmail}</a>.
            </p>

            <div style="margin:0 0 28px;padding:28px 26px;border:1px solid #242424;border-radius:12px;background:#111111;">
              <p style="margin:0 0 24px;font-size:14px;line-height:1.4;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#777777;">Inquiry Summary</p>
              <div style="margin:0 0 16px;">
                <span style="display:inline-block;width:150px;color:#858585;font-size:16px;">Name</span>
                <strong style="color:#ffffff;font-size:16px;">${safeName}</strong>
              </div>
              <div style="margin:0 0 16px;">
                <span style="display:inline-block;width:150px;color:#858585;font-size:16px;">Email</span>
                <a href="mailto:${safeEmail}" style="color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">${safeEmail}</a>
              </div>
              <div style="margin:0;">
                <span style="display:inline-block;width:150px;color:#858585;font-size:16px;">Submitted</span>
                <strong style="color:#ffffff;font-size:16px;">${escapeHtml(submittedAt)} IST</strong>
              </div>
            </div>

            <div style="margin:0 0 30px;padding:24px 26px;border:1px solid #242424;border-radius:12px;background:#111111;">
              <p style="margin:0 0 16px;font-size:14px;line-height:1.4;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#777777;">Message</p>
              <div style="color:#f4f7fb;font-size:16px;line-height:1.75;">
              ${safeMessage}
              </div>
            </div>

            <p style="margin:0 0 34px;font-size:16px;line-height:1.7;color:#d9e2ef;">
              You can reply directly from this email or use this quick reply link:
              <a href="${escapeHtml(mailto)}" style="color:#ff7a1a;text-decoration:underline;">Reply to ${safeName}</a>.
            </p>
          </div>

          <div style="padding-top:28px;border-top:1px solid #232323;color:#505050;font-size:14px;">
            (c) ${new Date().getFullYear()} ATHARV. All rights reserved.
          </div>
        </div>
      </div>
    `
  };
}

function senderReceiptTemplate(name: string, replyAddress: string): EmailTemplate {
  const safeName = escapeHtml(name);
  const safeReplyAddress = escapeHtml(replyAddress);

  return {
    text: [
      `Hey ${name}, I've got your message!`,
      '',
      'Thank you for reaching out through my portfolio. I received your message and will get back to you soon.',
      '',
      `In the meantime, you can reply to this email or reach me directly at ${replyAddress}.`,
      '',
      'Best,',
      'Atharv'
    ].join('\n'),
    html: `
      <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
        <div style="max-width:750px;margin:0 auto;padding:34px 30px 36px;background:#050505;">
          <div style="padding-bottom:28px;border-bottom:1px solid #232323;">
            <img src="cid:${LOGO_CID}" width="156" alt="Atharv portfolio" style="display:block;width:156px;max-width:156px;height:auto;border:0;outline:none;text-decoration:none;" />
          </div>

          <div style="padding:34px 0 0;">
            <h1 style="margin:0 0 18px;font-size:26px;line-height:1.3;font-weight:800;color:#ffffff;">Hey ${safeName}, I've got your message!</h1>
            <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#d9e2ef;">
              Thank you for reaching out through my portfolio. I received your message and will get back to you soon.
            </p>

            <div style="margin:0 0 30px;padding:28px 26px;border:1px solid #242424;border-radius:12px;background:#111111;">
              <p style="margin:0 0 24px;font-size:14px;line-height:1.4;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#777777;">Your Inquiry Summary</p>
              <div style="margin:0 0 16px;">
                <span style="display:inline-block;width:150px;color:#858585;font-size:16px;">Status</span>
                <strong style="color:#ffffff;font-size:16px;">Received</strong>
              </div>
              <div style="margin:0;">
                <span style="display:inline-block;width:150px;color:#858585;font-size:16px;">Reply time</span>
                <strong style="color:#ffffff;font-size:16px;">As soon as possible</strong>
              </div>
            </div>

            <p style="margin:0 0 34px;font-size:16px;line-height:1.7;color:#d9e2ef;">
              In the meantime, feel free to reply to this email or reach me directly at
              <a href="mailto:${safeReplyAddress}" style="color:#ff7a1a;text-decoration:underline;">${safeReplyAddress}</a>.
            </p>
          </div>

          <div style="padding-top:28px;border-top:1px solid #232323;color:#505050;font-size:14px;">
            (c) ${new Date().getFullYear()} ATHARV. All rights reserved.
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
      html: ownerEmail.html,
      attachments: [logoAttachment()]
    });

    const skipReceipt =
      env('SMTP_SEND_RECEIPT_TO_SENDER') === 'false' ||
      env('SMTP_SEND_RECEIPT_TO_SENDER') === '0';
    const sameMailbox = email.toLowerCase() === to.toLowerCase();
    if (!skipReceipt && !sameMailbox) {
      try {
        const receiptEmail = senderReceiptTemplate(name, to);

        await transporter.sendMail({
          from,
          to: email,
          subject: 'Thanks - I received your message',
          text: receiptEmail.text,
          html: receiptEmail.html,
          attachments: [logoAttachment()]
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

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

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`
    });

    const skipReceipt =
      env('SMTP_SEND_RECEIPT_TO_SENDER') === 'false' ||
      env('SMTP_SEND_RECEIPT_TO_SENDER') === '0';
    const sameMailbox = email.toLowerCase() === to.toLowerCase();
    if (!skipReceipt && !sameMailbox) {
      try {
        await transporter.sendMail({
          from,
          to: email,
          subject: 'Thanks — I received your message',
          text: `Hi ${name},\n\nThanks for reaching out through my portfolio contact form. I got your message and will reply when I can.\n\n—`,
          html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for reaching out through my portfolio contact form. I got your message and will reply when I can.</p>`
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

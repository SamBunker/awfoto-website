// Cloudflare Pages Function — POST /api/contact
// Relays the contact form through the Cloudflare Email Sending REST API.
// (Pages Functions can't use the native send_email binding — that's Workers
// only — so we call the REST endpoint with a scoped API token.)
//
// Required environment variables (Cloudflare Pages dashboard →
// Settings → Environment variables; mark CF_EMAIL_TOKEN as a Secret):
//   CF_ACCOUNT_ID   - your Cloudflare account ID
//   CF_EMAIL_TOKEN  - API token with the "Email Sending: Send" permission
//   CONTACT_TO      - inbox that receives submissions
//   CONTACT_FROM    - sender on a domain onboarded to Email Sending
// Optional:
//   CONTACT_TO_NAME   - display name for the recipient
//   CONTACT_FROM_NAME - display name for the sender (default "AW Design & Foto")

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v) => (typeof v === 'string' ? v.trim() : '');
const escapeHtml = (v) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const honeypot = clean(payload.company); // hidden field; bots fill it in

  // Silently accept and drop obvious bots so they don't retry.
  if (honeypot) return json({ ok: true });

  // Validation
  if (!name || name.length > 120) return json({ ok: false, error: 'Please enter your name.' }, 400);
  if (!isEmail(email)) return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  if (!message || message.length < 5) return json({ ok: false, error: 'Please enter a message.' }, 400);
  if (message.length > 5000) return json({ ok: false, error: 'That message is a bit too long.' }, 400);

  if (!env.CF_ACCOUNT_ID || !env.CF_EMAIL_TOKEN || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ ok: false, error: 'Email is not configured yet.' }, 500);
  }

  const body = {
    to: env.CONTACT_TO_NAME
      ? { address: env.CONTACT_TO, name: env.CONTACT_TO_NAME }
      : env.CONTACT_TO,
    from: { address: env.CONTACT_FROM, name: env.CONTACT_FROM_NAME || 'AW Design & Foto' },
    reply_to: { address: email, name },
    subject: `New message from ${name} — AW Design & Foto`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html:
      `<h2>New website message</h2>` +
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
      `<p><strong>Message:</strong></p>` +
      `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  };

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CF_EMAIL_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    console.error('Email send failed', res.status, JSON.stringify(data?.errors || ''));
    return json({ ok: false, error: 'Could not send right now. Please try again later.' }, 502);
  }

  return json({ ok: true });
}

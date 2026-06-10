// Cloudflare Pages Function — POST /api/contact
// Receives the contact form and relays it through the SendGrid v3 REST API.
//
// Required environment variables (set in the Cloudflare Pages dashboard →
// Settings → Environment variables; mark SENDGRID_API_KEY as a Secret):
//   SENDGRID_API_KEY  - SendGrid API key with "Mail Send" permission
//   CONTACT_TO        - inbox that receives submissions (e.g. andrew@awdesignfoto.com)
//   CONTACT_FROM      - a SendGrid *verified* sender address (e.g. noreply@awdesignfoto.com)
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

  if (!env.SENDGRID_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ ok: false, error: 'Email is not configured yet.' }, 500);
  }

  const sgBody = {
    personalizations: [
      {
        to: [{ email: env.CONTACT_TO, name: env.CONTACT_TO_NAME || undefined }],
        subject: `New message from ${name} — AW Design & Foto`,
      },
    ],
    from: { email: env.CONTACT_FROM, name: env.CONTACT_FROM_NAME || 'AW Design & Foto' },
    reply_to: { email, name },
    content: [
      {
        type: 'text/plain',
        value: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      },
      {
        type: 'text/html',
        value:
          `<h2>New website message</h2>` +
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
          `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
          `<p><strong>Message:</strong></p>` +
          `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      },
    ],
  };

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(sgBody),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('SendGrid error', res.status, detail);
    return json({ ok: false, error: 'Could not send right now. Please try again later.' }, 502);
  }

  return json({ ok: true });
}

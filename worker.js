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

async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405);

  let payload;
  try { payload = await request.json(); }
  catch { return json({ ok: false, error: 'Invalid request.' }, 400); }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const honeypot = clean(payload.company);

  if (honeypot) return json({ ok: true });

  if (!name || name.length > 120) return json({ ok: false, error: 'Please enter your name.' }, 400);
  if (!isEmail(email)) return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  if (!message || message.length < 5) return json({ ok: false, error: 'Please enter a message.' }, 400);
  if (message.length > 5000) return json({ ok: false, error: 'That message is a bit too long.' }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ ok: false, error: 'Email is not configured yet.' }, 500);
  }

  const fromName = env.CONTACT_FROM_NAME || 'AW Design & Foto';
  const fromAddress = env.CONTACT_FROM || 'noreply@sambunker.com';
  const toAddress = env.CONTACT_TO_NAME
    ? `${env.CONTACT_TO_NAME} <${env.CONTACT_TO}>`
    : env.CONTACT_TO;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: `${fromName} <${fromAddress}>`,
      to: [toAddress],
      reply_to: `${name} <${email}>`,
      subject: `New message from ${name} — AW Design & Foto`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:
        `<h2>New website message</h2>` +
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Message:</strong></p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error('Resend error', res.status, JSON.stringify(data));
    return json({ ok: false, error: 'Could not send right now. Please try again later.' }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};

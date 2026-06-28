import { useState } from 'react';
import { SOCIALS } from '../data/siteData';
import { ArrowRight, ArrowUpRight } from './icons';
import '../styles/Contact.css';

const TURNSTILE_SITEKEY = '0x4AAAAAADsZRBjS3OQWWK60';
const SITEVERIFY_URL = 'https://turnstile-siteverify-awfoto.samuelbunker.workers.dev';

const EMPTY = { name: '', email: '', message: '', company: '' };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');

    try {
      const tsToken = document.querySelector('[name="cf-turnstile-response"]')?.value || '';
      if (!tsToken) {
        setStatus('error');
        setError('Please complete the security check.');
        return;
      }

      const tsRes = await fetch(SITEVERIFY_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: tsToken }),
      });
      const tsData = await tsRes.json().catch(() => ({}));
      if (!tsData.success) {
        setStatus('error');
        setError('Security check failed. Please try again.');
        if (window.turnstile) window.turnstile.reset();
        return;
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('success');
        setForm(EMPTY);
        if (window.turnstile) window.turnstile.reset();
      } else {
        setStatus('error');
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-aside">
        <div className="contact-aside-header">
          <p className="contact-aside-kicker">Get in Touch</p>
          <h2 className="display contact-aside-title">Let's Talk.</h2>
        </div>

        <hr className="contact-aside-divider" />

        <div className="contact-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact-social">
              <span>{s.label}</span>
              <ArrowRight />
            </a>
          ))}
        </div>

        <div className="contact-flags" aria-hidden="true">
          <span className="contact-flag contact-flag--usa" title="United States" />
          <img src="/Coat_of_arms_of_Bavaria.svg" alt="" className="contact-flag" title="Bavaria" />
          <img src="/Coat_of_arms_of_Germany.svg" alt="" className="contact-flag" title="Germany" />
        </div>
      </div>

      <div className="contact-main">
        <div className="contact-headings">
          <p className="fraktur contact-fraktur">Bereit Für Den Sieg</p>
          <h3 className="display contact-heading">Drop a Message</h3>
          <p className="contact-lede">
            Got a game to cover, a story to tell, or a project in mind? Send the
            details and let's make something worth remembering.
          </p>
        </div>

        {status === 'success' ? (
          <div className="contact-success" role="status">
            <span className="contact-success-mark" aria-hidden="true">✓</span>
            <h4>Message sent.</h4>
            <p>Thanks for reaching out — I'll get back to you soon.</p>
            <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="cf-name">Name <span>*</span></label>
                <input id="cf-name" type="text" required placeholder="Who are you?"
                  autoComplete="name" value={form.name} onChange={update('name')} />
              </div>

              <div className="field">
                <label htmlFor="cf-email">Email Address <span>*</span></label>
                <input id="cf-email" type="email" required placeholder="Where do we reply?"
                  autoComplete="email" value={form.email} onChange={update('email')} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="cf-message">Message <span>*</span></label>
              <textarea id="cf-message" rows="4" required placeholder="Tell the story..."
                value={form.message} onChange={update('message')} />
            </div>

            {/* Honeypot — hidden from humans, catches bots */}
            <div className="contact-hp" aria-hidden="true">
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" type="text" tabIndex={-1} autoComplete="off"
                value={form.company} onChange={update('company')} />
            </div>

            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITEKEY}
              data-action="turnstile-spin-v1"
              data-theme="dark"
            />

            {status === 'error' && <p className="contact-error" role="alert">{error}</p>}

            <button type="submit" className="btn contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send Message <ArrowUpRight /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;

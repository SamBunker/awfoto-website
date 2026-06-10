import { useState } from 'react';
import { SOCIALS } from '../data/siteData';
import { ArrowRight, ArrowUpRight } from './icons';
import '../styles/Contact.css';

// Where contact submissions go. Swap to a Formspree / Cloudflare endpoint later;
// for now it composes an email via the visitor's mail client.
const CONTACT_EMAIL = 'hello@awdesignfoto.com';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New message from ${form.name || 'the website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-aside">
        <h2 className="display contact-aside-title">Get in Touch</h2>

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

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-name">Name <span>*</span></label>
              <input id="cf-name" type="text" required placeholder="Who are you?"
                value={form.name} onChange={update('name')} />
            </div>

            <div className="field">
              <label htmlFor="cf-email">Email Address <span>*</span></label>
              <input id="cf-email" type="email" required placeholder="Where do we reply?"
                value={form.email} onChange={update('email')} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="cf-message">Message <span>*</span></label>
            <textarea id="cf-message" rows="4" required placeholder="Tell the story..."
              value={form.message} onChange={update('message')} />
          </div>

          <button type="submit" className="btn contact-submit">
            Send Message <ArrowUpRight />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

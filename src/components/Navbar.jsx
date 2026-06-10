import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/siteData';
import Logo from './Logo';
import '../styles/Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner container">
        <a href="#top" className="navbar-brand" aria-label="AW Design & Foto home">
          <Logo est />
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.cta ? 'navbar-cta' : 'navbar-link'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-drawer ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
            >
              <span className="navbar-drawer-index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

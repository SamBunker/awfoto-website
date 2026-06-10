import { Link } from 'react-router-dom';
import { SOCIALS } from '../data/siteData';
import Logo from './Logo';
import '../styles/Footer.css';

const FOOTER_LINKS = [
  { label: 'Sports Media', to: '/sports-media' },
  { label: 'Videography', to: '/videography' },
  { label: 'Photography', to: '/photography' },
  { label: 'The Archive', to: '/archive' },
  { label: 'Contact', to: '/#contact' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/"><Logo /></Link>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h4>Links</h4>
          <ul>
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Social">
          <h4>Socials</h4>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span className="footer-est">
          <span className="footer-est-mark">Est. 2023</span> All Rights Reserved
        </span>
        <span className="footer-credit">
          Website made by <a href="https://sambunker.com" target="_blank" rel="noreferrer">Samuel Bunker</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

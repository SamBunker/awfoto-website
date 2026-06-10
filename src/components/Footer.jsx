import '../styles/Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">AW&nbsp;FOTO</span>
        <nav className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:hello@awfoto.com">Email</a>
        </nav>
        <span className="footer-copy">© {year} AW Foto. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;

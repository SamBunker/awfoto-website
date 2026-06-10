import '../styles/Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <a href="#hero" className="navbar-logo">AW&nbsp;FOTO</a>
        <nav className="navbar-links">
          <a href="#gallery">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

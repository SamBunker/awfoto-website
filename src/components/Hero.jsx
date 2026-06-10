import '../styles/Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Photography Portfolio</p>
        <h1 className="hero-title">AW Foto</h1>
        <p className="hero-tagline">
          Portraits, events, and visual storytelling — capturing light and moment.
        </p>
        <a href="#gallery" className="btn">View Work</a>
      </div>
    </section>
  );
}

export default Hero;

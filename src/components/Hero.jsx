import { ArrowRight } from './icons';
import '../styles/Hero.css';

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <p className="kicker hero-anim" style={{ '--d': '120ms' }}>
            Professional Sports Media
          </p>

          <h1 className="display hero-title">
            <span className="hero-anim" style={{ '--d': '220ms' }}>Andrew</span>
            <span className="hero-anim" style={{ '--d': '320ms' }}>Williams</span>
          </h1>

          <div className="hero-divider hero-anim" style={{ '--d': '420ms' }}>
            <span className="fraktur">Leidenschaft</span>
          </div>

          <p className="hero-copy hero-anim" style={{ '--d': '520ms' }}>
            Capturing the grit, the sweat, and the triumph of athletics through my
            rigid lens of precision and raw emotion.
          </p>
          <p className="hero-copy hero-anim" style={{ '--d': '600ms' }}>
            Nothing makes me stronger than my faith, and my camera.
          </p>

          <div className="hero-actions hero-anim" style={{ '--d': '700ms' }}>
            <a href="#about" className="btn">About Me</a>
            <a href="#sports-media" className="btn btn--ghost">
              Check it Out <ArrowRight />
            </a>
          </div>
        </div>

        <div className="hero-figure">
          <span className="hero-figure-glow" aria-hidden="true" />
          <span className="hero-figure-est">Est. 2023</span>
          <img
            src="/andrew-cut-out-webp.webp"
            alt="Andrew Williams, sports media photographer"
            className="hero-portrait"
            fetchPriority="high"
          />
        </div>
      </div>

      <a href="#recent" className="hero-scroll" aria-label="Scroll to work">
        <span>Scroll</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}

export default Hero;

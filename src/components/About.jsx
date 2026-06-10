import '../styles/About.css';

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-inner">
        <div className="about-photo" aria-hidden="true" />
        <div className="about-text">
          <p className="section-subtitle">About</p>
          <h2 className="section-title">Behind the Lens</h2>
          <p>
            AW Foto is a photography studio focused on honest, light-driven
            imagery. From intimate portraits to full-day events, the goal is
            always the same — to capture the moments that matter, exactly as
            they felt.
          </p>
          <p>
            Replace this placeholder copy with your own story, approach, and
            credentials.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

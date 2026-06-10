import Reveal from './Reveal';
import '../styles/About.css';

const ROLES = [
  'Videographer · Juniata Athletics',
  'Media Specialist · Juniata Esports',
  'B.A. Athletic Media Production',
];

function About() {
  return (
    <section id="about" className="section about">
      <span className="about-watermark" aria-hidden="true">04</span>

      <div className="container">
        <Reveal className="about-intro">
          <p className="kicker">The Person Behind the Lens</p>
        </Reveal>

        <div className="about-grid">
          <div className="about-text">
            <Reveal>
              <h2 className="heading about-heading">
                About Me <span className="fraktur">Über Mich</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p>
                I'm <strong>Andrew Williams</strong>, a digital media professional
                with many years of experience in visual storytelling, media
                production, and sports-focused content. I'm currently pursuing a{' '}
                <em>Bachelor's degree in Athletic Media Production</em> at Juniata
                College, where I work as a Videographer for Juniata Athletics and a
                Media Specialist for Juniata College Esports.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                In these roles, I create engaging video and multimedia content,
                manage live productions, and help elevate program visibility through
                dynamic storytelling.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="about-roles">
                {ROLES.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="about-figure" delay={140}>
            <img src="/andrew-photo.webp" alt="Andrew Williams with his family" loading="lazy" />
          </Reveal>
        </div>

        <Reveal className="about-faith" delay={80}>
          <div className="about-faith-rule" aria-hidden="true" />
          <div className="about-faith-body">
            <h3 className="heading about-subheading">
              My Faith <span className="fraktur">Glaube</span>
            </h3>
            <p>
              Beyond my work, I am deeply family-oriented and guided by my Christian
              faith, which shapes my values, my work ethic, and the way I connect
              with the people and stories I capture.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;

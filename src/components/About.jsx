import Reveal from './Reveal';
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
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
            <h3 className="heading about-subheading">
              My Faith <span className="fraktur">Glaube</span>
            </h3>
          </Reveal>

          <Reveal delay={200}>
            <p>
              Beyond my work, I am deeply family-oriented and guided by my
              Christian faith, which shapes my values, my work ethic, and the way
              I connect with the people and stories I capture.
            </p>
          </Reveal>
        </div>

        <Reveal className="about-figure" delay={140}>
          <img src="/andrew-photo.webp" alt="Andrew Williams with his family" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

export default About;

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
                I'm <strong>Andrew Williams</strong>, a digital media professional with many years of experience in visual storytelling, media production, and sports-focused content. I recently obtained a <em>Bachelor's degree in Athletic Media Production at Juniata College</em>, where I worked as a Videographer for Juniata Athletics and a Media Specialist for Juniata College Esports. 
                Now, I am pursuing a Master's in Business Administration with a focus in Marketing at Missouri Baptist University where I work as an Athletics Creative Video Graduate Assistant where I work with, create, and produce video content for all 28 varsity sports. 
                

              </p>
            </Reveal>

            <Reveal delay={180}>
              <p>
                In these roles, I create engaging video and multimedia content, manage 
                live productions, and help elevate program visibility through dynamic 
                storytelling. 
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
              My faith has been an important part of my college experience, and one of the ways I was able to live that out was through my involvement with Juniata Christian Fellowship (JCF). During my time with JCF, I served as both the Social Media Coordinator and as Outreach Personnel on the Leadership Team for 2 years.
            <br /><br /></p>
            <p>
              As Social Media Coordinator, I helped grow our online presence and increase engagement and interactions by 50%, using content to connect students and share what God was doing through the fellowship. Beyond social media, my outreach role gave me opportunities to personally connect with students across campus, invite new members into the community, and help create an environment where people felt welcomed and encouraged.
            <br /><br /></p>
            <p>
              Being part of JCF strengthened my faith and taught me the value of leadership, service, and intentional community. It gave me opportunities to grow spiritually while helping others find connection, encouragement, and a place to belong during their college experience.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;

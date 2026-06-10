import { RECENT_WORK } from '../data/siteData';
import { ArrowRight } from './icons';
import Reveal from './Reveal';
import '../styles/MostRecent.css';

function MostRecent() {
  return (
    <section id="recent" className="section recent">
      <div className="container">
        <div className="recent-head">
          <Reveal as="h2" className="heading recent-title">Most Recent</Reveal>
          <Reveal delay={120}>
            <a href="#sports-media" className="arrow-btn" aria-label="See more work">
              <ArrowRight />
            </a>
          </Reveal>
        </div>

        <div className="recent-grid">
          {RECENT_WORK.map((item, i) => (
            <Reveal as="article" className="recent-card" key={item.id} delay={i * 120}>
              <a href={item.href} className="recent-card-link">
                <div className="recent-card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="recent-card-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </div>
                <h3 className="recent-card-title">{item.title}</h3>
                <p className="recent-card-date">{item.date}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MostRecent;

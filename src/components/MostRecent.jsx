import { Link } from 'react-router-dom';
import { getAllPosts, formatDate } from '../content/loader';
import { ArrowRight } from './icons';
import Reveal from './Reveal';
import '../styles/MostRecent.css';

function MostRecent() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <section id="recent" className="section recent">
      <div className="container">
        <div className="recent-head">
          <Reveal as="h2" className="heading recent-title">Most Recent</Reveal>
          <Reveal delay={120}>
            <Link to="/archive" className="arrow-btn" aria-label="See the full archive">
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <div className="recent-grid">
          {posts.map((post, i) => (
            <Reveal as="article" className="recent-card" key={`${post.category}/${post.slug}`} delay={i * 120}>
              <Link to={`/${post.category}/${post.slug}`} className="recent-card-link">
                <div className="recent-card-media">
                  <img src={post.cover} alt={post.title} loading="lazy" />
                  <span className="recent-card-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </div>
                <h3 className="recent-card-title">{post.title}</h3>
                <p className="recent-card-date">{formatDate(post.date)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MostRecent;

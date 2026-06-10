import { Link } from 'react-router-dom';
import { ArrowRight } from './icons';
import '../styles/Showcase.css';

/**
 * Full-bleed cinematic banner used for Sports Media (101) and Videography (202).
 * `align` flips the text to the right edge for visual rhythm between sections.
 */
function Showcase({ id, title, numeral, image, to = '/', align = 'left' }) {
  return (
    <section id={id} className={`showcase showcase--${align}`}>
      <img src={image} alt={title} className="showcase-bg" loading="lazy" />
      <div className="showcase-veil" aria-hidden="true" />

      <div className="showcase-inner container">
        <div className="showcase-lead">
          <span className="showcase-index" aria-hidden="true">
            <span className="showcase-index-no">N&ordm;</span>
            <span className="numeral showcase-index-num">{numeral}</span>
          </span>
          <Link to={to} className="showcase-title-link">
            <h2 className="display showcase-title">{title}</h2>
          </Link>
          <Link to={to} className="arrow-btn showcase-arrow" aria-label={`Explore ${title}`}>
            <ArrowRight />
          </Link>
        </div>

        <span className="numeral showcase-ghost" aria-hidden="true">{numeral}</span>
      </div>
    </section>
  );
}

export default Showcase;

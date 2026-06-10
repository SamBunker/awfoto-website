import { PHOTOGRAPHY } from '../data/siteData';
import Reveal from './Reveal';
import '../styles/Photography.css';

function Photography() {
  return (
    <section id="photography" className="section photography">
      <div className="container">
        <div className="photography-head">
          <Reveal>
            <p className="kicker">Stills &amp; Frames</p>
            <h2 className="display photography-title">Photography</h2>
          </Reveal>
          <Reveal as="span" className="numeral photography-numeral" delay={120}>
            303
          </Reveal>
        </div>
      </div>

      <div className="photography-grid">
        {PHOTOGRAPHY.map((photo, i) => (
          <Reveal
            as="figure"
            className="photography-item"
            key={photo.id}
            delay={(i % 3) * 90}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption className="photography-caption">
              <span className="numeral">{String(i + 1).padStart(2, '0')}</span>
              <span>{photo.alt}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Photography;

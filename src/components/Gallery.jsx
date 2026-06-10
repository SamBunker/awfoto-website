import { galleryItems } from '../data/galleryData';
import '../styles/Gallery.css';

function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <p className="section-subtitle">Selected Work</p>
        <h2 className="section-title">Gallery</h2>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <figure key={item.id} className="gallery-item">
              {item.src ? (
                <img src={item.src} alt={item.title} loading="lazy" />
              ) : (
                <div className="gallery-placeholder" aria-hidden="true" />
              )}
              <figcaption className="gallery-caption">
                <span className="gallery-caption-title">{item.title}</span>
                <span className="gallery-caption-category">{item.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;

import { useEffect, useCallback } from 'react';
import '../styles/Lightbox.css';

function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0;

  const go = useCallback(
    (dir) => {
      if (!open) return;
      const next = (index + dir + images.length) % images.length;
      onNavigate(next);
    },
    [open, index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go, onClose]);

  if (!open) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>

      <button
        className="lightbox-nav lightbox-prev"
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
      >
        &#8249;
      </button>

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={images[index]} alt={`Image ${index + 1} of ${images.length}`} />
        <figcaption className="lightbox-count">
          {index + 1} / {images.length}
        </figcaption>
      </figure>

      <button
        className="lightbox-nav lightbox-next"
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); go(1); }}
      >
        &#8250;
      </button>
    </div>
  );
}

export default Lightbox;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// On every route change, jump to the top — or smooth-scroll to a #hash target
// when one is present (e.g. /#contact from another page).
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Wait a tick so the target section has mounted.
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in document.body.style ? 'instant' : 'auto' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;

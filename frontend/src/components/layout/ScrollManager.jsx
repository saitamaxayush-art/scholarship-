import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to a #hash target once it has rendered. Resetting to the top on route
 * changes happens in App (AnimatePresence onExitComplete), after the old page has
 * faded out, so the reset is never visible.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const id = decodeURIComponent(hash.slice(1));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tries = 0;
    let frame;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' });
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      } else if (tries++ < 120) {
        // The target page may still be waiting for the previous page to fade out.
        frame = window.requestAnimationFrame(attempt);
      }
    };
    frame = window.requestAnimationFrame(attempt);
    return () => window.cancelAnimationFrame(frame);
    // `key` lets re-clicking the same hash link scroll again.
  }, [pathname, hash, key]);

  return null;
}

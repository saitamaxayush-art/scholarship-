import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top on route change, or to the #hash target once it has rendered. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tries = 0;
    let frame;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (el.tabIndex < 0 && !el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      } else if (tries++ < 30) {
        frame = window.requestAnimationFrame(attempt);
      }
    };
    // Give layout (and the spine measurement) a frame to settle first.
    frame = window.requestAnimationFrame(attempt);
    return () => window.cancelAnimationFrame(frame);
    // `key` only matters for hash links, so re-clicking "How it Works" scrolls again
    // while query-string updates on the same page do not jump to the top.
  }, [pathname, hash, hash ? key : null]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

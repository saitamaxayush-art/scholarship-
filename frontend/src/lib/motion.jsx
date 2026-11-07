// One motion system for the whole site.
// Durations and easing mirror the CSS tokens in index.css (--dur-*, --ease-standard)
// and the Tailwind theme (duration-fast/base/slow, default ease), so JS-driven and
// CSS-driven animations feel like the same thing.
import { forwardRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const EASE = [0.2, 0.8, 0.2, 1];
export const DUR = { fast: 0.15, base: 0.25, slow: 0.6 };

const TRANSITIONS = {
  fast: { duration: DUR.fast, ease: EASE },
  base: { duration: DUR.base, ease: EASE },
  slow: { duration: DUR.slow, ease: EASE },
  spring: { type: 'spring', stiffness: 380, damping: 34 },
  bounce: { type: 'spring', stiffness: 140, damping: 15 },
};

/** Transition by token name. Under reduced motion every transition is instant. */
export function useTransitions() {
  const reduce = useReducedMotion();
  const t = (name = 'base', extra = {}) => (reduce ? { duration: 0 } : { ...TRANSITIONS[name], ...extra });
  return { reduce: Boolean(reduce), t };
}

// ---------------------------------------------------------------------------
// Reveal memory. Entrance animations on the landing page play once per visit,
// not once per mount: navigating away and back must not replay them. This lives
// at module scope, so it survives route changes and resets on a full reload.
// ---------------------------------------------------------------------------
const seen = new Set();
let spineDepth = 0; // deepest point the spine has been drawn to, as a 0..1 fraction

export const revealMemory = {
  has: (key) => seen.has(key),
  mark: (key) => seen.add(key),
  get spineDepth() {
    return spineDepth;
  },
  reachSpine(fraction) {
    if (fraction > spineDepth) spineDepth = Math.min(1, fraction);
    return spineDepth;
  },
};

/**
 * Props for a fade-and-rise entrance that plays once, the first time the element
 * scrolls into view. Returns {} (render as-is) under reduced motion or if this
 * `id` has already been revealed earlier in the visit.
 */
export function useReveal(id, { delay = 0, y = 36, amount = 0.3, from, to, transition = 'slow' } = {}) {
  const { reduce, t } = useTransitions();
  const [alreadySeen] = useState(() => reduce || seen.has(id));
  if (alreadySeen) return {};
  return {
    initial: from ?? { opacity: 0, y },
    whileInView: to ?? { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: t(transition, { delay }),
    onViewportEnter: () => seen.add(id),
  };
}

/** <Reveal id="..." as="li"> wraps children in a once-per-visit entrance. */
export const Reveal = forwardRef(function Reveal({ id, as = 'div', delay, y, amount, from, to, transition, ...rest }, ref) {
  const props = useReveal(id, { delay, y, amount, from, to, transition });
  const Tag = motion[as];
  return <Tag ref={ref} {...props} {...rest} />;
});

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { Award, Check } from 'lucide-react';
import { CATEGORIES, SCHOLARSHIPS } from '../../data/scholarships';
import { EASE, Reveal, revealMemory, useTransitions } from '../../lib/motion';

/** Counts up once per visit; afterwards (and under reduced motion) shows the final value. */
function CountUp({ id, to, format = (n) => String(Math.round(n)) }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduce } = useTransitions();
  const [skip] = useState(() => reduce || revealMemory.has(id));
  const [value, setValue] = useState(skip ? to : 0);
  useEffect(() => {
    if (!inView || skip) return undefined;
    revealMemory.mark(id);
    const controls = animate(0, to, { duration: 1.3, ease: EASE, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, skip, to, id]);
  return (
    <span ref={ref} aria-label={format(to)}>
      <span aria-hidden="true">{format(value)}</span>
    </span>
  );
}

export function Stats() {
  const count = SCHOLARSHIPS.length;
  const total = SCHOLARSHIPS.reduce((sum, s) => sum + s.amount, 0);

  return (
    <section className="bg-cream py-24 sm:py-32" aria-labelledby="stats-title">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 id="stats-title" className="max-w-[16ch] text-title font-semibold">
            A few numbers behind the matches we make.
          </h2>
          <p className="max-w-md text-ink/75 md:justify-self-end">
            These figures are counted live from the sample dataset that ships with this demo. They describe the demo, not the
            real-world scholarship market.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal id="stats-grass" y={40} className="relative overflow-hidden rounded-[32px] bg-grass p-8 sm:p-10">
            <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-white ring-[3px] ring-ink" aria-hidden="true">
              <Check size={28} strokeWidth={3.2} />
            </span>
            <p className="text-[clamp(4.5rem,11vw,8.5rem)] font-semibold leading-none tracking-[-0.06em]">
              <CountUp id="count-listings" to={count} />
            </p>
            <p className="mt-4 max-w-xs text-xl font-medium leading-snug">sample scholarships in this demo’s database</p>
            <p className="mt-8 inline-flex rounded-full bg-ink/10 px-3 py-1 text-sm font-medium">
              Across {CATEGORIES.length} funding categories
            </p>
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-grass-deep/40" aria-hidden="true" />
          </Reveal>

          <Reveal id="stats-coral" y={40} delay={0.1} className="relative overflow-hidden rounded-[32px] bg-coral p-8 sm:p-10">
            <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-sun ring-[3px] ring-ink" aria-hidden="true">
              <Award size={26} strokeWidth={2.6} />
            </span>
            <p className="text-[clamp(4.5rem,11vw,8.5rem)] font-semibold leading-none tracking-[-0.06em]">
              <CountUp id="count-total" to={Math.round(total / 1000)} format={(n) => `$${Math.round(n)}k`} />
            </p>
            <p className="mt-4 max-w-xs text-xl font-medium leading-snug">in combined award value across the sample listings</p>
            <p className="mt-8 inline-flex rounded-full bg-ink/10 px-3 py-1 text-sm font-medium">Demo figures only</p>
            <svg className="pointer-events-none absolute -bottom-6 right-8 h-24 w-40" viewBox="0 0 160 96" aria-hidden="true">
              <path d="M4 80 q18 -40 36 0 t36 0 t36 0 t36 0" fill="none" stroke="#15140F" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

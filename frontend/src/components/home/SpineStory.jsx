import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  transform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, BookOpen, LayoutGrid, Search, Sparkles, UserRound } from 'lucide-react';
import { buildSpine, partialSpine } from '../../lib/spine';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAppState } from '../../context/AppState';
import { PillButton } from '../ui/PillButton';
import { Celebrator, Cyclist, Juggler, Reacher, Reader } from '../illustrations/Characters';

const BEATS = [
  {
    id: 'how-it-works',
    n: '01',
    x: 0.3,
    w: 132,
    title: 'No more chaos.',
    body: 'Twelve open tabs, a spreadsheet you stopped updating in October, and a deadline you remembered the day after it closed. meritrail keeps every scholarship you care about, and every date, in one tracker.',
    cta: { label: 'Open the tracker', to: '/dashboard', icon: LayoutGrid },
    Figure: Juggler,
  },
  {
    n: '02',
    x: 0.7,
    w: 156,
    title: 'One profile. Every match.',
    body: 'Tell us your level, your field, your GPA and anything else that shapes your eligibility. We check it against every listing, so you stop reading fine print site by site.',
    cta: { label: 'Build my profile', to: '/start', icon: UserRound },
    Figure: Reacher,
  },
  {
    n: '03',
    x: 0.3,
    w: 120,
    title: 'Plain-language eligibility.',
    body: 'Each listing is rewritten as short sentences you can check yourself: who can apply, what grades you need, what you have to send. If something rules you out, we point to the exact line.',
    cta: { label: 'See an example', example: 'northline-first-gen', icon: BookOpen },
    Figure: Reader,
  },
  {
    id: 'every-background',
    n: '04',
    x: 0.7,
    w: 196,
    title: 'Built for every background.',
    body: 'Need-based, merit-based, identity-based and field-specific awards sit side by side, including small local programs that never make the big national lists.',
    cta: { label: 'Browse every category', to: '/scholarships', icon: Search },
    Figure: Cyclist,
  },
];

const CREAM = '#F3EEE2';

function BeatCard({ beat }) {
  const { openDetail } = useAppState();
  const { cta } = beat;
  return (
    <article className="rounded-[28px] bg-white p-6 shadow-card sm:p-8">
      <p className="eyebrow text-ink/70">
        <span className="text-ink">{beat.n}</span> / 04
      </p>
      <h3 id={`beat-${beat.n}`} className="mt-3 text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[2.3rem]">{beat.title}</h3>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/75">{beat.body}</p>
      <div className="mt-6">
        {cta.to ? (
          <PillButton to={cta.to} size="sm" icon={cta.icon}>
            {cta.label}
          </PillButton>
        ) : (
          <PillButton size="sm" icon={cta.icon} onClick={() => openDetail(cta.example)}>
            {cta.label}
          </PillButton>
        )}
      </div>
    </article>
  );
}

/** Desktop beat: a tall block whose inner stage stays pinned while the trail runs past it. */
function DesktopBeat({ beat, reduce, registerRef }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const fromSide = beat.x < 0.5 ? -1 : 1;
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.32, 0.7, 0.8], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.2, 0.32, 0.7, 0.8], [70, 0, 0, -50]);
  const figOpacity = useTransform(scrollYProgress, [0.15, 0.27, 0.74, 0.84], [0, 1, 1, 0]);
  const figX = useTransform(scrollYProgress, [0.15, 0.3], [70 * fromSide * -1, 0]);
  const figY = useTransform(scrollYProgress, [0.15, 0.3, 0.74, 0.84], [40, 0, 0, -30]);

  const cardSide = beat.x < 0.5 ? { left: '50%' } : { right: '50%' };
  const { Figure } = beat;

  return (
    <section
      id={beat.id}
      ref={(el) => {
        ref.current = el;
        registerRef(el);
      }}
      className="relative h-[170vh] scroll-mt-0"
      aria-labelledby={`beat-${beat.n}`}
    >
      <div className="sticky top-[15vh] h-[70vh]">
        <div
          className="absolute top-1/2 w-[clamp(170px,17vw,250px)] -translate-x-1/2 -translate-y-[58%]"
          style={{ left: `${beat.x * 100}%` }}
        >
          <motion.div style={reduce ? undefined : { opacity: figOpacity, x: figX, y: figY }}>
            <Figure className="h-auto w-full drop-shadow-[0_6px_0_rgba(21,20,15,0.08)]" />
          </motion.div>
        </div>
        <div className="absolute top-1/2 w-[min(440px,40%)] -translate-y-1/2" style={cardSide}>
          <motion.div style={reduce ? undefined : { opacity: cardOpacity, y: cardY }}>
            <BeatCard beat={beat} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Mobile beat: a plain vertical stack over a straight trail, same reveal language. */
function MobileBeat({ beat, reduce, registerRef }) {
  const { Figure } = beat;
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] },
        };
  return (
    <section id={beat.id} ref={registerRef} className="relative px-4 py-14" aria-labelledby={`beat-${beat.n}`}>
      <motion.div {...reveal(0)} className="mx-auto w-44">
        <Figure className="h-auto w-full" />
      </motion.div>
      <motion.div {...reveal(0.08)} className="mx-auto mt-2 max-w-md">
        <BeatCard beat={beat} />
      </motion.div>
    </section>
  );
}

export function SpineStory() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduce = useReducedMotion();
  const containerRef = useRef(null);
  const closingRef = useRef(null);
  const beatEls = useRef([]);
  const geoRef = useRef(null);
  const topRef = useRef(0);
  const [geo, setGeo] = useState(null);

  const bandRef = useRef(null);
  const shadowRef = useRef(null);
  const dashRef = useRef(null);
  const capRef = useRef(null);
  const shadowCapRef = useRef(null);
  const bg = useMotionValue(CREAM);
  const { scrollY } = useScroll();

  // Hero headline fades and lifts away while the trail scrolls up beneath it.
  const heroOpacity = useTransform(scrollY, (v) => {
    const vh = window.innerHeight;
    return reduce ? 1 : transform(v, [vh * 0.3, vh * 0.7], [1, 0]);
  });
  const heroY = useTransform(scrollY, (v) => (reduce ? 0 : transform(v, [0, window.innerHeight * 0.7], [0, -60])));

  // Redraws the revealed part of the trail. Runs on every scroll frame, writing
  // attributes directly so React never re-renders during scroll.
  const update = useCallback(() => {
    const g = geoRef.current;
    if (!g || !g.start || !bandRef.current) return;
    const vh = window.innerHeight;
    const scrolled = window.scrollY + vh * 0.82 - topRef.current;
    // Reduced motion: the whole trail is drawn up front instead of growing with scroll.
    const y = reduce ? g.H : scrolled;
    const part = partialSpine(g.samples, y);
    const d = part ? part.outline : '';
    bandRef.current.setAttribute('d', d);
    shadowRef.current.setAttribute('d', d);
    dashRef.current.setAttribute('d', part ? part.centerline : '');
    const cap = part && !part.complete && part.tip.w < 280 ? part.tip : null;
    for (const [el, dx, dy] of [
      [capRef.current, 0, 0],
      [shadowCapRef.current, 7, 10],
    ]) {
      el.setAttribute('cx', cap ? cap.x + dx : 0);
      el.setAttribute('cy', cap ? cap.y + dy : 0);
      el.setAttribute('r', cap ? cap.w / 2 : 0);
    }
    const progress = Math.max(0, Math.min(1, scrolled / g.H));
    bg.set(transform(progress, [0, 0.35, 0.8], [CREAM, '#EDEED6', '#DDEDC7']));
  }, [reduce, bg]);

  const measure = useCallback(() => {
    const c = containerRef.current;
    const closing = closingRef.current;
    if (!c || !closing) return;
    const rect = c.getBoundingClientRect();
    const W = c.clientWidth;
    const H = c.offsetHeight;
    const vh = window.innerHeight;
    topRef.current = rect.top + window.scrollY;
    const rel = (el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top - rect.top, bottom: r.bottom - rect.top };
    };
    const cx = W / 2;
    const closingTop = rel(closing).top;
    const startY = vh * 0.8;
    const flareW = W * 1.9;
    const nodes = [];

    if (isDesktop) {
      nodes.push({ x: cx, y: startY, w: 150 }, { x: cx, y: startY + vh * 0.22, w: 112 });
      BEATS.forEach((b, i) => {
        const el = beatEls.current[i];
        if (!el) return;
        const r = rel(el);
        nodes.push({ x: W * b.x, y: r.top + vh * 0.35, w: b.w }, { x: W * b.x, y: r.bottom - vh * 0.35, w: b.w });
      });
      nodes.push({ x: cx, y: closingTop - vh * 0.34, w: 170 });
    } else {
      nodes.push({ x: cx, y: startY, w: 120 }, { x: cx, y: startY + vh * 0.2, w: 84 });
      nodes.push({ x: cx, y: closingTop - vh * 0.26, w: 96 });
    }
    nodes.push({ x: cx, y: closingTop + 2, w: flareW, flare: true }, { x: cx, y: closingTop + 80, w: flareW });

    const g = { ...buildSpine(nodes), W, H };
    geoRef.current = g;
    setGeo({ W, H, start: g.start });
  }, [isDesktop]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Paint once the svg for the latest geometry is mounted.
  useLayoutEffect(() => {
    update();
  }, [geo, update]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return undefined;
    let frame;
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(c);
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [measure]);

  useMotionValueEvent(scrollY, 'change', update);

  return (
    <motion.div ref={containerRef} className="relative overflow-x-clip" style={{ backgroundColor: bg }}>
      {geo && geo.start && (
        <svg
          className="pointer-events-none absolute left-0 top-0"
          width={geo.W}
          height={geo.H}
          viewBox={`0 0 ${geo.W} ${geo.H}`}
          aria-hidden="true"
          focusable="false"
        >
          <g transform="translate(7 10)" fill="var(--grass-deep)">
            <path ref={shadowRef} />
            <circle cx={geo.start.x} cy={geo.start.y} r={geo.start.w / 2} />
          </g>
          <circle ref={shadowCapRef} r="0" fill="var(--grass-deep)" />
          <path ref={bandRef} fill="var(--grass)" />
          <circle cx={geo.start.x} cy={geo.start.y} r={geo.start.w / 2} fill="var(--grass)" />
          <circle ref={capRef} r="0" fill="var(--grass)" />
          <path
            ref={dashRef}
            fill="none"
            stroke="#F3EEE2"
            strokeOpacity="0.75"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 16"
          />
        </svg>
      )}

      {/* Hero: headline stays pinned while the page and trail scroll beneath it. */}
      <section className="relative z-10 h-[150vh] md:h-[170vh]" aria-labelledby="hero-title">
        <motion.div
          className="sticky top-0 flex h-[100svh] flex-col items-center justify-center px-4 pb-[12vh] pt-[var(--nav-h)] text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <h1 id="hero-title" className="mx-auto max-w-[13ch] text-display font-semibold">
            Every scholarship, matched to you.
          </h1>
          <p className="mt-6 text-lg font-medium text-ink/75 sm:text-xl">One search. Every match.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillButton to="/start" icon={Sparkles} size="lg">
              Start matching
            </PillButton>
            <PillButton to="/scholarships" variant="white" icon={ArrowUpRight} size="lg">
              Browse scholarships
            </PillButton>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10">
        {BEATS.map((beat, i) =>
          isDesktop ? (
            <DesktopBeat key={beat.n} beat={beat} reduce={reduce} registerRef={(el) => (beatEls.current[i] = el)} />
          ) : (
            <MobileBeat key={beat.n} beat={beat} reduce={reduce} registerRef={(el) => (beatEls.current[i] = el)} />
          ),
        )}
      </div>

      {/* Runway: room for the trail to swing back to center and widen into the closing block. */}
      <div className="h-[40vh] md:h-[75vh]" aria-hidden="true" />

      <section ref={closingRef} className="relative z-10 bg-grass" aria-labelledby="ready-title">
        <div className="container-x grid items-center gap-8 pb-24 pt-20 md:grid-cols-[1.35fr_1fr] md:pb-36 md:pt-32">
          <div>
            <h2 id="ready-title" className="text-display font-semibold">
              Ready when you are.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl">
              Five minutes on your profile now saves a semester of searching later. Your matches update the moment you save.
            </p>
            <PillButton to="/start" variant="ink" size="lg" icon={Sparkles} className="mt-9">
              Start matching
            </PillButton>
          </div>
          <motion.div
            className="mx-auto w-56 sm:w-72 md:w-80"
            initial={reduce ? false : { opacity: 0, y: 50, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <Celebrator className="h-auto w-full" />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

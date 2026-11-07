import { Link } from 'react-router-dom';
import { Building2, GraduationCap, HeartHandshake, Landmark } from 'lucide-react';
import { SCHOLARSHIPS, SOURCES } from '../../data/scholarships';
import { Swoosh } from '../illustrations/Characters';
import { Reveal, useReveal } from '../../lib/motion';

const PHOTOS = [
  { src: '/images/strip-laptops.jpg', alt: 'Two students working through something together on a laptop', h: 'h-64 md:h-80' },
  { src: '/images/strip-focus.jpg', alt: 'A student in headphones concentrating on a laptop in a cafe', h: 'h-72 md:h-[26rem]' },
  { src: '/images/strip-library.jpg', alt: 'A student with a backpack walking between library shelves', h: 'h-64 md:h-80' },
  { src: '/images/strip-group.jpg', alt: 'A group of students leaning in over laptops at a shared table', h: 'h-72 md:h-[22rem]' },
];

const SOURCE_ICONS = {
  government: Landmark,
  university: GraduationCap,
  foundation: HeartHandshake,
  corporate: Building2,
};

export function PhotoTrust() {
  const swoosh = useReveal('trust-swoosh', {
    from: { pathLength: 0 },
    to: { pathLength: 1 },
    amount: 0.5,
    delay: 0.3,
    transition: 'slow',
  });
  const counts = Object.fromEntries(SOURCES.map((s) => [s.id, SCHOLARSHIPS.filter((x) => x.source === s.id).length]));

  return (
    <section id="for-students" className="overflow-x-clip bg-cream pb-24 sm:pb-32" aria-labelledby="timelines-title">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 id="timelines-title" className="max-w-[14ch] text-title font-semibold">
            Built around real student{' '}
            <span className="relative inline-block">
              timelines.
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C50 2 120 2 198 7" fill="none" stroke="var(--grass-deep)" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="max-w-md text-ink/75 md:justify-self-end">
            Exams, part-time shifts, family stuff. meritrail sorts by what is due soonest and shows how much is left to send, so you
            can plan around the rest of your life.
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        <ul className="container-x flex snap-x snap-mandatory items-end gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {PHOTOS.map((p, i) => (
            <Reveal
              as="li"
              id={`trust-photo-${i}`}
              key={p.src}
              y={40}
              delay={i * 0.08}
              className="w-[72vw] shrink-0 snap-center sm:w-[44vw] md:w-auto"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
                className={`w-full rounded-[28px] object-cover ${p.h}`}
              />
            </Reveal>
          ))}
        </ul>
        <Swoosh
          className="pointer-events-none absolute left-1/2 top-[-2.5rem] hidden w-[22rem] -translate-x-[18%] md:block"
          pathProps={swoosh}
        />
      </div>

      <div className="container-x mt-20">
        <h3 className="eyebrow text-ink/65">Where the listings come from</h3>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((s) => {
            const Icon = SOURCE_ICONS[s.id];
            return (
              <li key={s.id}>
                <Link
                  to={`/scholarships?source=${s.id}`}
                  className="focus-square pressable group flex items-center gap-4 rounded-[22px] border-2 border-ink/10 bg-white p-4 transition-[border-color,scale] duration-fast hover:border-ink active:bg-cream"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-grass/60 transition-colors group-hover:bg-grass" aria-hidden="true">
                    <Icon size={22} strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block font-semibold">{s.label}</span>
                    <span className="text-sm text-ink/65">
                      {counts[s.id]} sample listings
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-ink/70">Source types only. meritrail does not claim partnerships with any organization.</p>
      </div>
    </section>
  );
}

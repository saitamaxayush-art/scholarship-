import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RotateCcw, Search, SlidersHorizontal, Sparkles, UserRound, X } from 'lucide-react';
import { CATEGORIES, FIELDS, LEVELS, SCHOLARSHIPS, SOURCES } from '../data/scholarships';
import { useAppState } from '../context/AppState';
import { evaluateMatch } from '../lib/match';
import { daysUntil } from '../lib/format';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { PillButton } from '../components/ui/PillButton';
import { Backpacker } from '../components/illustrations/Characters';

const AMOUNTS = [
  { value: 0, label: 'Any amount' },
  { value: 2500, label: '$2,500 or more' },
  { value: 5000, label: '$5,000 or more' },
  { value: 10000, label: '$10,000 or more' },
];
const WINDOWS = [
  { value: 'any', label: 'Any deadline' },
  { value: '30', label: 'Due in 30 days' },
  { value: '90', label: 'Due in 90 days' },
];

const DEFAULTS = {
  q: '',
  categories: [],
  source: 'all',
  field: 'all',
  level: 'all',
  minAmount: 0,
  window: 'any',
  renewable: false,
  onlyMatches: false,
};

function Select({ label, value, onChange, children, id }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field select-chevron">
        {children}
      </select>
    </label>
  );
}

function Toggle({ checked, onChange, label, disabled, hint }) {
  return (
    <div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="focus-square flex w-full items-center justify-between gap-3 rounded-2xl py-1 text-left disabled:opacity-50"
      >
        <span className="text-sm font-semibold">{label}</span>
        <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-grass-deep' : 'bg-ink/20'}`} aria-hidden="true">
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] ${checked ? 'left-6' : 'left-1'}`} />
        </span>
      </button>
      {hint}
    </div>
  );
}

export default function Scholarships() {
  const [params, setParams] = useSearchParams();
  const { profile, openDetail } = useAppState();
  const reduce = useReducedMotion();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [f, setF] = useState(() => ({
    ...DEFAULTS,
    q: params.get('q') ?? '',
    source: SOURCES.some((s) => s.id === params.get('source')) ? params.get('source') : 'all',
    categories: CATEGORIES.includes(params.get('category')) ? [params.get('category')] : [],
    onlyMatches: params.get('matches') === '1',
  }));
  const [sort, setSort] = useState(() => (params.get('sort') === 'match' ? 'match' : 'deadline'));
  const set = (key) => (value) => setF((prev) => ({ ...prev, [key]: value }));

  // Deep link: /scholarships?open=<id> opens the detail dialog once.
  useEffect(() => {
    const open = params.get('open');
    if (open && SCHOLARSHIPS.some((s) => s.id === open)) {
      openDetail(open);
      const next = new URLSearchParams(params);
      next.delete('open');
      setParams(next, { replace: true });
    }
  }, [params, setParams, openDetail]);

  const effectiveSort = sort === 'match' && !profile ? 'deadline' : sort;
  const onlyMatches = f.onlyMatches && Boolean(profile);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const list = SCHOLARSHIPS.map((s) => ({ s, match: evaluateMatch(s, profile) })).filter(({ s, match }) => {
      if (q) {
        const hay = `${s.title} ${s.provider} ${s.summary} ${s.field} ${s.category} ${s.eligibility.join(' ')}`.toLowerCase();
        if (!q.split(/\s+/).every((word) => hay.includes(word))) return false;
      }
      if (f.categories.length && !f.categories.includes(s.category)) return false;
      if (f.source !== 'all' && s.source !== f.source) return false;
      if (f.field !== 'all' && s.field !== f.field && s.field !== 'Any') return false;
      if (f.level !== 'all' && !s.levels.includes(f.level)) return false;
      if (s.amount < f.minAmount) return false;
      if (f.window !== 'any') {
        const d = daysUntil(s.deadline);
        if (d < 0 || d > Number(f.window)) return false;
      }
      if (f.renewable && !s.renewable) return false;
      if (onlyMatches && !match?.eligible) return false;
      return true;
    });
    const sorters = {
      deadline: (a, b) => a.s.deadline.localeCompare(b.s.deadline),
      amount: (a, b) => b.s.amount - a.s.amount,
      match: (a, b) => (b.match?.percent ?? 0) - (a.match?.percent ?? 0) || a.s.deadline.localeCompare(b.s.deadline),
      title: (a, b) => a.s.title.localeCompare(b.s.title),
    };
    return list.sort(sorters[effectiveSort]);
  }, [f, profile, effectiveSort, onlyMatches]);

  const activeCount =
    f.categories.length +
    (f.source !== 'all') +
    (f.field !== 'all') +
    (f.level !== 'all') +
    (f.minAmount > 0) +
    (f.window !== 'any') +
    f.renewable +
    onlyMatches;

  const clearAll = () => setF({ ...DEFAULTS });
  const eligibleCount = profile ? SCHOLARSHIPS.filter((s) => evaluateMatch(s, profile).eligible).length : 0;

  const toggleCategory = (c) =>
    setF((prev) => ({
      ...prev,
      categories: prev.categories.includes(c) ? prev.categories.filter((x) => x !== c) : [...prev.categories, c],
    }));

  const filterPanel = (
    <div className="space-y-5">
      <Select id="f-source" label="Listing source" value={f.source} onChange={set('source')}>
        <option value="all">All sources</option>
        {SOURCES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </Select>
      <Select id="f-field" label="Field of study" value={f.field} onChange={set('field')}>
        <option value="all">All fields</option>
        {FIELDS.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </Select>
      <Select id="f-level" label="Education level" value={f.level} onChange={set('level')}>
        <option value="all">All levels</option>
        {LEVELS.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </Select>
      <Select id="f-amount" label="Award size" value={f.minAmount} onChange={(v) => set('minAmount')(Number(v))}>
        {AMOUNTS.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </Select>
      <Select id="f-window" label="Deadline" value={f.window} onChange={set('window')}>
        {WINDOWS.map((w) => (
          <option key={w.value} value={w.value}>
            {w.label}
          </option>
        ))}
      </Select>
      <div className="space-y-3 border-t-2 border-ink/10 pt-5">
        <Toggle checked={f.renewable} onChange={set('renewable')} label="Renewable awards only" />
        <Toggle
          checked={onlyMatches}
          onChange={set('onlyMatches')}
          label="Only scholarships I qualify for"
          disabled={!profile}
          hint={
            !profile && (
              <p className="mt-1 text-sm text-ink/65">
                <Link to="/start" className="font-semibold underline decoration-grass-deep decoration-2 underline-offset-4">
                  Build a profile
                </Link>{' '}
                to turn this on.
              </p>
            )
          }
        />
      </div>
      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
          <RotateCcw size={15} aria-hidden="true" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pb-24 pt-[calc(var(--nav-h)+2.5rem)]">
      <div className="container-x">
        <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-ink/65">Scholarships</p>
            <h1 className="mt-2 text-display-sm font-semibold">Find the ones that fit.</h1>
          </div>
          {profile ? (
            <div className="flex flex-wrap items-center gap-3 rounded-[22px] bg-grass px-5 py-4">
              <Sparkles size={20} aria-hidden="true" />
              <p className="font-medium">
                You qualify for <strong className="font-semibold">{eligibleCount}</strong> of {SCHOLARSHIPS.length} listings.
              </p>
              <Link to="/start" className="text-sm font-semibold underline underline-offset-4">
                Edit profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 rounded-[22px] bg-white px-5 py-4 ring-2 ring-ink/10">
              <p className="font-medium">See which ones you qualify for.</p>
              <PillButton to="/start" size="sm" icon={UserRound}>
                Build my profile
              </PillButton>
            </div>
          )}
        </header>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="search" className="relative flex-1">
            <span className="sr-only">Search scholarships</span>
            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" aria-hidden="true" />
            <input
              id="search"
              type="search"
              value={f.q}
              onChange={(e) => set('q')(e.target.value)}
              placeholder="Try nursing, first generation, portfolio..."
              className="field rounded-full py-3.5 pl-12 pr-12"
              autoComplete="off"
            />
            {f.q && (
              <button
                type="button"
                onClick={() => set('q')('')}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-ink/10"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <div className="flex gap-3">
            <label htmlFor="sort" className="flex-1 sm:w-56 sm:flex-none">
              <span className="sr-only">Sort by</span>
              <select id="sort" value={effectiveSort} onChange={(e) => setSort(e.target.value)} className="field select-chevron rounded-full py-3.5">
                <option value="deadline">Soonest deadline</option>
                <option value="amount">Largest award</option>
                <option value="match" disabled={!profile}>
                  Best match{profile ? '' : ' (needs profile)'}
                </option>
                <option value="title">Name, A to Z</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="mobile-filters"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 font-semibold text-cream lg:hidden"
            >
              <SlidersHorizontal size={18} aria-hidden="true" />
              Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Funding category">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={f.categories.includes(c)} onClick={() => toggleCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              id="mobile-filters"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-5 rounded-[26px] bg-white p-5">{filterPanel}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-[calc(var(--nav-h)+1.5rem)] rounded-[26px] bg-white p-6">
              <h2 className="mb-5 text-lg font-semibold">Filters</h2>
              {filterPanel}
            </div>
          </aside>

          <section aria-labelledby="results-title">
            <h2 id="results-title" className="sr-only">
              Results
            </h2>
            <p className="mb-4 text-sm font-medium text-ink/70" aria-live="polite">
              Showing {results.length} of {SCHOLARSHIPS.length} sample scholarships
            </p>
            {results.length ? (
              <motion.ul layout={!reduce} className="grid gap-5 md:grid-cols-2">
                <AnimatePresence initial={false}>
                  {results.map(({ s, match }) => (
                    <motion.li
                      key={s.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ScholarshipCard s={s} match={match} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            ) : (
              <div className="flex flex-col items-center rounded-[28px] bg-white px-6 py-14 text-center">
                <Backpacker className="w-36" />
                <h3 className="mt-4 text-2xl font-semibold">Nothing matches all of that.</h3>
                <p className="mt-2 max-w-sm text-ink/70">Try removing a filter or two. Small local awards often hide behind narrow searches.</p>
                <PillButton className="mt-6" icon={RotateCcw} onClick={clearAll}>
                  Clear search and filters
                </PillButton>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

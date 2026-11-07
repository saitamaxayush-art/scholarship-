import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, ChevronLeft, ChevronRight, GripVertical, ListChecks, RotateCcw, Search, Trash2 } from 'lucide-react';
import { STAGES } from '../data/scholarships';
import { getScholarship, useAppState } from '../context/AppState';
import { daysUntil, deadlineLabel, formatDate, formatMoney } from '../lib/format';
import { PillButton } from '../components/ui/PillButton';
import { Backpacker } from '../components/illustrations/Characters';
import { TrackerCardSkeleton } from '../components/ui/Skeleton';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { useTransitions } from '../lib/motion';

const STAGE_TONES = {
  saved: 'bg-white',
  in_progress: 'bg-sun/70',
  submitted: 'bg-grass/60',
  decision: 'bg-[#F7C6D6]',
};

const OUTCOMES = [
  { value: 'waiting', label: 'Waiting to hear' },
  { value: 'awarded', label: 'Awarded' },
  { value: 'not_selected', label: 'Not selected' },
];

function TrackerCard({ sid, item, onDragStart, onDragEnd }) {
  const { setStage, remove, toggleDoc, setOutcome, openDetail } = useAppState();
  const [open, setOpen] = useState(false);
  const s = getScholarship(sid);
  if (!s) return null;
  const idx = STAGES.findIndex((x) => x.id === item.stage);
  const done = item.done.filter(Boolean).length;
  const total = s.documents.length;
  const days = daysUntil(s.deadline);

  return (
    <article
      draggable
      onDragStart={(e) => onDragStart(e, sid)}
      onDragEnd={onDragEnd}
      className="group rounded-[20px] bg-white p-4 shadow-soft ring-1 ring-ink/5"
    >
      <div className="flex items-start gap-2">
        <GripVertical size={18} className="mt-0.5 hidden shrink-0 cursor-grab text-ink/35 md:block" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug">
            <button type="button" onClick={() => openDetail(sid)} className="focus-square rounded text-left hover:underline underline-offset-4">
              {s.title}
            </button>
          </h3>
          <p className="mt-1 text-sm text-ink/65">
            {formatMoney(s.amount)} · <span className={days >= 0 && days <= 14 ? 'font-semibold text-[#B8321A]' : ''}>{deadlineLabel(s.deadline)}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => remove(sid)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/50 hover:bg-ink/10 hover:text-ink"
          aria-label={`Remove ${s.title} from tracker`}
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs font-medium text-ink/65">
          <span>Documents</span>
          <span className="tabular-nums">
            {done} of {total}
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label="Documents ready">
          <div className="h-full rounded-full bg-grass-deep transition-[width] duration-300" style={{ width: `${(done / total) * 100}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="-ml-2 mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold transition-colors duration-fast hover:bg-ink/[0.06] active:bg-ink/10"
      >
        <ListChecks size={16} aria-hidden="true" /> {open ? 'Hide checklist' : 'Show checklist'}
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5">
          {s.documents.map((d, i) => (
            <li key={d}>
              <label className="flex cursor-pointer items-start gap-2.5 rounded-xl p-1.5 text-sm hover:bg-ink/[0.04]">
                <input
                  type="checkbox"
                  checked={Boolean(item.done[i])}
                  onChange={() => toggleDoc(sid, i)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#5FA82E]"
                />
                <span className={item.done[i] ? 'text-ink/60 line-through' : ''}>{d}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      {item.stage === 'decision' && (
        <label className="mt-3 block">
          <span className="text-xs font-semibold text-ink/70">Outcome</span>
          <select
            value={item.outcome ?? 'waiting'}
            onChange={(e) => setOutcome(sid, e.target.value)}
            className="field select-chevron mt-1 py-2 text-sm"
          >
            {OUTCOMES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink/10 pt-3">
        <button
          type="button"
          disabled={idx === 0}
          onClick={() => setStage(sid, STAGES[idx - 1].id)}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors duration-fast hover:bg-ink/[0.06] active:bg-ink/10 disabled:invisible"
          aria-label={idx > 0 ? `Move ${s.title} back to ${STAGES[idx - 1].label}` : undefined}
        >
          <ChevronLeft size={16} aria-hidden="true" />
          {idx > 0 && STAGES[idx - 1].label}
        </button>
        <button
          type="button"
          disabled={idx === STAGES.length - 1}
          onClick={() => setStage(sid, STAGES[idx + 1].id)}
          className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-cream transition-colors duration-fast hover:bg-[#2a2820] active:bg-black disabled:invisible"
          aria-label={idx < STAGES.length - 1 ? `Move ${s.title} to ${STAGES[idx + 1].label}` : undefined}
        >
          {idx < STAGES.length - 1 && STAGES[idx + 1].label}
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const { tracker, setStage, resetDemo } = useAppState();
  const { reduce, t } = useTransitions();
  const loading = useSimulatedLoad('board', { initial: 400 });
  const [dragging, setDragging] = useState(null);
  const [over, setOver] = useState(null);

  const entries = Object.entries(tracker)
    .filter(([sid]) => getScholarship(sid))
    .sort(([a], [b]) => getScholarship(a).deadline.localeCompare(getScholarship(b).deadline));
  const byStage = Object.fromEntries(STAGES.map((s) => [s.id, []]));
  entries.forEach(([sid, item]) => byStage[item.stage]?.push([sid, item]));

  const upcoming = entries
    .filter(([sid, item]) => item.stage !== 'decision' && item.stage !== 'submitted' && daysUntil(getScholarship(sid).deadline) >= 0)
    .map(([sid, item]) => ({ s: getScholarship(sid), item }))
    .sort((a, b) => a.s.deadline.localeCompare(b.s.deadline));

  const dueSoon = upcoming.filter(({ s }) => daysUntil(s.deadline) <= 30).length;
  const potential = entries.reduce((sum, [sid]) => sum + getScholarship(sid).amount, 0);

  const onDragStart = (e, sid) => {
    e.dataTransfer.setData('text/plain', sid);
    e.dataTransfer.effectAllowed = 'move';
    setDragging(sid);
  };
  const onDragEnd = () => {
    setDragging(null);
    setOver(null);
  };
  const onDrop = (e, stage) => {
    e.preventDefault();
    const sid = e.dataTransfer.getData('text/plain') || dragging;
    if (sid && tracker[sid] && tracker[sid].stage !== stage) setStage(sid, stage);
    onDragEnd();
  };

  return (
    <div className="pb-24 pt-[calc(var(--nav-h)+2.5rem)]">
      <div className="container-x">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink/65">Your tracker</p>
            <h1 className="mt-2 text-display-sm font-semibold">Every application, one board.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <PillButton to="/scholarships" icon={Search}>
              Find more
            </PillButton>
            <PillButton variant="white" icon={RotateCcw} onClick={resetDemo}>
              Reset sample data
            </PillButton>
          </div>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_420px]">
        <dl className="grid grid-cols-3 gap-3 self-start">
          <div className="rounded-[20px] bg-grass p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider">Tracked</dt>
            <dd className="mt-6 text-2xl font-semibold tracking-tight sm:text-4xl">{entries.length}</dd>
          </div>
          <div className="rounded-[20px] bg-coral p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider">Due in 30 days</dt>
            <dd className="mt-6 text-2xl font-semibold tracking-tight sm:text-4xl">{dueSoon}</dd>
          </div>
          <div className="rounded-[20px] bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink/70">In play</dt>
            <dd className="mt-6 text-2xl font-semibold tracking-tight sm:text-4xl">{formatMoney(potential)}</dd>
          </div>
        </dl>
        <aside aria-labelledby="deadlines-title">
          <div className="h-full rounded-[26px] bg-white p-5">
            <h2 id="deadlines-title" className="flex items-center gap-2 text-lg font-semibold">
              <CalendarClock size={20} aria-hidden="true" /> Upcoming deadlines
            </h2>
            {upcoming.length ? (
              <ol className="mt-4 space-y-3">
                {upcoming.map(({ s, item }) => {
                  const d = daysUntil(s.deadline);
                  return (
                    <li key={s.id} className="flex items-center gap-3">
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-center text-xs font-semibold leading-tight ${
                          d <= 14 ? 'bg-coral' : d <= 30 ? 'bg-sun' : 'bg-cream'
                        }`}
                      >
                        {formatDate(s.deadline, { month: 'short' })}
                        <br />
                        {formatDate(s.deadline, { day: 'numeric' })}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{s.title}</span>
                        <span className="text-sm text-ink/65">
                          {deadlineLabel(s.deadline)} · {STAGES.find((x) => x.id === item.stage)?.label}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="mt-3 text-ink/70">Nothing waiting on you. Everything tracked is submitted or decided.</p>
            )}
          </div>
        </aside>
        </div>

        {entries.length === 0 && !loading ? (
          <div className="mt-10 flex flex-col items-center rounded-[28px] bg-white px-6 py-16 text-center">
            <Backpacker className="w-40" />
            <h2 className="mt-4 text-2xl font-semibold">Your board is empty.</h2>
            <p className="mt-2 max-w-sm text-ink/70">Save a scholarship or start an application and it will show up here, sorted by deadline.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PillButton to="/scholarships" icon={Search}>
                Browse scholarships
              </PillButton>
              <PillButton variant="white" icon={RotateCcw} onClick={resetDemo}>
                Load sample data
              </PillButton>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <section aria-labelledby="board-title">
              <h2 id="board-title" className="sr-only">
                Application stages
              </h2>
              <p className="mb-4 hidden text-sm text-ink/65 md:block">Drag a card between columns, or use the arrow buttons on each card.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STAGES.map((stage) => (
                  <div
                    key={stage.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (over !== stage.id) setOver(stage.id);
                    }}
                    onDragLeave={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setOver(null);
                    }}
                    onDrop={(e) => onDrop(e, stage.id)}
                    className={`flex min-h-[220px] flex-col rounded-[26px] p-3 transition-[box-shadow,background-color] duration-fast ${STAGE_TONES[stage.id]} ${
                      over === stage.id ? 'ring-[3px] ring-ink ring-offset-2 ring-offset-cream' : 'ring-1 ring-ink/10'
                    }`}
                  >
                    <h3 className="flex items-center justify-between px-2 pb-3 pt-1 font-semibold">
                      {stage.label}
                      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-ink px-2 text-xs text-cream">
                        {loading ? <span className="sr-only">Loading</span> : byStage[stage.id].length}
                      </span>
                    </h3>
                    {loading ? (
                      <div className="flex flex-col gap-3" aria-busy="true">
                        {Array.from({ length: Math.max(1, byStage[stage.id].length) }, (_, i) => (
                          <TrackerCardSkeleton key={i} />
                        ))}
                      </div>
                    ) : (
                    <ul className="flex flex-1 flex-col gap-3">
                      <AnimatePresence initial={false}>
                        {byStage[stage.id].map(([sid, item]) => (
                          <motion.li
                            key={sid}
                            layout={!reduce}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: dragging === sid ? 0.45 : 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={t('fast')}
                          >
                            <TrackerCard sid={sid} item={item} onDragStart={onDragStart} onDragEnd={onDragEnd} />
                          </motion.li>
                        ))}
                      </AnimatePresence>
                      {byStage[stage.id].length === 0 && (
                        <li className="grid flex-1 place-items-center rounded-[18px] border-2 border-dashed border-ink/20 p-4 text-center text-sm text-ink/70">
                          Drop a card here
                        </li>
                      )}
                    </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}

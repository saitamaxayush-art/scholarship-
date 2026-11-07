import { Bookmark, BookmarkCheck, CalendarClock, RefreshCw } from 'lucide-react';
import { useAppState } from '../../context/AppState';
import { SOURCE_LABEL, STAGES } from '../../data/scholarships';
import { deadlineLabel, daysUntil, formatDate, formatMoney } from '../../lib/format';
import { matchLabel } from '../../lib/match';
import { PillButton } from '../ui/PillButton';

export const CATEGORY_STYLES = {
  'Need-based': 'bg-sun',
  'Merit-based': 'bg-grass',
  'Identity-based': 'bg-[#F7C6D6]',
  'Field of study': 'bg-[#C9D3FA]',
};

export function MatchBadge({ match, className = '' }) {
  if (!match) return null;
  const tone = !match.eligible ? 'bg-ink/[0.07] text-ink/70' : match.percent >= 90 ? 'bg-grass text-ink' : 'bg-grass/45 text-ink';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${tone} ${className}`}>
      {match.eligible && <span className="tabular-nums">{match.percent}%</span>}
      {matchLabel(match)}
    </span>
  );
}

export function ScholarshipCard({ s, match }) {
  const { tracker, save, remove, openDetail } = useAppState();
  const tracked = tracker[s.id];
  const days = daysUntil(s.deadline);
  const urgent = days >= 0 && days <= 21;

  return (
    <article className="flex h-full flex-col rounded-[26px] bg-white p-5 shadow-soft ring-1 ring-ink/5 transition-shadow duration-base hover:shadow-card sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[s.category]}`}>{s.category}</span>
        <span className="text-xs font-medium text-ink/65">{SOURCE_LABEL[s.source]}</span>
        <MatchBadge match={match} className="ml-auto" />
      </div>

      <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em]">
        <button type="button" onClick={() => openDetail(s.id)} className="focus-square rounded-md text-left hover:underline decoration-2 underline-offset-4">
          {s.title}
        </button>
      </h3>
      <p className="mt-1 text-sm text-ink/65">{s.provider}</p>
      <p className="mt-3 line-clamp-2 text-[0.95rem] text-ink/75">{s.summary}</p>

      <dl className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
        <div>
          <dt className="sr-only">Award</dt>
          <dd className="text-3xl font-semibold tracking-[-0.04em]">{formatMoney(s.amount)}</dd>
        </div>
        <div className="flex items-center gap-1.5 pb-1 text-sm">
          <dt className="sr-only">Deadline</dt>
          <CalendarClock size={16} aria-hidden="true" className={urgent ? 'text-coral' : 'text-ink/70'} />
          <dd>
            <span className="font-medium">{formatDate(s.deadline, { month: 'short', day: 'numeric' })}</span>
            <span className={`ml-1.5 ${urgent ? 'font-semibold text-[#B8321A]' : 'text-ink/70'}`}>{deadlineLabel(s.deadline)}</span>
          </dd>
        </div>
        {s.renewable && (
          <div className="flex items-center gap-1 pb-1 text-sm text-ink/65">
            <dt className="sr-only">Renewal</dt>
            <RefreshCw size={14} aria-hidden="true" />
            <dd>Renewable</dd>
          </div>
        )}
      </dl>

      <div className="mt-auto flex items-center gap-2 pt-6">
        <PillButton size="sm" onClick={() => openDetail(s.id)}>
          View details
        </PillButton>
        {tracked ? (
          <button
            type="button"
            onClick={() => remove(s.id)}
            aria-pressed="true"
            aria-label={`Saved, ${STAGES.find((x) => x.id === tracked.stage)?.label}. Remove ${s.title} from tracker`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-sm font-semibold text-cream transition-colors duration-fast hover:bg-[#2a2820] active:bg-black"
          >
            <BookmarkCheck size={16} aria-hidden="true" />
            {STAGES.find((x) => x.id === tracked.stage)?.label}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => save(s.id)}
            aria-pressed="false"
            aria-label={`Save ${s.title}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold ring-2 ring-inset ring-ink/15 transition duration-fast hover:ring-ink active:bg-ink/10"
          >
            <Bookmark size={16} aria-hidden="true" />
            Save
          </button>
        )}
      </div>
    </article>
  );
}

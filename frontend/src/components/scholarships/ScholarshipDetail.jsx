import { Link } from 'react-router-dom';
import { Bookmark, Check, CircleHelp, FileText, LayoutGrid, PenLine, Play, X } from 'lucide-react';
import { useAppState, getScholarship } from '../../context/AppState';
import { SOURCE_LABEL, STAGES } from '../../data/scholarships';
import { deadlineLabel, formatDate, formatMoney } from '../../lib/format';
import { evaluateMatch } from '../../lib/match';
import { Modal } from '../ui/Modal';
import { PillButton } from '../ui/PillButton';
import { CATEGORY_STYLES, MatchBadge } from './ScholarshipCard';

const ReasonIcon = ({ ok }) => {
  if (ok === true) return <Check size={15} strokeWidth={3} aria-label="Meets" />;
  if (ok === false) return <X size={15} strokeWidth={3} aria-label="Does not meet" />;
  return <CircleHelp size={15} strokeWidth={2.6} aria-label="Unknown" />;
};

function DetailBody({ s }) {
  const { profile, tracker, save, startApplication, closeDetail } = useAppState();
  const match = evaluateMatch(s, profile);
  const tracked = tracker[s.id];
  const stageLabel = tracked ? STAGES.find((x) => x.id === tracked.stage)?.label : null;

  return (
    <div>
      <header className="rounded-t-[28px] bg-white px-6 pb-7 pt-8 sm:px-10 sm:pt-10">
        <div className="flex flex-wrap items-center gap-2 pr-12">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[s.category]}`}>{s.category}</span>
          <span className="text-sm font-medium text-ink/65">{SOURCE_LABEL[s.source]}</span>
        </div>
        <h2 id="detail-title" className="mt-4 text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          {s.title}
        </h2>
        <p className="mt-2 text-ink/70">{s.provider}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-grass px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider">Award</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{formatMoney(s.amount)}</dd>
          </div>
          <div className="rounded-2xl bg-cream px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink/70">Deadline</dt>
            <dd className="mt-1 font-semibold">{formatDate(s.deadline)}</dd>
            <dd className="text-sm text-ink/65">{deadlineLabel(s.deadline)}</dd>
          </div>
          <div className="col-span-2 rounded-2xl bg-cream px-4 py-3 sm:col-span-1">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink/70">Renews</dt>
            <dd className="mt-1 font-semibold">{s.renewable ? 'Yes, yearly' : 'One time'}</dd>
            <dd className="text-sm text-ink/65">{s.levels.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <div className="space-y-8 px-6 py-8 sm:px-10">
        <p className="text-lg leading-relaxed">{s.summary}</p>

        <section aria-labelledby="fit-title" className="rounded-[22px] border-2 border-ink/10 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="fit-title" className="text-lg font-semibold">
              Do you fit?
            </h3>
            <MatchBadge match={match} />
          </div>
          {match ? (
            <ul className="mt-4 space-y-2.5">
              {match.reasons.map((r) => (
                <li key={r.text} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                      r.ok === true ? 'bg-grass' : r.ok === false ? 'bg-coral' : 'bg-sun'
                    }`}
                  >
                    <ReasonIcon ok={r.ok} />
                  </span>
                  <span className="text-ink/85">{r.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-ink/75">
              Build a profile and we will check every line below against it for you.{' '}
              <Link to="/start" onClick={closeDetail} className="font-semibold underline decoration-grass-deep decoration-2 underline-offset-4">
                Build my profile
              </Link>
            </p>
          )}
        </section>

        <section aria-labelledby="who-title">
          <h3 id="who-title" className="text-lg font-semibold">
            Who can apply, in plain English
          </h3>
          <ul className="mt-3 space-y-2">
            {s.eligibility.map((line) => (
              <li key={line} className="flex gap-3 text-ink/85">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-grass-deep" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="send-title">
          <h3 id="send-title" className="text-lg font-semibold">
            What you will send
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {s.documents.map((d) => (
              <li key={d} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[0.95rem]">
                <FileText size={18} className="shrink-0 text-ink/70" aria-hidden="true" />
                {d}
              </li>
            ))}
            {s.essay && (
              <li className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-[0.95rem] sm:col-span-2">
                <PenLine size={18} className="mt-0.5 shrink-0 text-ink/70" aria-hidden="true" />
                <span>
                  <span className="font-semibold">Essay:</span> {s.essay}
                </span>
              </li>
            )}
          </ul>
        </section>
      </div>

      <footer className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-ink/10 bg-cream/95 px-6 py-4 backdrop-blur sm:px-10">
        {tracked ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream">
              In your tracker: {stageLabel}
            </span>
            {tracked.stage === 'saved' && (
              <PillButton size="sm" icon={Play} onClick={() => startApplication(s.id)}>
                Start application
              </PillButton>
            )}
            <PillButton size="sm" variant="white" to="/dashboard" icon={LayoutGrid} onClick={closeDetail}>
              Open tracker
            </PillButton>
          </>
        ) : (
          <>
            <PillButton size="sm" icon={Play} onClick={() => startApplication(s.id)}>
              Start application
            </PillButton>
            <PillButton size="sm" variant="white" icon={Bookmark} onClick={() => save(s.id)}>
              Save for later
            </PillButton>
          </>
        )}
      </footer>
    </div>
  );
}

/** Global detail dialog, opened from anywhere via openDetail(id). */
export function ScholarshipDetail() {
  const { detailId, closeDetail } = useAppState();
  const s = detailId ? getScholarship(detailId) : null;
  return (
    <Modal open={Boolean(s)} onClose={closeDetail} labelledBy="detail-title">
      {s && <DetailBody s={s} />}
    </Modal>
  );
}

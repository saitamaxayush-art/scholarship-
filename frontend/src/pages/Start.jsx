import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Check, Sparkles, Trash2 } from 'lucide-react';
import { FIELDS, IDENTITIES, LEVELS, SCHOLARSHIPS } from '../data/scholarships';
import { useAppState } from '../context/AppState';
import { evaluateMatch } from '../lib/match';
import { useTransitions } from '../lib/motion';
import { PillButton } from '../components/ui/PillButton';
import { Reacher } from '../components/illustrations/Characters';

const EMPTY = { level: '', field: '', gpa: '', financialNeed: null, identities: [] };
const ERROR_TEXT = 'text-[#B8321A]';

function validate(form) {
  const gpaNum = parseFloat(form.gpa);
  return {
    level: form.level ? '' : 'Choose where you are in school.',
    field: form.field ? '' : 'Choose a field, or pick Undecided.',
    gpa: form.gpa !== '' && (Number.isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) ? 'Enter a GPA between 0 and 4.0, like 3.4.' : '',
    financialNeed: form.financialNeed === null ? 'Choose yes or no.' : '',
  };
}

/** Header badge: a checkmark once answered, an alert when the answer needs attention. */
function Status({ state }) {
  if (state === 'valid') {
    return (
      <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-grass" title="Answered">
        <Check size={15} strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Answered</span>
      </span>
    );
  }
  if (state === 'error') {
    return (
      <span className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coral">
        <AlertCircle size={16} strokeWidth={2.6} aria-hidden="true" />
        <span className="sr-only">Needs an answer</span>
      </span>
    );
  }
  return null;
}

function Fieldset({ legend, hint, children, n, state, error, errorId, fieldsetRef }) {
  return (
    <fieldset
      ref={fieldsetRef}
      className={`rounded-[26px] bg-white p-6 ring-2 transition-[box-shadow] duration-base sm:p-7 ${
        state === 'error' ? 'ring-[#B8321A]' : state === 'valid' ? 'ring-grass-deep/40' : 'ring-transparent'
      }`}
    >
      <legend className="sr-only">{legend}</legend>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-ink/65" aria-hidden="true">
          {n}
        </span>
        <span className="text-xl font-semibold tracking-tight" aria-hidden="true">
          {legend}
        </span>
        <Status state={state} />
      </div>
      {hint && <p className="mt-1 text-sm text-ink/65">{hint}</p>}
      <div className="mt-4">{children}</div>
      {error && (
        <p id={errorId} className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${ERROR_TEXT}`}>
          <AlertCircle size={15} aria-hidden="true" /> {error}
        </p>
      )}
    </fieldset>
  );
}

export default function Start() {
  const { profile, setProfile } = useAppState();
  const navigate = useNavigate();
  const { reduce } = useTransitions();
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(profile ?? {}) }));
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const refs = { level: useRef(null), field: useRef(null), gpa: useRef(null), financialNeed: useRef(null) };

  const errors = validate(form);
  const errorCount = Object.values(errors).filter(Boolean).length;
  const shown = (k) => ((attempted || touched[k]) && errors[k]) || '';
  // Required answers show a check once given; the optional GPA only when filled in and valid.
  const stateOf = (k) => {
    if (shown(k)) return 'error';
    if (errors[k]) return null;
    if (k === 'gpa') return form.gpa !== '' ? 'valid' : null;
    return 'valid';
  };
  const complete = !errors.level && !errors.field && !errors.financialNeed && !errors.gpa;
  const preview = complete ? SCHOLARSHIPS.filter((s) => evaluateMatch(s, form).eligible).length : null;

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const touch = (key) => setTouched((t) => (t[key] ? t : { ...t, [key]: true }));
  const toggleIdentity = (id) =>
    setForm((f) => ({ ...f, identities: f.identities.includes(id) ? f.identities.filter((x) => x !== id) : [...f.identities, id] }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!complete) {
      setAttempted(true);
      const invalid = Object.keys(errors).filter((k) => errors[k]);
      if (!reduce) {
        invalid.forEach((k) =>
          refs[k].current
            ?.closest('fieldset')
            ?.animate([{ translate: '0' }, { translate: '-8px' }, { translate: '7px' }, { translate: '-5px' }, { translate: '3px' }, { translate: '0' }], {
              duration: 420,
              easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            }),
        );
      }
      refs[invalid[0]].current?.focus();
      return;
    }
    setProfile({ ...form, gpa: form.gpa === '' ? '' : String(parseFloat(form.gpa)) });
    navigate('/scholarships?sort=match&matches=1');
  };

  const gpaState = stateOf('gpa');

  return (
    <div className="pb-24 pt-[calc(var(--nav-h)+2.5rem)]">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="eyebrow text-ink/65">Your profile</p>
          <h1 className="mt-2 max-w-[14ch] text-display-sm font-semibold">One profile. Every match.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink/75">
            Four quick questions. Your answers stay in this browser and are only used to check eligibility.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
            <Fieldset n="01" legend="Where are you in school?" state={stateOf('level')} error={shown('level')} errorId="level-error">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Education level" aria-describedby={shown('level') ? 'level-error' : undefined}>
                {LEVELS.map((l, i) => (
                  <button
                    key={l}
                    ref={i === 0 ? refs.level : undefined}
                    type="button"
                    aria-pressed={form.level === l}
                    className="chip text-base"
                    onClick={() => {
                      update('level', l);
                      touch('level');
                    }}
                  >
                    {form.level === l && <Check size={16} aria-hidden="true" />}
                    {l}
                  </button>
                ))}
              </div>
            </Fieldset>

            <Fieldset
              n="02"
              legend="What are you studying?"
              hint="Pick the closest one. Awards open to any major always count."
              state={stateOf('field')}
            >
              <label htmlFor="field" className="sr-only">
                Field of study
              </label>
              <select
                id="field"
                ref={refs.field}
                value={form.field}
                onChange={(e) => {
                  update('field', e.target.value);
                  touch('field');
                }}
                onBlur={() => touch('field')}
                aria-invalid={Boolean(shown('field'))}
                aria-describedby={shown('field') ? 'field-error' : undefined}
                className={`field select-chevron sm:max-w-sm ${shown('field') ? '!border-[#B8321A]' : ''}`}
              >
                <option value="">Choose a field</option>
                {FIELDS.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
                <option value="Undecided">Undecided</option>
              </select>
              {shown('field') && (
                <p id="field-error" className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${ERROR_TEXT}`}>
                  <AlertCircle size={15} aria-hidden="true" /> {errors.field}
                </p>
              )}
              <div className="mt-5">
                <label htmlFor="gpa" className="block text-sm font-semibold">
                  GPA on a 4.0 scale <span className="font-normal text-ink/70">(optional)</span>
                </label>
                <div className="relative mt-1.5 sm:max-w-[12rem]">
                  <input
                    id="gpa"
                    ref={refs.gpa}
                    inputMode="decimal"
                    autoComplete="off"
                    value={form.gpa}
                    onChange={(e) => update('gpa', e.target.value.replace(/[^\d.]/g, ''))}
                    onBlur={() => touch('gpa')}
                    placeholder="3.4"
                    className={`field pr-11 ${
                      gpaState === 'error' ? '!border-[#B8321A]' : gpaState === 'valid' ? '!border-grass-deep' : ''
                    }`}
                    aria-invalid={gpaState === 'error'}
                    aria-describedby="gpa-help"
                  />
                  {gpaState && (
                    <span
                      className={`pointer-events-none absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full ${
                        gpaState === 'valid' ? 'bg-grass' : 'bg-coral'
                      }`}
                      aria-hidden="true"
                    >
                      {gpaState === 'valid' ? <Check size={14} strokeWidth={3} /> : <AlertCircle size={14} strokeWidth={2.6} />}
                    </span>
                  )}
                </div>
                <p id="gpa-help" className={`mt-1.5 text-sm ${gpaState === 'error' ? `font-semibold ${ERROR_TEXT}` : 'text-ink/70'}`}>
                  {gpaState === 'error'
                    ? errors.gpa
                    : 'Leave it blank and we will flag awards with a GPA minimum instead of ruling them out.'}
                </p>
              </div>
            </Fieldset>

            <Fieldset
              n="03"
              legend="Do you have financial need?"
              hint="Roughly: would paying the full cost of college be a real strain for your household?"
              state={stateOf('financialNeed')}
              error={shown('financialNeed')}
              errorId="need-error"
            >
              <div className="flex flex-wrap gap-2" role="group" aria-label="Financial need" aria-describedby={shown('financialNeed') ? 'need-error' : undefined}>
                {[
                  { v: true, label: 'Yes' },
                  { v: false, label: 'No' },
                ].map((o, i) => (
                  <button
                    key={o.label}
                    ref={i === 0 ? refs.financialNeed : undefined}
                    type="button"
                    aria-pressed={form.financialNeed === o.v}
                    className="chip text-base"
                    onClick={() => {
                      update('financialNeed', o.v);
                      touch('financialNeed');
                    }}
                  >
                    {form.financialNeed === o.v && <Check size={16} aria-hidden="true" />}
                    {o.label}
                  </button>
                ))}
              </div>
            </Fieldset>

            <Fieldset n="04" legend="Anything else that applies?" hint="Optional. Many awards are set aside for specific groups. Choose any that fit you.">
              <div className="grid gap-2 sm:grid-cols-2">
                {IDENTITIES.map((i) => (
                  <label
                    key={i.id}
                    className="pressable flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink/10 px-4 py-3 transition-colors duration-fast hover:border-ink/30 active:bg-cream has-[:checked]:border-ink has-[:checked]:bg-grass/30"
                  >
                    <input type="checkbox" checked={form.identities.includes(i.id)} onChange={() => toggleIdentity(i.id)} className="h-5 w-5 accent-[#15140F]" />
                    <span className="font-medium">{i.label}</span>
                  </label>
                ))}
              </div>
            </Fieldset>

            {attempted && errorCount > 0 && (
              <p role="alert" className="flex items-center gap-2 rounded-2xl bg-coral px-5 py-3 font-medium">
                <AlertCircle size={18} aria-hidden="true" />
                {errorCount === 1 ? 'One answer needs attention.' : `${errorCount} answers need attention.`} They are marked above.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PillButton type="submit" size="lg" icon={Sparkles}>
                {profile ? 'Update my matches' : 'Show my matches'}
              </PillButton>
              {profile && (
                <PillButton
                  variant="white"
                  icon={Trash2}
                  onClick={() => {
                    setProfile(null);
                    setForm(EMPTY);
                    setTouched({});
                    setAttempted(false);
                  }}
                >
                  Clear profile
                </PillButton>
              )}
            </div>
          </form>
        </div>

        <aside className="lg:pt-24" aria-live="polite">
          <div className="sticky top-[calc(var(--nav-h)+1.5rem)] overflow-hidden rounded-[32px] bg-grass p-7">
            <Reacher className="mx-auto w-40" />
            {preview === null ? (
              <>
                <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight">Answer the first three to see your count.</p>
                <p className="mt-2 text-ink/75">We check every one of the {SCHOLARSHIPS.length} sample listings as you go.</p>
              </>
            ) : (
              <>
                <p className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.05em]">{preview}</p>
                <p className="mt-2 text-xl font-medium leading-snug">of {SCHOLARSHIPS.length} sample listings fit your answers so far.</p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

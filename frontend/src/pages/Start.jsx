import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Trash2 } from 'lucide-react';
import { FIELDS, IDENTITIES, LEVELS, SCHOLARSHIPS } from '../data/scholarships';
import { useAppState } from '../context/AppState';
import { evaluateMatch } from '../lib/match';
import { PillButton } from '../components/ui/PillButton';
import { Reacher } from '../components/illustrations/Characters';

const EMPTY = { level: '', field: '', gpa: '', financialNeed: null, identities: [] };

function Fieldset({ legend, hint, children, n }) {
  return (
    <fieldset className="rounded-[26px] bg-white p-6 sm:p-7">
      <legend className="sr-only">{legend}</legend>
      <div className="flex items-baseline gap-3" aria-hidden="true">
        <span className="text-sm font-semibold text-ink/65">{n}</span>
        <span className="text-xl font-semibold tracking-tight">{legend}</span>
      </div>
      {hint && <p className="mt-1 text-sm text-ink/65">{hint}</p>}
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

export default function Start() {
  const { profile, setProfile } = useAppState();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(profile ?? {}) }));
  const [error, setError] = useState('');

  const gpaNum = parseFloat(form.gpa);
  const gpaInvalid = form.gpa !== '' && (Number.isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0);
  const complete = form.level && form.field && form.financialNeed !== null && !gpaInvalid;
  const preview = complete ? SCHOLARSHIPS.filter((s) => evaluateMatch(s, form).eligible).length : null;

  const update = (key, value) => {
    setError('');
    setForm((f) => ({ ...f, [key]: value }));
  };
  const toggleIdentity = (id) =>
    setForm((f) => ({ ...f, identities: f.identities.includes(id) ? f.identities.filter((x) => x !== id) : [...f.identities, id] }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!complete) {
      setError(gpaInvalid ? 'GPA should be a number between 0 and 4.0.' : 'Pick your level, your field and whether you have financial need to see matches.');
      return;
    }
    setProfile({ ...form, gpa: form.gpa === '' ? '' : String(gpaNum) });
    navigate('/scholarships?sort=match&matches=1');
  };

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
            <Fieldset n="01" legend="Where are you in school?">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Education level">
                {LEVELS.map((l) => (
                  <button key={l} type="button" aria-pressed={form.level === l} className="chip text-base" onClick={() => update('level', l)}>
                    {form.level === l && <Check size={16} aria-hidden="true" />}
                    {l}
                  </button>
                ))}
              </div>
            </Fieldset>

            <Fieldset n="02" legend="What are you studying?" hint="Pick the closest one. Awards open to any major always count.">
              <label htmlFor="field" className="sr-only">
                Field of study
              </label>
              <select id="field" value={form.field} onChange={(e) => update('field', e.target.value)} className="field select-chevron sm:max-w-sm">
                <option value="">Choose a field</option>
                {FIELDS.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
                <option value="Undecided">Undecided</option>
              </select>
              <div className="mt-5">
                <label htmlFor="gpa" className="block text-sm font-semibold">
                  GPA on a 4.0 scale <span className="font-normal text-ink/70">(optional)</span>
                </label>
                <input
                  id="gpa"
                  inputMode="decimal"
                  value={form.gpa}
                  onChange={(e) => update('gpa', e.target.value.replace(/[^\d.]/g, ''))}
                  placeholder="3.4"
                  className="field mt-1.5 sm:max-w-[10rem]"
                  aria-invalid={gpaInvalid}
                  aria-describedby="gpa-help"
                />
                <p id="gpa-help" className={`mt-1.5 text-sm ${gpaInvalid ? 'font-semibold text-[#B8321A]' : 'text-ink/70'}`}>
                  {gpaInvalid ? 'Enter a number between 0 and 4.0.' : 'Leave it blank and we will flag awards with a GPA minimum instead of ruling them out.'}
                </p>
              </div>
            </Fieldset>

            <Fieldset n="03" legend="Do you have financial need?" hint="Roughly: would paying the full cost of college be a real strain for your household?">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Financial need">
                {[
                  { v: true, label: 'Yes' },
                  { v: false, label: 'No' },
                ].map((o) => (
                  <button key={o.label} type="button" aria-pressed={form.financialNeed === o.v} className="chip text-base" onClick={() => update('financialNeed', o.v)}>
                    {form.financialNeed === o.v && <Check size={16} aria-hidden="true" />}
                    {o.label}
                  </button>
                ))}
              </div>
            </Fieldset>

            <Fieldset n="04" legend="Anything else that applies?" hint="Optional. Many awards are set aside for specific groups. Choose any that fit you.">
              <div className="grid gap-2 sm:grid-cols-2">
                {IDENTITIES.map((i) => (
                  <label key={i.id} className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink/10 px-4 py-3 transition-colors hover:border-ink/30 has-[:checked]:border-ink has-[:checked]:bg-grass/30">
                    <input type="checkbox" checked={form.identities.includes(i.id)} onChange={() => toggleIdentity(i.id)} className="h-5 w-5 accent-[#15140F]" />
                    <span className="font-medium">{i.label}</span>
                  </label>
                ))}
              </div>
            </Fieldset>

            {error && (
              <p role="alert" className="rounded-2xl bg-coral px-5 py-3 font-medium">
                {error}
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
                <p className="mt-2 text-xl font-medium leading-snug">
                  of {SCHOLARSHIPS.length} sample listings fit your answers so far.
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

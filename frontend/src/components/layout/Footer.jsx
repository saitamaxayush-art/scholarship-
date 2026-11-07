import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Mail, Search } from 'lucide-react';
import { Logomark, Wordmark } from '../brand/Logo';
import { PillButton } from '../ui/PillButton';
import { useAppState } from '../../context/AppState';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Scholarships', to: '/scholarships' },
      { label: 'How it Works', to: '/#how-it-works' },
      { label: 'Application tracker', to: '/dashboard' },
      { label: 'Build your profile', to: '/start' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'All guides', to: '/#resources' },
      { label: 'Scholarship amounts', to: '/resources/how-much-can-you-get' },
      { label: 'Essay writing', to: '/resources/essays-reviewers-read' },
      { label: 'Application timelines', to: '/resources/application-timeline' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: 'mailto:hello@meritrail.example' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
];

const SOCIALS = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'GitHub', Icon: Github },
];

export function Footer() {
  const { notify } = useAppState();
  const linkClass = 'rounded-md text-[1.0625rem] font-medium text-ink/80 transition-colors hover:text-ink hover:underline decoration-2 underline-offset-4 focus-square';

  return (
    <footer className="relative overflow-hidden bg-sun text-ink">
      <div className="container-x pb-10 pt-20 sm:pt-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display font-semibold">Start your search.</h2>
          <PillButton to="/start" variant="ink" size="lg" icon={Search} className="self-start md:self-auto">
            Build my profile
          </PillButton>
        </div>

        <div className="mt-16 grid gap-10 border-t-2 border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2" aria-label="meritrail home">
              <Logomark />
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-ink/75">
              One profile, every match, every deadline in one place. A frontend demo built on sample data.
            </p>
            <address className="mt-6 not-italic text-sm leading-relaxed text-ink/75">
              meritrail demo team
              <br />
              Placeholder address, 100 Example Street
              <br />
              <a className="underline decoration-ink/40 underline-offset-4 hover:decoration-ink" href="mailto:hello@meritrail.example">
                hello@meritrail.example
              </a>
            </address>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-ink/70">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className={linkClass}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className={`${linkClass} inline-flex items-center gap-1.5`}>
                        <Mail size={15} aria-hidden="true" />
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t-2 border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink/70">© 2026 meritrail. All listings shown are sample data for demonstration.</p>
          <ul className="flex gap-2" aria-label="Social media">
            {SOCIALS.map(({ label, Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => notify(`The ${label} account is not live for this demo yet.`)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink text-sun transition-transform hover:-translate-y-0.5"
                  aria-label={`meritrail on ${label} (not live in this demo)`}
                >
                  <Icon size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

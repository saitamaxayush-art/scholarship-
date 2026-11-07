import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { PillButton } from '../ui/PillButton';
import { useAppState } from '../../context/AppState';
import { useTransitions } from '../../lib/motion';

export const NAV_LINKS = [
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'How it Works', to: '/#how-it-works' },
  { label: 'For Students', to: '/#for-students' },
  { label: 'Resources', to: '/#resources' },
  { label: 'Tracker', to: '/dashboard' },
];

function NavItem({ link, onClick, className }) {
  const isRoute = !link.to.includes('#');
  if (isRoute) {
    return (
      <NavLink
        to={link.to}
        onClick={onClick}
        className={({ isActive }) =>
          `${className} ${isActive ? 'bg-ink text-cream' : 'hover:bg-ink/[0.06]'}`
        }
      >
        {link.label}
      </NavLink>
    );
  }
  return (
    <Link to={link.to} onClick={onClick} className={`${className} hover:bg-ink/[0.06]`}>
      {link.label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { tracker } = useAppState();
  const { t } = useTransitions();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const trackedCount = Object.keys(tracker).length;

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = 'rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors duration-fast active:bg-ink/15';

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b border-ink/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <a
        href="#main"
        className="absolute left-4 top-3 z-10 -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream focus:translate-y-0"
      >
        Skip to content
      </a>
      <nav className="container-x flex h-full items-center justify-between gap-4" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to} className="relative">
              <NavItem link={l} className={linkClass} />
              {l.to === '/dashboard' && trackedCount > 0 && (
                <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] font-semibold text-ink">
                  {trackedCount}
                  <span className="sr-only"> scholarships tracked</span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <PillButton to="/start" icon={Sparkles} className="hidden sm:inline-flex">
            Get Started
          </PillButton>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white ring-2 ring-ink/10 transition duration-fast hover:ring-ink/40 active:bg-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={t('fast')}
            className="absolute inset-x-0 top-full border-b border-ink/10 bg-cream px-4 pb-6 pt-2 shadow-soft lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavItem link={l} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg font-medium" />
                </li>
              ))}
            </ul>
            <PillButton to="/start" icon={Sparkles} className="mt-4 w-full justify-center sm:hidden" onClick={() => setOpen(false)}>
              Get Started
            </PillButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

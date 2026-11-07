import { Link } from 'react-router-dom';

export function Logomark({ size = 34, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 27c0-8 8-14.5 13-10s-2 11.5-5 8.5S18 9 27 9c5.5 0 7.5 4 7.5 7.5"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33" cy="27" r="4.6" fill="var(--grass)" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`text-[1.6rem] font-semibold leading-none tracking-[-0.06em] ${className}`}>
      merit<span className="font-medium">rail</span>
    </span>
  );
}

export function Logo({ className = '', onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`pressable group inline-flex items-center gap-2 rounded-full text-ink transition-[scale] duration-fast ${className}`} aria-label="meritrail home">
      <Logomark className="transition-transform duration-base group-hover:-rotate-12" />
      <Wordmark />
    </Link>
  );
}

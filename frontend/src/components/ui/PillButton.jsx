import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const VARIANTS = {
  grass: 'bg-grass text-ink hover:bg-[#9ddb5c] shadow-[inset_0_-3px_0_rgba(95,168,46,0.55)]',
  white: 'bg-white text-ink ring-2 ring-inset ring-ink/10 hover:ring-ink/30',
  outline: 'bg-transparent text-ink ring-2 ring-inset ring-ink hover:bg-ink/5',
  ink: 'bg-ink text-cream hover:bg-[#2a2820]',
};

const CIRCLES = {
  grass: 'bg-white text-ink',
  white: 'bg-grass text-ink',
  outline: 'bg-ink text-cream',
  ink: 'bg-grass text-ink',
};

const SIZES = {
  md: { root: 'gap-3 py-1.5 pl-1.5 pr-5 text-[0.95rem]', circle: 'h-9 w-9', icon: 17 },
  sm: { root: 'gap-2 py-1 pl-1 pr-3.5 text-sm', circle: 'h-7 w-7', icon: 14 },
  lg: { root: 'gap-3.5 py-2 pl-2 pr-7 text-lg', circle: 'h-11 w-11', icon: 20 },
};

/**
 * Pill button with a leading icon circle. Renders a router Link for `to`,
 * an anchor for `href`, otherwise a <button>.
 */
export function PillButton({
  to,
  href,
  variant = 'grass',
  size = 'md',
  icon: Icon = ArrowUpRight,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const s = SIZES[size];
  const classes = `group inline-flex select-none items-center whitespace-nowrap rounded-full font-semibold tracking-tight transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${s.root} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-105 ${s.circle} ${CIRCLES[variant]}`}
      >
        <Icon size={s.icon} strokeWidth={2.4} />
      </span>
      <span>{children}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  );
}

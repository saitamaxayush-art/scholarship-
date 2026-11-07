// "Today" is fixed by the system clock; deadlines are compared at day granularity.
const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const parseDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const daysUntil = (iso) => Math.round((parseDate(iso) - startOfDay(new Date())) / DAY);

export const formatMoney = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export const formatDate = (iso, opts = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  parseDate(iso).toLocaleDateString('en-US', opts);

export const deadlineLabel = (iso) => {
  const d = daysUntil(iso);
  if (d < 0) return 'Closed';
  if (d === 0) return 'Due today';
  if (d === 1) return 'Due tomorrow';
  return `${d} days left`;
};

export const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

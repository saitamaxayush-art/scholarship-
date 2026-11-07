import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAppState } from '../../context/AppState';
import { useTransitions } from '../../lib/motion';

export function Toasts() {
  const { toasts, dismissToast } = useAppState();
  const { t } = useTransitions();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            transition={t('base')}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-2 text-sm font-medium text-cream shadow-card"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-grass text-ink" aria-hidden="true">
              <Check size={15} strokeWidth={3} />
            </span>
            <span className="pr-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-cream/70 hover:bg-white/10 hover:text-cream focus-visible:outline-cream"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

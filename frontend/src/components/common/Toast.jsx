import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const Toast = () => {
  const { toast, dismissToast } = useScholarship();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-md w-full px-4">
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-start gap-3 p-4 bg-forest-deep text-paper border border-gold/40 rounded shadow-panel"
          >
            <div className="mt-0.5 text-gold shrink-0">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Info className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 text-sm font-normal leading-relaxed text-[#EDE9DF]">
              {toast.message}
            </div>
            <button
              onClick={dismissToast}
              className="text-stone hover:text-paper p-1 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


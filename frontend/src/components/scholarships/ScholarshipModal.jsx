import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Circle, Calendar, DollarSign, Building2, MapPin, FileText, Check, ArrowRight, Bookmark } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const ScholarshipModal = () => {
  const {
    selectedScholarship,
    closeScholarshipModal,
    addToTracker,
    updateTrackerStage,
    getTrackerItemByScholarshipId
  } = useScholarship();

  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState('eligibility'); // 'eligibility' | 'documents' | 'logistics'

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeScholarshipModal();
      }
    };
    if (selectedScholarship) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedScholarship, closeScholarshipModal]);

  if (!selectedScholarship) return null;

  const trackerItem = getTrackerItemByScholarshipId(selectedScholarship.id);

  const stages = [
    { key: 'saved', label: 'Saved' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'decision', label: 'Decision' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-forest-deep/70 backdrop-blur-sm">
        {/* Backdrop click */}
        <div
          className="fixed inset-0"
          onClick={closeScholarshipModal}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative w-full max-w-3xl bg-paper border border-sand rounded shadow-panel z-10 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-sand bg-paper flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-stone bg-sand px-2 py-0.5 rounded">
                  {selectedScholarship.field}
                </span>
                <span className="text-xs font-mono font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded border border-forest/20">
                  {selectedScholarship.matchScore}% Match
                </span>
                <span className="text-xs text-stone">
                  {selectedScholarship.educationLevel}
                </span>
              </div>
              <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-ink pt-1">
                {selectedScholarship.title}
              </h2>
              <p className="text-xs text-stone flex items-center gap-2">
                <span>{selectedScholarship.provider}</span>
                <span>&bull;</span>
                <span>Region: {selectedScholarship.region}</span>
              </p>
            </div>
            <button
              onClick={closeScholarshipModal}
              className="p-1.5 rounded text-stone hover:text-ink hover:bg-sand transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 bg-[#F5F1E6] border-b border-sand text-xs">
            <div>
              <div className="text-stone">Award Amount</div>
              <div className="font-serif text-lg font-bold text-forest">
                {selectedScholarship.amountFormatted}
              </div>
            </div>
            <div>
              <div className="text-stone">Application Deadline</div>
              <div className="font-medium text-ink font-mono pt-1">
                {new Date(selectedScholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div className="text-stone">Minimum GPA</div>
              <div className="font-medium text-ink pt-1">
                {selectedScholarship.minGpa ? `${selectedScholarship.minGpa} on 4.0 scale` : 'None required'}
              </div>
            </div>
            <div>
              <div className="text-stone">Application Fee</div>
              <div className="font-medium text-forest pt-1">
                {selectedScholarship.applicationFee}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-sand px-6 gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`py-3 relative ${
                activeTab === 'eligibility' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              Eligibility Criteria
              {activeTab === 'eligibility' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`py-3 relative ${
                activeTab === 'documents' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              Required Documents ({selectedScholarship.requiredDocuments.length})
              {activeTab === 'documents' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('logistics')}
              className={`py-3 relative ${
                activeTab === 'logistics' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              Disbursement &amp; Notes
              {activeTab === 'logistics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-5 text-sm text-ink/80 flex-1">
            {activeTab === 'eligibility' && (
              <div className="space-y-4">
                <div className="p-4 bg-paper border border-sand rounded">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone mb-2">
                    Scope &amp; Purpose
                  </h4>
                  <p className="leading-relaxed text-ink text-sm">
                    {selectedScholarship.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-ink mb-3">
                    Verified Eligibility Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedScholarship.eligibilityCriteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span className="leading-snug text-ink">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <p className="text-xs text-stone">
                  Ensure all materials are prepared in PDF format with institutional stamps or signatures where required.
                </p>
                <div className="space-y-2.5">
                  {selectedScholarship.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-sand bg-paper rounded flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-forest" />
                        <span className="font-medium text-ink">{doc.name}</span>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 bg-sand rounded text-stone">
                        Standard PDF
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'logistics' && (
              <div className="space-y-4">
                <div className="border border-sand p-4 rounded bg-paper space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
                    Funding Disbursement Method
                  </h4>
                  <p className="text-ink leading-relaxed">
                    {selectedScholarship.disbursementType}. Payments are processed following formal institutional enrollment verification.
                  </p>
                </div>

                <div className="border border-sand p-4 rounded bg-paper space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone">
                    Associated Academic Tags
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedScholarship.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-sand text-ink rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls: Live Tracker Status Management */}
          <div className="p-5 border-t border-sand bg-[#F9F6EE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <div className="text-xs font-medium text-stone mb-1">
                {trackerItem ? `Currently in Tracker (${trackerItem.stage.replace('_', ' ')})` : 'Application Tracker Status:'}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {stages.map((stg) => {
                  const isActive = trackerItem && trackerItem.stage === stg.key;
                  return (
                    <button
                      key={stg.key}
                      type="button"
                      onClick={() => {
                        if (trackerItem) {
                          updateTrackerStage(trackerItem.id, stg.key);
                        } else {
                          addToTracker(selectedScholarship.id, stg.key);
                        }
                      }}
                      className={`text-xs px-2.5 py-1 rounded transition-all font-medium ${
                        isActive
                          ? 'bg-forest text-paper font-semibold shadow-subtle'
                          : 'bg-paper border border-sand hover:border-forest text-ink'
                      }`}
                    >
                      {stg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={closeScholarshipModal}
                className="btn-secondary text-xs py-2 px-3.5"
              >
                Close
              </button>
              {!trackerItem && (
                <button
                  type="button"
                  onClick={() => addToTracker(selectedScholarship.id, 'in_progress')}
                  className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Start Tracking Application</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


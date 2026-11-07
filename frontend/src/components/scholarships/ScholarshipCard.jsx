import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Award, CheckCircle2, Bookmark, ArrowRight, FileText } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const ScholarshipCard = ({ scholarship, viewMode = 'grid' }) => {
  const { openScholarshipModal, addToTracker, getTrackerItemByScholarshipId } = useScholarship();
  const trackerItem = getTrackerItemByScholarshipId(scholarship.id);

  // Compute days until deadline
  const daysUntilDeadline = () => {
    const today = new Date();
    const deadlineDate = new Date(scholarship.deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = daysUntilDeadline();
  const isUrgent = daysLeft >= 0 && daysLeft <= 21;

  const stageLabels = {
    saved: 'Saved in Tracker',
    in_progress: 'In Progress',
    submitted: 'Submitted',
    decision: 'Decision Received'
  };

  if (viewMode === 'list') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.3 }}
        className={`p-5 bg-paper border transition-all duration-200 rounded ${
          scholarship.isFeatured
            ? 'border-gold/60 shadow-subtle bg-gradient-to-r from-paper to-[#F7F4EA]'
            : 'border-sand hover:border-forest/40 hover:shadow-subtle'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {scholarship.isFeatured && (
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-gold text-forest-deep px-2 py-0.5 rounded-[2px]">
                  Featured Grant
                </span>
              )}
              <span className="text-xs font-medium text-stone px-2 py-0.5 bg-sand rounded">
                {scholarship.field}
              </span>
              <span className="text-xs text-stone">
                {scholarship.educationLevel}
              </span>
              <span className="text-xs font-mono text-forest font-semibold ml-auto md:ml-0">
                {scholarship.matchScore}% Match
              </span>
            </div>

            <h3
              onClick={() => openScholarshipModal(scholarship)}
              className="font-serif text-lg md:text-xl font-bold text-ink hover:text-forest cursor-pointer transition-colors"
            >
              {scholarship.title}
            </h3>

            <p className="text-xs text-stone">
              Administered by {scholarship.provider} &bull; Region: {scholarship.region}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-sand/60">
            <div>
              <div className="font-serif text-xl font-bold text-forest text-right">
                {scholarship.amountFormatted}
              </div>
              <div className={`text-xs text-right ${isUrgent ? 'text-[#963F2C] font-semibold' : 'text-stone'}`}>
                Due {new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ({daysLeft > 0 ? `${daysLeft} days left` : 'Past deadline'})
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openScholarshipModal(scholarship)}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => addToTracker(scholarship.id, trackerItem ? trackerItem.stage : 'in_progress')}
                className={`text-xs py-1.5 px-3 flex items-center gap-1.5 transition-colors rounded ${
                  trackerItem
                    ? 'bg-forest/10 text-forest border border-forest/30 font-medium'
                    : 'btn-primary'
                }`}
              >
                {trackerItem ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>{stageLabels[trackerItem.stage]}</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Track</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Grid Card View
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col justify-between p-6 bg-paper rounded transition-all duration-200 border ${
        scholarship.isFeatured
          ? 'border-gold/70 shadow-elevated relative bg-gradient-to-b from-paper to-[#FAF6EE]'
          : 'border-sand hover:border-forest/40 hover:shadow-subtle'
      }`}
    >
      <div>
        {/* Top Badges & Match */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            {scholarship.isFeatured && (
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-gold text-forest-deep px-2 py-0.5 rounded-[2px]">
                Featured
              </span>
            )}
            <span className="text-xs font-medium text-stone bg-sand px-2 py-0.5 rounded">
              {scholarship.field}
            </span>
          </div>
          <span className="text-xs font-mono font-semibold text-forest flex items-center gap-1 bg-forest/5 px-2 py-0.5 rounded border border-forest/15">
            {scholarship.matchScore}% Match
          </span>
        </div>

        {/* Amount & Title */}
        <div className="mb-2">
          <span className="font-serif text-2xl md:text-3xl font-bold text-forest tracking-tight block">
            {scholarship.amountFormatted}
          </span>
          <h3
            onClick={() => openScholarshipModal(scholarship)}
            className="font-serif text-lg font-bold text-ink hover:text-forest cursor-pointer transition-colors mt-1.5 leading-snug line-clamp-2"
          >
            {scholarship.title}
          </h3>
        </div>

        {/* Provider */}
        <p className="text-xs text-stone mb-4 font-normal">
          {scholarship.provider} &bull; {scholarship.educationLevel}
        </p>

        {/* Short Summary */}
        <p className="text-sm text-ink/80 leading-relaxed mb-5 line-clamp-3 font-normal">
          {scholarship.summary}
        </p>
      </div>

      <div>
        {/* Requirements & Deadline summary */}
        <div className="pt-4 border-t border-sand space-y-2 mb-5 text-xs text-stone">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone" />
              <span>Deadline</span>
            </span>
            <span className={`font-mono ${isUrgent ? 'text-[#963F2C] font-semibold' : 'text-ink font-medium'}`}>
              {new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone" />
              <span>Requirements</span>
            </span>
            <span className="text-ink font-medium">
              {scholarship.requiredDocuments.length} documents
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => openScholarshipModal(scholarship)}
            className="btn-secondary w-full text-xs py-2 px-2 text-center justify-center font-medium"
          >
            Review Criteria
          </button>
          <button
            type="button"
            onClick={() => addToTracker(scholarship.id, trackerItem ? trackerItem.stage : 'in_progress')}
            className={`w-full text-xs py-2 px-2 flex items-center justify-center gap-1 transition-colors rounded ${
              trackerItem
                ? 'bg-forest/10 text-forest border border-forest/30 font-medium'
                : 'btn-primary'
            }`}
          >
            {trackerItem ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span className="truncate">{stageLabels[trackerItem.stage]}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Add to Tracker</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};


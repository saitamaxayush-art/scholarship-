import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Kanban,
  Calendar,
  CheckSquare,
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  RotateCcw,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useScholarship } from '../context/ScholarshipContext';

export const DashboardPage = () => {
  const {
    trackerItems,
    scholarships,
    updateTrackerStage,
    updateDocumentStatus,
    updateTrackerNotes,
    removeFromTracker,
    resetTrackerToDefaults,
    openScholarshipModal
  } = useScholarship();

  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'timeline' | 'documents'
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  // Combine tracker item with scholarship details
  const enrichedTrackerItems = trackerItems.map(item => {
    const scholarship = scholarships.find(s => s.id === item.scholarshipId) || {
      id: item.scholarshipId,
      title: 'Custom Scholarship',
      provider: 'Academic Provider',
      amount: 0,
      amountFormatted: '$0',
      deadline: item.targetDate || '2026-12-31',
      field: 'General',
      educationLevel: 'Undergraduate',
      requiredDocuments: []
    };
    return {
      ...item,
      scholarship
    };
  });

  // Calculate metrics
  const totalFundingValue = enrichedTrackerItems.reduce(
    (sum, item) => sum + (item.scholarship.amount || 0),
    0
  );

  const activeAppsCount = enrichedTrackerItems.filter(
    item => item.stage === 'in_progress' || item.stage === 'submitted'
  ).length;

  const totalDocumentsRequired = enrichedTrackerItems.reduce(
    (acc, item) => acc + (item.documents?.length || 0),
    0
  );

  const totalDocumentsCompleted = enrichedTrackerItems.reduce(
    (acc, item) => acc + (item.documents?.filter(d => d.completed).length || 0),
    0
  );

  const overallDocProgress = totalDocumentsRequired > 0
    ? Math.round((totalDocumentsCompleted / totalDocumentsRequired) * 100)
    : 0;

  // Stages definition for Kanban
  const kanbanColumns = [
    {
      key: 'saved',
      label: 'Saved Opportunities',
      description: 'Prospects to review and prioritize'
    },
    {
      key: 'in_progress',
      label: 'In Progress',
      description: 'Actively gathering materials and drafting'
    },
    {
      key: 'submitted',
      label: 'Submitted',
      description: 'Awaiting committee confirmation'
    },
    {
      key: 'decision',
      label: 'Decision Received',
      description: 'Awards and final outcomes'
    }
  ];

  const handleStartEditNotes = (item) => {
    setEditingNotesId(item.id);
    setTempNotes(item.notes || '');
  };

  const handleSaveNotes = (id) => {
    updateTrackerNotes(id, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-sand mb-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
              Application Tracker
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Application Management Board
            </h1>
            <p className="text-sm sm:text-base text-stone leading-relaxed font-normal">
              Organize requirements, checklist readiness, and progression stages across all your active scholarship applications.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={resetTrackerToDefaults}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
              title="Reset tracker to initial 4 sample applications"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>
            <Link
              to="/scholarships"
              className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add From Catalog</span>
            </Link>
          </div>
        </div>

        {/* Real-time Local State Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-[#FAF7F0] border border-sand rounded mb-8 text-xs">
          <div className="space-y-1">
            <span className="text-stone">Total Tracked Value</span>
            <div className="font-serif text-2xl font-bold text-forest">
              ${totalFundingValue.toLocaleString()}
            </div>
            <span className="text-[11px] text-stone">Across {enrichedTrackerItems.length} applications</span>
          </div>

          <div className="space-y-1">
            <span className="text-stone">Active Pipeline</span>
            <div className="font-serif text-2xl font-bold text-forest">
              {activeAppsCount} Grants
            </div>
            <span className="text-[11px] text-stone">In progress or submitted</span>
          </div>

          <div className="space-y-1">
            <span className="text-stone">Document Readiness</span>
            <div className="font-serif text-2xl font-bold text-forest">
              {overallDocProgress}%
            </div>
            <span className="text-[11px] text-stone">
              {totalDocumentsCompleted} of {totalDocumentsRequired} items ready
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-stone">Storage Mode</span>
            <div className="font-serif text-2xl font-bold text-ink">
              Local Browser
            </div>
            <span className="text-[11px] text-stone">Saved automatically</span>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center justify-between border-b border-sand pb-2 mb-8">
          <div className="flex gap-4 sm:gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-2 py-2 relative transition-colors ${
                activeTab === 'kanban' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>Kanban Board</span>
              {activeTab === 'kanban' && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 py-2 relative transition-colors ${
                activeTab === 'timeline' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Deadline Timeline</span>
              {activeTab === 'timeline' && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-2 py-2 relative transition-colors ${
                activeTab === 'documents' ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Consolidated Checklist</span>
              {activeTab === 'documents' && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-forest" />
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: KANBAN BOARD */}
        {activeTab === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {kanbanColumns.map((col) => {
              const itemsInCol = enrichedTrackerItems.filter(item => item.stage === col.key);
              const colSum = itemsInCol.reduce((s, i) => s + (i.scholarship.amount || 0), 0);

              return (
                <div
                  key={col.key}
                  className="bg-[#FAF8F3] border border-sand rounded p-4 flex flex-col space-y-4 min-h-[500px]"
                >
                  {/* Column Header */}
                  <div className="border-b border-sand pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-ink">
                        {col.label}
                      </span>
                      <span className="text-xs font-mono font-semibold bg-sand px-2 py-0.5 rounded text-ink">
                        {itemsInCol.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone mt-1">
                      <span>{col.description}</span>
                      <span className="font-mono font-medium text-forest">${colSum.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-4 flex-1">
                    {itemsInCol.map((item) => {
                      const completedDocs = item.documents?.filter(d => d.completed).length || 0;
                      const totalDocs = item.documents?.length || 0;
                      const percent = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

                      return (
                        <div
                          key={item.id}
                          className="p-4 bg-paper border border-sand rounded shadow-subtle hover:border-forest/40 transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-mono font-semibold text-forest bg-forest/5 px-1.5 py-0.5 rounded border border-forest/15">
                              {item.scholarship.amountFormatted}
                            </span>
                            <span className="text-[11px] text-stone font-mono">
                              Due {new Date(item.scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          <div>
                            <h4
                              onClick={() => openScholarshipModal(item.scholarship)}
                              className="font-serif text-base font-bold text-ink hover:text-forest cursor-pointer transition-colors leading-snug"
                            >
                              {item.scholarship.title}
                            </h4>
                            <p className="text-xs text-stone mt-0.5">
                              {item.scholarship.provider}
                            </p>
                          </div>

                          {/* Submission confirmation if submitted */}
                          {item.stage === 'submitted' && item.submissionConfirmation && (
                            <div className="p-2 bg-[#F5F2E9] border border-sand rounded text-[11px] font-mono text-ink">
                              Confirmation ID: {item.submissionConfirmation}
                            </div>
                          )}

                          {/* Decision outcome if decision */}
                          {item.stage === 'decision' && item.decisionOutcome && (
                            <div className="p-2 bg-forest/10 border border-forest/20 rounded text-[11px] font-semibold text-forest">
                              Outcome: {item.decisionOutcome}
                            </div>
                          )}

                          {/* Document Checklist Readiness */}
                          {totalDocs > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <div className="flex items-center justify-between text-[11px] text-stone">
                                <span>Checklist</span>
                                <span className="font-mono">{completedDocs}/{totalDocs} ready ({percent}%)</span>
                              </div>
                              <div className="w-full bg-sand h-1.5 rounded overflow-hidden">
                                <div
                                  className="bg-forest h-full rounded transition-all duration-300"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Notes Preview / Editor */}
                          <div className="pt-2 border-t border-sand text-xs">
                            {editingNotesId === item.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  className="w-full text-xs p-2 bg-paper border border-forest rounded focus:outline-none"
                                  rows={3}
                                  placeholder="Add application notes..."
                                />
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setEditingNotesId(null)}
                                    className="text-[11px] px-2 py-1 bg-sand text-stone rounded"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveNotes(item.id)}
                                    className="text-[11px] px-2.5 py-1 bg-forest text-paper rounded font-medium"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => handleStartEditNotes(item)}
                                className="text-stone hover:text-ink cursor-pointer bg-[#FAF8F3] p-2 rounded border border-sand/70 text-[11px] italic"
                                title="Click to edit notes"
                              >
                                {item.notes || 'Click to add personal notes or tasks...'}
                              </div>
                            )}
                          </div>

                          {/* Stage Transition Control Bar */}
                          <div className="flex items-center justify-between pt-2 border-t border-sand/70">
                            {/* Move Left */}
                            <button
                              type="button"
                              disabled={col.key === 'saved'}
                              onClick={() => {
                                const stageKeys = ['saved', 'in_progress', 'submitted', 'decision'];
                                const currentIndex = stageKeys.indexOf(item.stage);
                                if (currentIndex > 0) {
                                  updateTrackerStage(item.id, stageKeys[currentIndex - 1]);
                                }
                              }}
                              className={`p-1 rounded text-stone hover:text-ink ${
                                col.key === 'saved' ? 'opacity-25 cursor-not-allowed' : 'hover:bg-sand'
                              }`}
                              title="Move back one stage"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>

                            {/* View Modal */}
                            <button
                              type="button"
                              onClick={() => openScholarshipModal(item.scholarship)}
                              className="text-[11px] text-forest hover:text-ink font-semibold flex items-center gap-1"
                            >
                              <span>Criteria</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>

                            {/* Move Right */}
                            <button
                              type="button"
                              disabled={col.key === 'decision'}
                              onClick={() => {
                                const stageKeys = ['saved', 'in_progress', 'submitted', 'decision'];
                                const currentIndex = stageKeys.indexOf(item.stage);
                                if (currentIndex < stageKeys.length - 1) {
                                  updateTrackerStage(item.id, stageKeys[currentIndex + 1]);
                                }
                              }}
                              className={`p-1 rounded text-stone hover:text-ink ${
                                col.key === 'decision' ? 'opacity-25 cursor-not-allowed' : 'hover:bg-sand'
                              }`}
                              title="Move forward one stage"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Action */}
                            <button
                              type="button"
                              onClick={() => removeFromTracker(item.id)}
                              className="p-1 rounded text-stone hover:text-[#963F2C] hover:bg-sand"
                              title="Remove from tracker"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {itemsInCol.length === 0 && (
                      <div className="p-8 text-center text-xs text-stone border border-dashed border-sand rounded">
                        No applications currently in this stage.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: DEADLINE TIMELINE VIEW */}
        {activeTab === 'timeline' && (
          <div className="bg-paper border border-sand rounded p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-2xl font-bold text-ink">
                Chronological Submission Timeline
              </h3>
              <p className="text-xs sm:text-sm text-stone">
                All tracked grants sorted sequentially by institutional submission deadline.
              </p>
            </div>

            <div className="divide-y divide-sand border-t border-sand">
              {enrichedTrackerItems
                .sort((a, b) => new Date(a.scholarship.deadline) - new Date(b.scholarship.deadline))
                .map((item) => {
                  const deadlineDate = new Date(item.scholarship.deadline);
                  const today = new Date();
                  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                  const isUrgent = diffDays >= 0 && diffDays <= 21;

                  return (
                    <div key={item.id} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            isUrgent ? 'bg-[#963F2C]/10 text-[#963F2C] border border-[#963F2C]/30' : 'bg-sand text-ink'
                          }`}>
                            {diffDays > 0 ? `${diffDays} days remaining` : 'Deadline passed'}
                          </span>
                          <span className="text-xs font-mono text-stone">
                            Due {deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-xs font-mono font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded">
                            {item.stage.toUpperCase().replace('_', ' ')}
                          </span>
                        </div>
                        <h4
                          onClick={() => openScholarshipModal(item.scholarship)}
                          className="font-serif text-lg font-bold text-ink hover:text-forest cursor-pointer transition-colors"
                        >
                          {item.scholarship.title}
                        </h4>
                        <p className="text-xs text-stone">
                          {item.scholarship.provider} &bull; Award: {item.scholarship.amountFormatted}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right text-xs">
                          <div className="text-stone">Checklist</div>
                          <div className="font-mono font-bold text-ink">
                            {item.documents?.filter(d => d.completed).length || 0}/{item.documents?.length || 0} Ready
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => openScholarshipModal(item.scholarship)}
                          className="btn-secondary text-xs py-1.5 px-3"
                        >
                          Review Criteria
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 3: CONSOLIDATED DOCUMENT CHECKLIST */}
        {activeTab === 'documents' && (
          <div className="bg-paper border border-sand rounded p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-2xl font-bold text-ink">
                Master Document Checklist
              </h3>
              <p className="text-xs sm:text-sm text-stone">
                Toggle requirement checkboxes across all tracked scholarships. Updates immediately propagate to your application progress.
              </p>
            </div>

            <div className="space-y-6">
              {enrichedTrackerItems.map((item) => (
                <div key={item.id} className="p-5 bg-[#FAF7F0] border border-sand rounded space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-forest font-semibold">
                        Stage: {item.stage.replace('_', ' ').toUpperCase()}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {item.scholarship.title}
                      </h4>
                      <p className="text-xs text-stone">
                        Due {new Date(item.scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; {item.scholarship.provider}
                      </p>
                    </div>

                    <span className="font-serif text-base font-bold text-forest shrink-0">
                      {item.scholarship.amountFormatted}
                    </span>
                  </div>

                  {/* Document Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {item.documents?.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => updateDocumentStatus(item.id, doc.id, !doc.completed)}
                        className={`p-3 rounded border transition-colors cursor-pointer flex items-center justify-between ${
                          doc.completed
                            ? 'bg-paper border-forest/40 text-ink'
                            : 'bg-paper/70 border-sand text-stone hover:bg-paper hover:text-ink'
                        }`}
                      >
                        <span className={`text-xs ${doc.completed ? 'font-medium text-ink' : ''}`}>
                          {doc.name}
                        </span>
                        <div className="text-forest ml-2 shrink-0">
                          {doc.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-forest" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


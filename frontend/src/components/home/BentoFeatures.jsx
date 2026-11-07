import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, FileText, LayoutGrid, CheckCircle2, Circle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScholarship } from '../../context/ScholarshipContext';

export const BentoFeatures = () => {
  const { scholarships } = useScholarship();

  // Interactive Tile 1 State: Quick Matcher
  const [selectedGpa, setSelectedGpa] = useState('3.5');
  const [selectedMajor, setSelectedMajor] = useState('STEM');

  const calculateQuickMatch = () => {
    const numGpa = parseFloat(selectedGpa);
    const count = scholarships.filter(s => {
      const gpaPass = s.minGpa === null || s.minGpa <= numGpa;
      const majorPass = selectedMajor === 'All' || s.field === selectedMajor || s.field === 'Any';
      return gpaPass && majorPass;
    }).length;
    return count;
  };

  const matchedCount = calculateQuickMatch();

  // Interactive Tile 2 State: Deadline Radar
  const [activeDeadlineIndex, setActiveDeadlineIndex] = useState(0);
  const deadlines = [
    { title: "Clean Energy Fellowship", date: "Nov 28", days: 21, urgency: "Action required soon" },
    { title: "Ada Lovelace Computing", date: "Dec 10", days: 33, urgency: "Recommendation drafts" },
    { title: "Du Bois Humanities Grant", date: "Jan 15", days: 69, urgency: "Early outline" }
  ];

  // Interactive Tile 3 State: Document Vault Checklist
  const [docsChecked, setDocsChecked] = useState({
    transcript: true,
    statement: true,
    recommendations: false,
    resume: true
  });

  const checkedCount = Object.values(docsChecked).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / 4) * 100);

  // Interactive Tile 4 State: Mini Kanban Status
  const [activeCardColumn, setActiveCardColumn] = useState('in_progress');
  const kanbanStages = [
    { key: 'saved', label: 'Saved' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'decision', label: 'Decision' }
  ];

  return (
    <section className="py-24 bg-paper border-t border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
              Integrated Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              An application workspace engineered for clarity.
            </h2>
          </div>
          <p className="text-sm text-stone max-w-sm leading-relaxed">
            Every feature is built around the friction points that cause students to miss funding opportunities.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TILE 1: Smart Matching Matrix (7 Cols) - Interactive */}
          <div className="lg:col-span-7 bg-[#FAF6EE] border border-sand p-6 sm:p-8 rounded flex flex-col justify-between hover:border-forest/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Interactive Matching Matrix
                </span>
                <span className="text-xs text-stone font-mono">Live Simulation</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                Instant Qualification Parsing
              </h3>
              <p className="text-sm text-stone leading-relaxed mb-6 font-normal">
                Test your academic parameters below to see how our verified eligibility rules filter opportunities without noise.
              </p>

              {/* Interactive Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-paper border border-sand rounded mb-6">
                <div>
                  <label className="block text-xs font-semibold text-stone uppercase tracking-wider mb-2">
                    Minimum Cumulative GPA
                  </label>
                  <div className="flex gap-2">
                    {['3.0', '3.3', '3.5', '3.8'].map((gpa) => (
                      <button
                        key={gpa}
                        type="button"
                        onClick={() => setSelectedGpa(gpa)}
                        className={`text-xs px-2.5 py-1.5 rounded font-mono font-medium border transition-colors ${
                          selectedGpa === gpa
                            ? 'bg-forest text-paper border-forest'
                            : 'bg-sand/40 border-sand text-ink hover:bg-sand'
                        }`}
                      >
                        {gpa}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone uppercase tracking-wider mb-2">
                    Academic Field
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['STEM', 'Humanities', 'Healthcare', 'All'].map((major) => (
                      <button
                        key={major}
                        type="button"
                        onClick={() => setSelectedMajor(major)}
                        className={`text-xs px-2.5 py-1.5 rounded font-medium border transition-colors ${
                          selectedMajor === major
                            ? 'bg-forest text-paper border-forest'
                            : 'bg-sand/40 border-sand text-ink hover:bg-sand'
                        }`}
                      >
                        {major}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Result Output */}
            <div className="p-4 bg-paper border border-sand rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-stone">Matching Grants in Mock Catalog:</div>
                <div className="font-serif text-2xl font-bold text-forest">
                  {matchedCount} Grants Eligible
                </div>
              </div>
              <Link
                to={`/scholarships?field=${selectedMajor === 'All' ? '' : selectedMajor}`}
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
              >
                <span>View Filtered Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* TILE 2: Deadline Radar (5 Cols) - Interactive */}
          <div className="lg:col-span-5 bg-[#F6F2E8] border border-sand p-6 sm:p-8 rounded flex flex-col justify-between hover:border-forest/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Deadline Radar
                </span>
                <Calendar className="w-4 h-4 text-forest" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                Time-Weighted Urgency
              </h3>
              <p className="text-sm text-stone leading-relaxed mb-6 font-normal">
                Click each milestone to inspect recommended faculty outreach and draft milestones.
              </p>

              {/* Deadline Radar Items */}
              <div className="space-y-2.5">
                {deadlines.map((item, index) => {
                  const isActive = activeDeadlineIndex === index;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setActiveDeadlineIndex(index)}
                      className={`p-3.5 rounded cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-paper border-forest shadow-subtle'
                          : 'bg-paper/60 border-sand hover:bg-paper'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm text-ink">
                          {item.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-forest">
                          {item.date} ({item.days}d)
                        </span>
                      </div>
                      <div className="text-xs text-stone flex items-center justify-between">
                        <span>{item.urgency}</span>
                        {isActive && <span className="text-forest text-[11px] font-semibold">Selected</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-sand text-xs text-stone">
              Standard lead time: 3 weeks minimum recommended for faculty recommendation letters.
            </div>
          </div>

          {/* TILE 3: Document Vault & Readiness (5 Cols) - Interactive */}
          <div className="lg:col-span-5 bg-paper border border-sand p-6 sm:p-8 rounded flex flex-col justify-between hover:border-forest/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2 py-0.5 rounded">
                  Document Checklist
                </span>
                <span className="font-mono text-xs font-bold text-forest">
                  {progressPercent}% Complete
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                Application Readiness
              </h3>
              <p className="text-sm text-stone leading-relaxed mb-5 font-normal">
                Check off sample materials below to update the readiness meter in real time.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-sand h-2 rounded overflow-hidden mb-5">
                <div
                  className="bg-forest h-full rounded transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Interactive Document Checklist */}
              <div className="space-y-2.5">
                {[
                  { key: 'transcript', name: 'Official University Transcript' },
                  { key: 'statement', name: 'Statement of Purpose (750 words)' },
                  { key: 'recommendations', name: 'Two Faculty Recommendations' },
                  { key: 'resume', name: 'Curriculum Vitae / Resume' }
                ].map((doc) => {
                  const isChecked = docsChecked[doc.key];
                  return (
                    <div
                      key={doc.key}
                      onClick={() => setDocsChecked(prev => ({ ...prev, [doc.key]: !isChecked }))}
                      className="p-3 bg-[#FAF7F0] border border-sand rounded flex items-center justify-between cursor-pointer hover:bg-sand/50 transition-colors"
                    >
                      <span className={`text-xs font-medium ${isChecked ? 'text-ink' : 'text-stone'}`}>
                        {doc.name}
                      </span>
                      <div className="text-forest">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-forest" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-sand text-xs text-stone">
              Documents are stored and checked locally without external server dependencies.
            </div>
          </div>

          {/* TILE 4: Application Status Board (7 Cols) - Interactive */}
          <div className="lg:col-span-7 bg-[#F4EFE3] border border-sand p-6 sm:p-8 rounded flex flex-col justify-between hover:border-forest/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Status Kanban Hub
                </span>
                <span className="text-xs text-stone font-mono">Stage Switcher</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-ink mb-2">
                Four-Stage Progression Workflow
              </h3>
              <p className="text-sm text-stone leading-relaxed mb-6 font-normal">
                Click a stage below to simulate moving an active grant application through its lifecycle.
              </p>

              {/* Stage Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {kanbanStages.map((stg) => {
                  const isActive = activeCardColumn === stg.key;
                  return (
                    <button
                      key={stg.key}
                      type="button"
                      onClick={() => setActiveCardColumn(stg.key)}
                      className={`p-2.5 rounded text-xs font-mono font-semibold text-center border transition-all ${
                        isActive
                          ? 'bg-forest text-paper border-forest shadow-subtle'
                          : 'bg-paper border-sand text-stone hover:text-ink'
                      }`}
                    >
                      {stg.label}
                    </button>
                  );
                })}
              </div>

              {/* Simulated Card Representation */}
              <div className="p-5 bg-paper border border-forest/30 rounded shadow-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold bg-forest-deep px-2 py-0.5 rounded">
                    Current Stage: {activeCardColumn.toUpperCase().replace('_', ' ')}
                  </span>
                  <span className="font-serif text-lg font-bold text-forest">
                    $18,000
                  </span>
                </div>
                <div className="font-serif text-base font-bold text-ink">
                  The Horizon Fellowship in Clean Energy
                </div>
                <div className="flex items-center justify-between text-xs text-stone pt-2 border-t border-sand">
                  <span>Target Submission: Nov 28, 2026</span>
                  <span className="font-mono text-forest">Checklist: 3/4 Complete</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-sand flex items-center justify-between">
              <span className="text-xs text-stone">
                Full Kanban board available with drag and click transitions.
              </span>
              <Link to="/dashboard" className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5">
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


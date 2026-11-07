import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, FileCheck2, Kanban, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "discover",
      number: "01",
      title: "Discover Verified Opportunities",
      headline: "Filter through verified funding without sponsored ads or expired dead links.",
      description: "Search across 20+ disciplines with clean parameters: academic major, degree level, award amount, and submission deadlines. No paid sponsor bias or hidden paywalls.",
      badge: "Discovery Engine",
      icon: Search,
      preview: {
        type: "card",
        title: "The Horizon Fellowship in Clean Energy",
        amount: "$18,000",
        match: "97% Match",
        tags: ["STEM", "Undergraduate", "Renewable Energy"],
        meta: "Due Nov 28 &bull; Direct Bursar Credit"
      }
    },
    {
      id: "understand",
      number: "02",
      title: "Understand Exact Eligibility",
      headline: "Clear breakdown of GPA, credit minimums, and residency clauses.",
      description: "Avoid spending 20 hours drafting an essay only to discover you were disqualified by a footnote. Grantly presents concrete criteria in a verified checklist before you apply.",
      badge: "Eligibility Parser",
      icon: ShieldCheck,
      preview: {
        type: "eligibility",
        checks: [
          { text: "Enrolled full-time in an accredited college", status: "pass" },
          { text: "Declared major in Engineering or Applied Sciences", status: "pass" },
          { text: "Cumulative GPA of 3.4 or higher (Your GPA: 3.65)", status: "pass" },
          { text: "Institutional letter of research endorsement", status: "pass" }
        ]
      }
    },
    {
      id: "apply",
      number: "03",
      title: "Prepare Required Documents",
      headline: "Itemized checklist for transcripts, statements, and faculty letters.",
      description: "Know exactly what each scholarship committee requires. Track which transcripts are certified, which drafts need polishing, and which faculty letters are pending.",
      badge: "Document Vault",
      icon: FileCheck2,
      preview: {
        type: "checklist",
        progress: 75,
        items: [
          { name: "Official College Transcript", done: true },
          { name: "Statement of Purpose (1,000 words)", done: true },
          { name: "Curriculum Vitae / Resume", done: true },
          { name: "Two Faculty Letters of Support", done: false }
        ]
      }
    },
    {
      id: "track",
      number: "04",
      title: "Track Application Deadlines",
      headline: "A status-linked dashboard to monitor your applications through decision.",
      description: "Move applications seamlessly from Saved to In Progress, Submitted, and Decision Received. Never miss a submission window or confirmation code.",
      badge: "Kanban Hub",
      icon: Kanban,
      preview: {
        type: "kanban",
        columns: [
          { name: "Saved", count: 1 },
          { name: "In Progress", count: 2, active: true },
          { name: "Submitted", count: 1 },
          { name: "Decision", count: 1 }
        ],
        activeCard: {
          title: "The Horizon Fellowship in Clean Energy",
          stage: "In Progress",
          daysLeft: "18 days remaining",
          progress: "75% complete"
        }
      }
    }
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="how-it-works" className="py-28 bg-[#F6F2E8] border-t border-sand relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
            The Grantly Method
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            From initial search to final disbursement in four clear steps.
          </h2>
          <p className="text-sm sm:text-base text-stone leading-relaxed">
            A cohesive workflow designed around student decision-making, replacing chaotic email alerts with structured visibility.
          </p>
        </div>

        {/* Interactive Sticky / Stepped Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Step Selector & Narrative */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 rounded cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-paper border-forest shadow-elevated'
                      : 'bg-paper/50 border-sand hover:bg-paper hover:border-forest/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-9 h-9 rounded flex items-center justify-center font-mono text-sm font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-forest text-paper'
                          : 'bg-sand text-stone'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-bold text-ink">
                          {step.title}
                        </h3>
                        {isActive && (
                          <span className="text-[11px] font-mono text-forest bg-forest/10 px-2 py-0.5 rounded border border-forest/20">
                            Active Step
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-forest">
                        {step.headline}
                      </p>

                      <p className="text-xs sm:text-sm text-stone leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Interactive Preview Panel */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-forest-deep text-paper p-6 sm:p-8 rounded border border-[#222B26] shadow-panel relative min-h-[460px] flex flex-col justify-between">
              {/* Header inside preview */}
              <div>
                <div className="flex items-center justify-between border-b border-[#222B26] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-gold rounded-full" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#A5AAA3]">
                      Step {currentStep.number} Preview &bull; {currentStep.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveStep(i)}
                        aria-label={`Jump to step ${i + 1}`}
                        className={`h-1.5 transition-all rounded-full ${
                          activeStep === i ? 'w-6 bg-gold' : 'w-2 bg-[#333E37]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated Content for Active Step */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    {/* Step 1 Preview: Discover Card */}
                    {activeStep === 0 && (
                      <div className="space-y-4">
                        <div className="p-5 bg-[#141B17] border border-[#2B3B30] rounded space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                              {currentStep.preview.match}
                            </span>
                            <span className="font-serif text-2xl font-bold text-gold">
                              {currentStep.preview.amount}
                            </span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-paper">
                            {currentStep.preview.title}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentStep.preview.tags.map(t => (
                              <span key={t} className="text-xs bg-[#222E26] text-[#D0D6CE] px-2 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: currentStep.preview.meta }}
                            className="text-xs text-[#8E938D] pt-2 border-t border-[#222E26]"
                          />
                        </div>
                        <p className="text-xs text-[#A5AAA3] leading-relaxed">
                          Intelligent parameter filtering maps your academic profile against verified grant matrices instantly.
                        </p>
                      </div>
                    )}

                    {/* Step 2 Preview: Eligibility Checklist */}
                    {activeStep === 1 && (
                      <div className="space-y-4">
                        <div className="p-5 bg-[#141B17] border border-[#2B3B30] rounded space-y-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                            Institutional Eligibility Gate
                          </div>
                          <div className="space-y-2.5">
                            {currentStep.preview.checks.map((c, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#EDE9DF]">
                                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                <span>{c.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#A5AAA3] leading-relaxed">
                          All prerequisite thresholds are verified up front, saving hours on unqualified applications.
                        </p>
                      </div>
                    )}

                    {/* Step 3 Preview: Document Vault */}
                    {activeStep === 2 && (
                      <div className="space-y-4">
                        <div className="p-5 bg-[#141B17] border border-[#2B3B30] rounded space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#A5AAA3]">Application Readiness</span>
                            <span className="font-mono text-gold font-bold">
                              {currentStep.preview.progress}% Complete
                            </span>
                          </div>
                          <div className="w-full bg-[#222E26] h-2 rounded overflow-hidden">
                            <div
                              className="bg-gold h-full rounded transition-all duration-500"
                              style={{ width: `${currentStep.preview.progress}%` }}
                            />
                          </div>
                          <div className="space-y-2 pt-2">
                            {currentStep.preview.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#222E26] last:border-b-0">
                                <span className={item.done ? "text-[#D0D6CE]" : "text-[#F5EDB8] font-medium"}>
                                  {item.name}
                                </span>
                                <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                                  item.done ? "bg-[#1E2D22] text-gold" : "bg-[#382B1E] text-gold"
                                }`}>
                                  {item.done ? "Uploaded" : "Action Needed"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#A5AAA3] leading-relaxed">
                          Maintain complete visibility over every requested item and reference letter in one place.
                        </p>
                      </div>
                    )}

                    {/* Step 4 Preview: Kanban Board Hub */}
                    {activeStep === 3 && (
                      <div className="space-y-4">
                        <div className="p-5 bg-[#141B17] border border-[#2B3B30] rounded space-y-3">
                          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">
                            {currentStep.preview.columns.map(col => (
                              <div
                                key={col.name}
                                className={`p-2 rounded border ${
                                  col.active
                                    ? 'bg-gold/20 border-gold text-gold font-bold'
                                    : 'bg-[#1E2721] border-[#2A372E] text-[#8E938D]'
                                }`}
                              >
                                <div>{col.count}</div>
                                <div className="text-[9px] uppercase tracking-wider">{col.name}</div>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 bg-[#1C2620] border border-[#2E3E32] rounded text-xs space-y-1">
                            <div className="text-paper font-serif font-bold text-sm">
                              {currentStep.preview.activeCard.title}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#A5AAA3] pt-1">
                              <span className="text-gold font-mono">{currentStep.preview.activeCard.daysLeft}</span>
                              <span>{currentStep.preview.activeCard.progress}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-[#A5AAA3] leading-relaxed">
                          Local application state persists across your workflow with zero loss of progress.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Quick Control */}
              <div className="pt-6 border-t border-[#222B26] flex items-center justify-between">
                <div className="text-xs text-[#8E938D]">
                  Step {activeStep + 1} of {steps.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="text-xs px-3 py-1.5 bg-[#1C2720] hover:bg-[#25352A] text-paper rounded border border-[#2E3E32] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="text-xs px-3 py-1.5 bg-forest hover:bg-forest-deep text-paper rounded border border-gold/40 transition-colors"
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


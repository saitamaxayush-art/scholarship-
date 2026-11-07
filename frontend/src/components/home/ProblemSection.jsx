import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProblemSection = () => {
  const [activeFriction, setActiveFriction] = useState(0);

  const frictionPoints = [
    {
      title: "Fragmented Portals",
      legacy: "Students monitor 15 to 30 distinct university, foundation, and municipal portals, each with proprietary login walls and unstandardized submission formats.",
      grantly: "A single verified catalog parsing deadlines, institutional criteria, and application links into one continuous workspace."
    },
    {
      title: "Buried Eligibility Clauses",
      legacy: "Critical disqualifiers like semester credit thresholds, regional residency fine print, or prerequisite coursework are buried on page 14 of an obscure PDF.",
      grantly: "Instant rule parsing that checks your degree standing, field of study, and minimum GPA before you spend hours drafting essays."
    },
    {
      title: "Ad-hoc Spreadsheet Deadlines",
      legacy: "Important deadlines slip through because dates are manually copied into personal spreadsheets that do not account for time zones or letter-of-recommendation lead times.",
      grantly: "Status-linked Kanban tracking with document completion indicators and calendar countdowns."
    }
  ];

  return (
    <section id="the-problem" className="py-24 border-t border-sand bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Editorial Asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand/80 px-2.5 py-1 rounded inline-block">
              Structural Failure in Higher Education
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Scholarship discovery has been broken by paperwork fragmentation.
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm text-stone leading-relaxed border-l-2 border-sand pl-5">
            Every semester, thousands of qualified students abandon applications because requirements are scattered across disconnected websites, unindexed portals, and conflicting guidelines.
          </div>
        </div>

        {/* Interactive Comparison Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Friction Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone">
                Select a structural friction point:
              </p>
              {frictionPoints.map((item, index) => {
                const isActive = activeFriction === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveFriction(index)}
                    className={`w-full text-left p-4 rounded transition-all border ${
                      isActive
                        ? 'bg-[#F4EFE2] border-forest text-ink shadow-subtle'
                        : 'bg-paper border-sand text-stone hover:text-ink hover:border-forest/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold">
                        0{index + 1}. {item.title}
                      </span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${isActive ? 'bg-forest text-paper' : 'bg-sand text-stone'}`}>
                        {isActive ? 'Active View' : 'Inspect'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-5 bg-sand/40 border border-sand rounded space-y-2 mt-4">
              <div className="text-xs font-semibold text-ink">
                Verified Mock Benchmark
              </div>
              <p className="text-xs text-stone leading-relaxed">
                In testing across 24 reference scholarships, students navigating unstandardized portals spent an average of 4.2 hours per application just locating prerequisite documents.
              </p>
            </div>
          </div>

          {/* Right Column: Contrast Board */}
          <div className="lg:col-span-7 bg-[#F6F2E8] border border-sand rounded p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <span className="font-serif text-xl font-bold text-ink">
                  {frictionPoints[activeFriction].title}
                </span>
                <span className="text-xs font-mono text-stone">
                  Diagnostic Contrast
                </span>
              </div>

              {/* Legacy Block */}
              <div className="p-5 bg-paper/80 border border-sand/80 rounded space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#963F2C]">
                  <AlertCircle className="w-4 h-4 text-[#963F2C] shrink-0" />
                  <span className="uppercase tracking-wider">The Status Quo</span>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed font-normal">
                  {frictionPoints[activeFriction].legacy}
                </p>
              </div>

              {/* Grantly Solution Block */}
              <div className="p-5 bg-forest text-paper border border-forest-deep rounded space-y-2 shadow-subtle">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span className="uppercase tracking-wider">The Grantly Method</span>
                </div>
                <p className="text-sm text-[#EDE9DF] leading-relaxed font-normal">
                  {frictionPoints[activeFriction].grantly}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sand">
              <span className="text-xs text-stone">
                Ready to review verified application criteria?
              </span>
              <Link to="/scholarships" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 w-full sm:w-auto justify-center">
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


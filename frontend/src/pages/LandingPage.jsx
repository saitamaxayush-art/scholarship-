import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { InteractiveHeroSearch } from '../components/home/InteractiveHeroSearch';
import { ProblemSection } from '../components/home/ProblemSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { BentoFeatures } from '../components/home/BentoFeatures';
import { InteractiveLiveDemo } from '../components/home/InteractiveLiveDemo';
import { useScholarship } from '../context/ScholarshipContext';

export const LandingPage = () => {
  const { trackerItems } = useScholarship();

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-paper">
        {/* Subtle geometric line art background element (CSS/SVG, strictly no photos or AI art) */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.035] pointer-events-none select-none">
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor">
            <line x1="0" y1="0" x2="400" y2="400" strokeWidth="1" stroke="#1F4D3A" />
            <line x1="100" y1="0" x2="400" y2="300" strokeWidth="1" stroke="#1F4D3A" />
            <line x1="200" y1="0" x2="400" y2="200" strokeWidth="1" stroke="#1F4D3A" />
            <circle cx="200" cy="200" r="120" strokeWidth="1" stroke="#D7A33E" />
            <circle cx="200" cy="200" r="180" strokeWidth="1" stroke="#1F4D3A" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Editorial Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand/80 px-2.5 py-1 rounded inline-block">
                Academic Funding Discovery Platform
              </span>
              <span className="text-xs text-stone hidden sm:inline-block">
                Zero sponsored listings &bull; Direct eligibility verification
              </span>
            </motion.div>

            {/* Concrete, confident Fraunces Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.12]"
            >
              Discover verified scholarships. Understand exact eligibility. Track every deadline in one workspace.
            </motion.h1>

            {/* Specific subhead (not vague AI buzzwords) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="text-base sm:text-lg text-stone max-w-2xl leading-relaxed font-normal"
            >
              Grantly parses institutional requirements, GPA minimums, and document checklists into structured, actionable profiles. Say goodbye to scattered spreadsheets and buried disqualification clauses.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                to="/scholarships"
                className="btn-primary text-sm font-semibold py-3 px-6 flex items-center gap-2"
              >
                <span>Find Your Scholarships</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="btn-secondary text-sm font-medium py-3 px-5 flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-stone" />
                <span>Open Application Tracker ({trackerItems.length})</span>
              </Link>
            </motion.div>

            {/* Live Interactive Hero Search Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="pt-8"
            >
              <InteractiveHeroSearch />
            </motion.div>
          </div>

          {/* Sample Mock Dataset Metrics Banner (explicitly labeled as sample/demo data) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-sand grid grid-cols-2 md:grid-cols-4 gap-6 text-xs"
          >
            <div>
              <div className="font-serif text-2xl font-bold text-forest">20+ Grants</div>
              <div className="text-stone pt-0.5">Verified in mock catalog</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-forest">$280,000+</div>
              <div className="text-stone pt-0.5">Total sample funding pool</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-forest">100% Free</div>
              <div className="text-stone pt-0.5">No application portal fees</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-forest">Local-First</div>
              <div className="text-stone pt-0.5">Persistent browser storage</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <ProblemSection />

      {/* HOW GRANTLY WORKS: SIGNATURE SCROLL-DRIVEN STEP SEQUENCE */}
      <HowItWorksSection />

      {/* FEATURE SHOWCASE ASYMMETRIC BENTO GRID */}
      <BentoFeatures />

      {/* LIVE WORKING INTERACTIVE FILTER DEMO */}
      <InteractiveLiveDemo />

      {/* FINAL EDITORIAL CALL TO ACTION */}
      <section className="py-24 bg-forest text-paper border-t border-forest-deep relative overflow-hidden">
        {/* Subtle geometrical lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FBF9F4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gold bg-forest-deep/60 px-2.5 py-1 rounded inline-block">
              Start Your Application Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-paper leading-tight">
              Organize your funding search before the next submission cycle closes.
            </h2>
            <p className="text-base text-[#EDE9DF] leading-relaxed">
              Explore verified scholarships matching your academic record, save required documents to your personal checklist, and track stage transitions with zero dead ends.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/scholarships"
                className="btn-gold text-sm font-semibold py-3 px-6 flex items-center gap-2"
              >
                <span>Browse Scholarship Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center text-sm font-medium text-paper hover:text-gold transition-colors py-3 px-5 border border-sand/30 rounded"
              >
                <span>View Saved Applications ({trackerItems.length})</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


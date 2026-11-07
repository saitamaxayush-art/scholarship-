import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, RotateCcw, ArrowRight, Award, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScholarship } from '../../context/ScholarshipContext';
import { ScholarshipCard } from '../scholarships/ScholarshipCard';

export const InteractiveLiveDemo = () => {
  const { scholarships } = useScholarship();

  const [field, setField] = useState('All');
  const [level, setLevel] = useState('All');
  const [amountRange, setAmountRange] = useState('all');

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // Field filter
      if (field !== 'All' && item.field !== field && item.field !== 'Any') {
        return false;
      }
      // Level filter
      if (level !== 'All' && item.educationLevel !== level && item.educationLevel !== 'All') {
        return false;
      }
      // Amount filter
      if (amountRange === 'under10k' && item.amount > 10000) return false;
      if (amountRange === '10kto15k' && (item.amount < 10000 || item.amount > 15000)) return false;
      if (amountRange === 'above15k' && item.amount < 15000) return false;

      return true;
    });
  }, [scholarships, field, level, amountRange]);

  const handleReset = () => {
    setField('All');
    setLevel('All');
    setAmountRange('all');
  };

  return (
    <section id="interactive-demo" className="py-24 bg-[#FAF7F0] border-t border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
            Hands-on Sandbox
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            Test the discovery engine with sample criteria.
          </h2>
          <p className="text-sm sm:text-base text-stone leading-relaxed">
            Adjust discipline, academic standing, or funding thresholds below. The live query executes over our mock dataset instantly with zero page reloads.
          </p>
        </div>

        {/* Filter Controls Strip */}
        <div className="p-6 bg-paper border border-sand rounded shadow-subtle mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-sand">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Filter className="w-4 h-4 text-forest" />
              <span>Interactive Filter Parameters</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone">
                Found {filteredScholarships.length} of {scholarships.length} grants
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-stone hover:text-ink flex items-center gap-1 font-medium underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Filters</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {/* Field of Study */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                Field of Study
              </label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full bg-[#FAF8F2] border border-sand rounded px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest"
              >
                <option value="All">All Disciplines</option>
                <option value="STEM">STEM &amp; Computing</option>
                <option value="Humanities">Humanities &amp; Social Inquiry</option>
                <option value="Healthcare">Healthcare &amp; Pre-Med</option>
                <option value="Business">Business &amp; Economics</option>
                <option value="Arts">Arts &amp; Architecture</option>
                <option value="Public Policy">Public Policy &amp; Law</option>
              </select>
            </div>

            {/* Education Level */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                Degree Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#FAF8F2] border border-sand rounded px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest"
              >
                <option value="All">All Standing Levels</option>
                <option value="Undergraduate">Undergraduate (BA / BS)</option>
                <option value="Graduate">Graduate (MA / MS / MFA)</option>
                <option value="Doctoral">Doctoral (PhD Candidate)</option>
              </select>
            </div>

            {/* Award Amount */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                Award Amount Range
              </label>
              <select
                value={amountRange}
                onChange={(e) => setAmountRange(e.target.value)}
                className="w-full bg-[#FAF8F2] border border-sand rounded px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest"
              >
                <option value="all">Any Amount</option>
                <option value="under10k">Up to $10,000</option>
                <option value="10kto15k">$10,000 to $15,000</option>
                <option value="above15k">$15,000 and above</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Filter Results Preview */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.slice(0, 3).map((item) => (
              <ScholarshipCard key={item.id} scholarship={item} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-paper border border-sand rounded space-y-4">
            <div className="font-serif text-xl font-bold text-ink">
              No scholarships match this specific combination
            </div>
            <p className="text-sm text-stone max-w-md mx-auto">
              Try broadening your degree level or amount parameters to inspect available opportunities.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-primary text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Link to Full Catalog */}
        <div className="mt-12 text-center">
          <Link
            to="/scholarships"
            className="btn-primary inline-flex items-center gap-2 text-sm py-3 px-6 font-semibold"
          >
            <span>Explore All 20+ Verified Grants in Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};


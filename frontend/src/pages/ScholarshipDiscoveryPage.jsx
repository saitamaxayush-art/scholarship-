import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, RotateCcw, LayoutGrid, List, SlidersHorizontal, Sparkles, AlertCircle, ArrowUpDown } from 'lucide-react';
import { useScholarship } from '../context/ScholarshipContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { FILTER_OPTIONS } from '../data/scholarships';

export const ScholarshipDiscoveryPage = () => {
  const { scholarships, globalSearchQuery, setGlobalSearchQuery } = useScholarship();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states initialized from URL if present
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || globalSearchQuery || '');
  const [selectedField, setSelectedField] = useState(() => searchParams.get('field') || 'All Fields');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedAmountRange, setSelectedAmountRange] = useState('All Amounts');
  const [selectedSort, setSelectedSort] = useState('deadline');
  const [selectedGpaMin, setSelectedGpaMin] = useState('any');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync when URL query parameter changes
  useEffect(() => {
    const q = searchParams.get('q');
    const f = searchParams.get('field');
    if (q !== null && q !== searchQuery) setSearchQuery(q);
    if (f !== null && f !== selectedField) setSelectedField(f);
  }, [searchParams]);

  // Simulate short realistic filter loading state for tactile responsiveness
  const triggerTactileFeedback = () => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(timer);
  };

  const handleFieldChange = (val) => {
    setSelectedField(val);
    triggerTactileFeedback();
  };

  const handleLevelChange = (val) => {
    setSelectedLevel(val);
    triggerTactileFeedback();
  };

  const handleRegionChange = (val) => {
    setSelectedRegion(val);
    triggerTactileFeedback();
  };

  const handleAmountChange = (val) => {
    setSelectedAmountRange(val);
    triggerTactileFeedback();
  };

  const handleSortChange = (val) => {
    setSelectedSort(val);
    triggerTactileFeedback();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedField('All Fields');
    setSelectedLevel('All Levels');
    setSelectedRegion('All Regions');
    setSelectedAmountRange('All Amounts');
    setSelectedSort('deadline');
    setSelectedGpaMin('any');
    setFeaturedOnly(false);
    setSearchParams({});
    triggerTactileFeedback();
  };

  // Filtered and sorted scholarships
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // Search text match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesProvider = item.provider.toLowerCase().includes(query);
        const matchesField = item.field.toLowerCase().includes(query);
        const matchesSubfield = item.subfield?.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesProvider && !matchesField && !matchesSubfield && !matchesTags) {
          return false;
        }
      }

      // Field filter
      if (selectedField !== 'All Fields' && item.field !== selectedField && item.field !== 'Any') {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'All Levels' && item.educationLevel !== selectedLevel && item.educationLevel !== 'All') {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'All Regions' && item.region !== selectedRegion && item.region !== 'Global') {
        return false;
      }

      // Amount range filter
      if (selectedAmountRange === 'Up to $10,000' && item.amount > 10000) return false;
      if (selectedAmountRange === '$10,000 - $15,000' && (item.amount < 10000 || item.amount > 15000)) return false;
      if (selectedAmountRange === '$15,000+' && item.amount < 15000) return false;

      // GPA filter
      if (selectedGpaMin !== 'any') {
        const minGpa = parseFloat(selectedGpaMin);
        if (item.minGpa && item.minGpa > minGpa) return false;
      }

      // Featured only
      if (featuredOnly && !item.isFeatured) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (selectedSort === 'amount-high') {
        return b.amount - a.amount;
      }
      if (selectedSort === 'match') {
        return b.matchScore - a.matchScore;
      }
      if (selectedSort === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [
    scholarships,
    searchQuery,
    selectedField,
    selectedLevel,
    selectedRegion,
    selectedAmountRange,
    selectedSort,
    selectedGpaMin,
    featuredOnly
  ]);

  const activeFilterCount =
    (selectedField !== 'All Fields' ? 1 : 0) +
    (selectedLevel !== 'All Levels' ? 1 : 0) +
    (selectedRegion !== 'All Regions' ? 1 : 0) +
    (selectedAmountRange !== 'All Amounts' ? 1 : 0) +
    (selectedGpaMin !== 'any' ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Editorial Typography */}
        <div className="pb-8 border-b border-sand mb-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
              Scholarship Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
              Verified Academic Scholarships &amp; Grants
            </h1>
            <p className="text-sm sm:text-base text-stone leading-relaxed font-normal">
              Every listing has been parsed for exact eligibility thresholds, required documents, and disbursement methods. Filter by discipline, award value, or upcoming deadline.
            </p>
          </div>
        </div>

        {/* Search & Top Action Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-forest absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                triggerTactileFeedback();
              }}
              placeholder="Search by keywords, major, sponsor, or tags..."
              className="w-full bg-paper border border-sand rounded pl-10 pr-9 py-2.5 text-sm text-ink placeholder:text-stone focus:outline-none focus:border-forest transition-colors shadow-subtle"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & View Mode Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden btn-secondary text-xs py-2.5 px-3 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone hidden lg:inline">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-paper border border-sand rounded py-2 px-3 text-xs text-ink focus:outline-none focus:border-forest"
                aria-label="Sort scholarships"
              >
                {FILTER_OPTIONS.sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid vs List View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-sand rounded bg-paper p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-sand text-ink' : 'text-stone hover:text-ink'
                }`}
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-sand text-ink' : 'text-stone hover:text-ink'
                }`}
                aria-label="List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-sand/30 border border-sand rounded text-xs">
            <span className="font-semibold text-stone">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedField !== 'All Fields' && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Field: {selectedField}
                <button onClick={() => setSelectedField('All Fields')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedLevel !== 'All Levels' && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Level: {selectedLevel}
                <button onClick={() => setSelectedLevel('All Levels')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRegion !== 'All Regions' && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Region: {selectedRegion}
                <button onClick={() => setSelectedRegion('All Regions')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedAmountRange !== 'All Amounts' && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Amount: {selectedAmountRange}
                <button onClick={() => setSelectedAmountRange('All Amounts')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGpaMin !== 'any' && (
              <span className="inline-flex items-center gap-1 bg-paper border border-sand px-2 py-0.5 rounded">
                Min GPA: {selectedGpaMin}+
                <button onClick={() => setSelectedGpaMin('any')} className="hover:text-forest">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {featuredOnly && (
              <span className="inline-flex items-center gap-1 bg-gold text-forest-deep px-2 py-0.5 rounded font-semibold">
                Featured Only
                <button onClick={() => setFeaturedOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-forest hover:text-ink font-semibold underline ml-auto text-xs"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Main Content: Left Filter Sidebar + Right Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className={`md:col-span-4 lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="p-5 bg-paper border border-sand rounded shadow-subtle space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-3">
                <span className="font-serif text-base font-bold text-ink">
                  Filter Criteria
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-stone hover:text-ink underline"
                >
                  Reset
                </button>
              </div>

              {/* Field of Study */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                  Field of Study
                </label>
                <div className="space-y-1.5 text-xs">
                  {FILTER_OPTIONS.fields.map((fld) => (
                    <label key={fld} className="flex items-center gap-2 cursor-pointer hover:text-forest">
                      <input
                        type="radio"
                        name="field"
                        checked={selectedField === fld}
                        onChange={() => handleFieldChange(fld)}
                        className="text-forest focus:ring-forest"
                      />
                      <span className={selectedField === fld ? 'font-semibold text-forest' : 'text-ink'}>
                        {fld}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Education Level */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                  Degree Level
                </label>
                <div className="space-y-1.5 text-xs">
                  {FILTER_OPTIONS.educationLevels.map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 cursor-pointer hover:text-forest">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => handleLevelChange(lvl)}
                        className="text-forest focus:ring-forest"
                      />
                      <span className={selectedLevel === lvl ? 'font-semibold text-forest' : 'text-ink'}>
                        {lvl}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                  Award Amount
                </label>
                <div className="space-y-1.5 text-xs">
                  {FILTER_OPTIONS.amountRanges.map((rng) => (
                    <label key={rng.label} className="flex items-center gap-2 cursor-pointer hover:text-forest">
                      <input
                        type="radio"
                        name="amount"
                        checked={selectedAmountRange === rng.label}
                        onChange={() => handleAmountChange(rng.label)}
                        className="text-forest focus:ring-forest"
                      />
                      <span className={selectedAmountRange === rng.label ? 'font-semibold text-forest' : 'text-ink'}>
                        {rng.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Geographic Region */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                  Geographic Region
                </label>
                <div className="space-y-1.5 text-xs">
                  {FILTER_OPTIONS.regions.map((reg) => (
                    <label key={reg} className="flex items-center gap-2 cursor-pointer hover:text-forest">
                      <input
                        type="radio"
                        name="region"
                        checked={selectedRegion === reg}
                        onChange={() => handleRegionChange(reg)}
                        className="text-forest focus:ring-forest"
                      />
                      <span className={selectedRegion === reg ? 'font-semibold text-forest' : 'text-ink'}>
                        {reg}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum GPA */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <label className="block text-xs font-semibold text-stone uppercase tracking-wider">
                  Minimum GPA Threshold
                </label>
                <select
                  value={selectedGpaMin}
                  onChange={(e) => {
                    setSelectedGpaMin(e.target.value);
                    triggerTactileFeedback();
                  }}
                  className="w-full bg-[#FAF8F2] border border-sand rounded px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-forest"
                >
                  <option value="any">Any GPA Requirement</option>
                  <option value="3.0">3.0 and below</option>
                  <option value="3.2">3.2 and below</option>
                  <option value="3.4">3.4 and below</option>
                  <option value="3.6">3.6 and below</option>
                </select>
              </div>

              {/* Featured Only Toggle */}
              <div className="pt-4 border-t border-sand">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      triggerTactileFeedback();
                    }}
                    className="rounded text-forest focus:ring-forest"
                  />
                  <span className="font-medium text-ink">Show Featured Grants Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* RIGHT RESULTS COLUMN */}
          <main className="md:col-span-8 lg:col-span-9">
            {/* Results count banner */}
            <div className="flex items-center justify-between mb-4 text-xs text-stone font-mono">
              <span>
                Showing {filteredScholarships.length} verified {filteredScholarships.length === 1 ? 'scholarship' : 'scholarships'}
              </span>
              <span>Updated November 2026</span>
            </div>

            {/* Skeleton Loading State Simulation */}
            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="p-6 bg-paper border border-sand rounded animate-pulse space-y-4">
                    <div className="h-4 bg-sand rounded w-1/3" />
                    <div className="h-8 bg-sand rounded w-1/2" />
                    <div className="h-4 bg-sand rounded w-3/4" />
                    <div className="h-16 bg-sand/60 rounded" />
                    <div className="h-8 bg-sand rounded" />
                  </div>
                ))}
              </div>
            ) : filteredScholarships.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Designed Empty State */
              <div className="p-12 sm:p-16 text-center bg-paper border border-sand rounded shadow-subtle space-y-4">
                <div className="w-12 h-12 bg-sand/50 text-stone rounded flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6 text-stone" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  No scholarships matched your parameters
                </h3>
                <p className="text-sm text-stone max-w-md mx-auto leading-relaxed">
                  We couldn't find any grants matching your specific combination of filters. Try widening your GPA threshold, discipline area, or award range.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};


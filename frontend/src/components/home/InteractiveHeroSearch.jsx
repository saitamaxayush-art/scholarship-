import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, X, ChevronRight } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const InteractiveHeroSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { scholarships, openScholarshipModal, setGlobalSearchQuery } = useScholarship();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Suggestions filtered by query
  const suggestions = query.trim() === ''
    ? []
    : scholarships
        .filter(s =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.field.toLowerCase().includes(query.toLowerCase()) ||
          s.provider.toLowerCase().includes(query.toLowerCase()) ||
          s.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setGlobalSearchQuery(query);
    navigate(`/scholarships?q=${encodeURIComponent(query)}`);
  };

  const handleSelectSuggestion = (scholarship) => {
    setIsOpen(false);
    openScholarshipModal(scholarship);
  };

  const presetSearches = [
    { label: 'Clean Energy & STEM', query: 'STEM' },
    { label: 'First-Gen Leadership', query: 'First-Gen' },
    { label: 'Graduate Inquiry', query: 'Graduate' },
    { label: 'Urban Architecture', query: 'Architecture' }
  ];

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      {/* Live Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center bg-paper border border-sand hover:border-forest/50 focus-within:border-forest rounded shadow-panel transition-all p-1.5 sm:p-2">
          <div className="pl-3 pr-2 text-stone">
            <Search className="w-5 h-5 text-forest" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search by major, degree level, or funder (e.g. 'STEM', 'Computing', 'Du Bois')..."
            className="w-full bg-transparent border-none text-ink text-sm sm:text-base placeholder:text-stone/70 focus:outline-none py-1.5"
            aria-label="Search scholarships"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1.5 text-stone hover:text-ink mr-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4 shrink-0 font-medium"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4 ml-1 hidden sm:inline" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-paper border border-sand rounded shadow-panel z-30 overflow-hidden divide-y divide-sand/70">
          <div className="px-3 py-2 bg-[#F6F2E8] text-[11px] font-semibold uppercase tracking-wider text-stone flex items-center justify-between">
            <span>Verified Scholarship Matches ({suggestions.length})</span>
            <span className="text-[10px] lowercase font-normal text-stone">Press Enter to view all</span>
          </div>
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectSuggestion(item)}
              className="p-3.5 hover:bg-[#F5F0E4] cursor-pointer transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-forest bg-forest/10 px-1.5 py-0.2 rounded">
                    {item.amountFormatted}
                  </span>
                  <span className="text-xs text-stone px-1.5 py-0.2 bg-sand rounded">
                    {item.field}
                  </span>
                </div>
                <div className="font-serif text-sm font-bold text-ink group-hover:text-forest transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-stone">
                  {item.provider} &bull; Due {new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone group-hover:text-forest transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          ))}
          <div
            onClick={handleSearchSubmit}
            className="p-2.5 bg-[#FAF7F0] text-center text-xs font-medium text-forest hover:text-ink cursor-pointer border-t border-sand"
          >
            Explore all search results for "{query}" &rarr;
          </div>
        </div>
      )}

      {/* Quick Search Preset Tags */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-xs text-stone font-medium">Quick suggestions:</span>
        {presetSearches.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setQuery(preset.query);
              setGlobalSearchQuery(preset.query);
              navigate(`/scholarships?q=${encodeURIComponent(preset.query)}`);
            }}
            className="text-xs bg-sand/70 hover:bg-sand text-ink px-2.5 py-1 rounded transition-colors border border-sand/80 font-medium"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Bookmark } from 'lucide-react';
import { useScholarship } from '../../context/ScholarshipContext';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { trackerItems } = useScholarship();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Application Tracker', path: '/dashboard', count: trackerItems.length },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'The Problem', path: '/#the-problem' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#FBF9F4]/95 backdrop-blur-md border-b border-sand shadow-subtle py-3.5'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark in Fraunces serif */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
            >
              <div className="w-8 h-8 bg-forest text-paper flex items-center justify-center font-serif text-lg font-bold rounded-[3px] border border-forest-deep transition-transform duration-300 group-hover:scale-[1.03]">
                G
              </div>
              <span className="font-serif text-xl tracking-tight font-bold text-ink">
                GRANTLY
              </span>
              <span className="hidden sm:inline-block text-[11px] font-sans tracking-wider uppercase text-stone px-2 py-0.5 border-l border-sand">
                Discovery &amp; Tracker
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink/80">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-1 transition-colors duration-200 hover:text-forest flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded ${
                      isActive ? 'text-forest font-semibold' : 'text-stone hover:text-ink'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.count !== undefined && link.count > 0 && (
                      <span className="inline-flex items-center justify-center text-[10px] font-medium bg-sand text-ink px-1.5 py-0.2 rounded font-mono">
                        {link.count}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-forest"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/dashboard"
                className="btn-secondary text-xs uppercase tracking-wider font-medium flex items-center gap-1.5"
                title="View your tracked scholarships"
              >
                <Bookmark className="w-3.5 h-3.5 text-stone" />
                <span>Tracker ({trackerItems.length})</span>
              </Link>
              <Link
                to="/scholarships"
                className="btn-primary text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <span>Browse Grants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/dashboard"
                className="p-2 text-ink hover:text-forest rounded border border-sand bg-paper"
                aria-label="Tracker"
              >
                <Bookmark className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ink hover:text-forest rounded border border-sand bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[65px] left-0 right-0 z-30 bg-[#FBF9F4] border-b border-sand shadow-panel px-6 py-6 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-sand/60 text-ink hover:text-forest"
                >
                  <span>{link.name}</span>
                  {link.count !== undefined && (
                    <span className="text-xs bg-sand text-ink px-2 py-0.5 rounded font-mono">
                      {link.count}
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  to="/scholarships"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  Explore 20+ Verified Scholarships
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary w-full justify-center text-sm py-2.5"
                >
                  Open Application Tracker
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


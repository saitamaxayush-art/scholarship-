import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-forest-deep text-[#EDE9DF] border-t border-[#222B26] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#222B26]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-forest text-paper flex items-center justify-center font-serif text-lg font-bold rounded-[3px] border border-gold/40">
                G
              </div>
              <span className="font-serif text-2xl tracking-tight font-bold text-paper">
                GRANTLY
              </span>
            </div>
            <p className="text-sm text-[#A5AAA3] leading-relaxed max-w-sm">
              A structured scholarship workspace replacing fragmented portals, buried eligibility rules, and scattered spreadsheets with verified criteria and unified deadline tracking.
            </p>
            <div className="pt-2 text-xs text-[#8E938D] font-mono">
              Designed for undergraduate, graduate, and doctoral scholars.
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#A5AAA3]">
              <li>
                <Link to="/scholarships" className="hover:text-paper transition-colors flex items-center gap-1 group">
                  <span>Scholarship Catalog</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-paper transition-colors flex items-center gap-1 group">
                  <span>Application Tracker</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-paper transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#interactive-demo" className="hover:text-paper transition-colors">
                  Interactive Filter Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Discipline Areas
            </h4>
            <ul className="space-y-2 text-sm text-[#A5AAA3]">
              <li>
                <Link to="/scholarships?field=STEM" className="hover:text-paper transition-colors">
                  STEM &amp; Computing
                </Link>
              </li>
              <li>
                <Link to="/scholarships?field=Humanities" className="hover:text-paper transition-colors">
                  Humanities &amp; Social Inquiry
                </Link>
              </li>
              <li>
                <Link to="/scholarships?field=Healthcare" className="hover:text-paper transition-colors">
                  Medicine &amp; Clinical Sciences
                </Link>
              </li>
              <li>
                <Link to="/scholarships?field=Public+Policy" className="hover:text-paper transition-colors">
                  Public Policy &amp; Law
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Policies &amp; Terms
            </h4>
            <ul className="space-y-2 text-sm text-[#A5AAA3]">
              <li>
                <Link to="/privacy" className="hover:text-paper transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-paper transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="pt-2 text-xs text-[#8E938D] leading-relaxed">
                Local-first client application. No external user telemetry or credential tracking is stored on third-party servers.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E938D]">
          <div>
            &copy; {new Date().getFullYear()} GRANTLY Platform. All institutional grants cited for demonstration and application testing purposes.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#EDE9DF] transition-colors">
              Privacy
            </Link>
            <span className="text-[#333E37]">&bull;</span>
            <Link to="/terms" className="hover:text-[#EDE9DF] transition-colors">
              Terms
            </Link>
            <span className="text-[#333E37]">&bull;</span>
            <span className="font-mono text-[11px] text-[#A5AAA3]">Client Build v1.4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


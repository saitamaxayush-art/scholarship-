import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="pt-24 pb-24 bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="pb-8 border-b border-sand mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-forest bg-sand px-2.5 py-1 rounded inline-block">
              User Agreement
            </span>
            <span className="text-xs text-stone font-mono">
              Last Updated: November 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-stone leading-relaxed">
            Please read these terms carefully before utilizing the Grantly scholarship discovery directory and tracker application.
          </p>
        </header>

        {/* Long-form Editorial Body with Constrained Measure */}
        <div className="space-y-12 text-sm sm:text-base text-ink/80 leading-relaxed max-w-3xl">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Grantly, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any portion of these provisions, you should not utilize this application.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              2. Informational and Educational Purpose
            </h2>
            <p>
              Grantly serves as an index and organizational aid for undergraduate, graduate, and doctoral scholars. Grantly does not award scholarships directly, nor do we act as an official representative of the independent foundations, universities, or corporate sponsors listed in the catalog.
            </p>
            <p>
              While we make diligent efforts to ensure that eligibility criteria, deadlines, and required documentation are accurate and up to date, scholarship sponsors may alter their rules or deadlines without prior notice.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              3. User Responsibilities
            </h2>
            <p>
              When utilizing the Grantly platform, you acknowledge and agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone">
              <li>
                <strong className="text-ink">Independent Verification:</strong> Directly verify all final application submission deadlines, prerequisite grade point averages, and official submission guidelines with the primary scholarship administrator prior to submitting official materials.
              </li>
              <li>
                <strong className="text-ink">Academic Integrity:</strong> Submit authentic transcripts, personal statements, and letters of recommendation in compliance with your university honor codes and scholarship committee rules.
              </li>
              <li>
                <strong className="text-ink">Local Data Backup:</strong> Maintain independent copies of your application drafts, personal essays, and verification confirmations on your personal devices.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              4. Disclaimer of Scholarship Guarantee
            </h2>
            <p>
              Grantly provides no representation or guarantee that using our platform will result in an award, interview, or financial assistance. Scholarship awards are determined exclusively by independent committees based on their proprietary criteria and competitive review.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              5. Intellectual Property
            </h2>
            <p>
              The Grantly user interface, design system, custom typography hierarchy, and proprietary curation structure are protected by intellectual property laws. Third-party scholarship provider names, trademarks, and logos remain the sole property of their respective foundation and university entities.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Grantly and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform, including but not limited to missed application deadlines, disqualification by sponsors, or technical device errors.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              7. Governing Law and Inquiries
            </h2>
            <p>
              These Terms and Conditions shall be governed and interpreted under the applicable laws of the United States. If you have questions concerning these terms or wish to report an inaccurate scholarship listing, please contact:
            </p>
            <div className="p-4 bg-[#FAF7F0] border border-sand rounded space-y-1 font-mono text-xs">
              <div className="font-bold text-ink">Grantly Legal &amp; Institutional Relations</div>
              <div className="text-stone">Office of Higher Education Compliance</div>
              <div className="text-forest">legal@grantly-discovery.org</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


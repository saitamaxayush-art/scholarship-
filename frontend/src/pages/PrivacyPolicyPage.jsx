import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPolicyPage = () => {
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
              Legal Documentation
            </span>
            <span className="text-xs text-stone font-mono">
              Effective Date: November 1, 2026
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-stone leading-relaxed">
            This policy outlines how the Grantly application handles user input, local browser storage, and scholarship criteria data.
          </p>
        </header>

        {/* Long-form Editorial Body with Constrained Measure */}
        <div className="space-y-12 text-sm sm:text-base text-ink/80 leading-relaxed max-w-3xl">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              1. Information We Collect
            </h2>
            <p>
              Grantly operates as a client-side, local-first application designed to respect academic autonomy. We do not sell your personal data, nor do we partner with student loan brokers or third-party marketing networks.
            </p>
            <p>
              When using Grantly, data generated during your session includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone">
              <li>
                <strong className="text-ink">Application Tracking Data:</strong> The scholarships you choose to save, their associated pipeline stages (Saved, In Progress, Submitted, Decision), document checklist completions, and personal notes.
              </li>
              <li>
                <strong className="text-ink">Search and Filter Preferences:</strong> Transient filter selections such as preferred academic disciplines, degree level, and GPA parameters selected in the discovery engine.
              </li>
              <li>
                <strong className="text-ink">Technical Session Telemetry:</strong> Standard browser diagnostic variables (such as user-agent and viewport dimensions) handled natively by your local browser client.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              2. How Your Data Is Stored and Used
            </h2>
            <p>
              Your tracked applications, checklist records, and personal application notes are stored directly within your web browser using HTML5 LocalStorage. This data does not travel to an external server or central database during normal client operations.
            </p>
            <p>
              Specifically, your local data is used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone">
              <li>Maintain your personal application board across browser sessions.</li>
              <li>Calculate deadline timelines, milestone reminders, and document checklist readiness.</li>
              <li>Preserve your filtered scholarship preferences between navigation events.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              3. Cookies and Local Storage
            </h2>
            <p>
              Grantly does not utilize third-party tracking cookies, cross-site trackers, or advertising pixels. All state persistence relies strictly on standard web storage protocols under the domain key <code>grantly_tracker_data_v1</code>.
            </p>
            <p>
              You can clear your stored application data at any time by utilizing the "Reset Sample Data" action on the Application Tracker board, or by clearing your browser cache and local storage in your browser settings.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              4. Third-Party Links and Grant Providers
            </h2>
            <p>
              The Grantly catalog indexes educational fellowships, foundation grants, and university financial aid awards administered by independent organizations. Clicking external application links will redirect you to the respective institution's portal.
            </p>
            <p>
              We are not responsible for the privacy practices, forms, or data handling protocols of external third-party scholarship foundations. We advise reviewing the respective privacy disclosures of each scholarship committee prior to uploading sensitive academic records.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              5. User Rights and Data Control
            </h2>
            <p>
              Because your application data is stored client-side on your local device, you possess direct and immediate sovereignty over your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-stone">
              <li>You may export or inspect your tracked records directly through your browser developer tools.</li>
              <li>You may remove individual scholarships or reset the entire pipeline with one click.</li>
              <li>No account creation or password credentials are required to use the discovery catalog.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              6. Contact and Inquiries
            </h2>
            <p>
              For questions regarding this policy, catalog verifications, or data governance inquiries, please reach our administrative team at:
            </p>
            <div className="p-4 bg-[#FAF7F0] border border-sand rounded space-y-1 font-mono text-xs">
              <div className="font-bold text-ink">Grantly Academic Discovery Platform</div>
              <div className="text-stone">Privacy &amp; Data Ethics Working Group</div>
              <div className="text-forest">privacy@grantly-discovery.org</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


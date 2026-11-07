import { Link } from 'react-router-dom';
import { LegalLayout } from '../components/layout/LegalLayout';

const SECTIONS = [
  {
    id: 'summary',
    title: 'The short version',
    content: (
      <>
        <p>
          meritrail is a frontend demonstration. There are no accounts, no servers storing your answers and no tracking scripts.
          Everything you enter stays in your own browser.
        </p>
        <ul>
          <li>Your profile and tracker are saved in your browser’s local storage on this device only.</li>
          <li>We do not send your answers anywhere. There is no backend to send them to.</li>
          <li>You can delete everything at any time from the profile page or by clearing your browser data.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-we-store',
    title: 'What is stored, and where',
    content: (
      <>
        <h3>Your profile</h3>
        <p>
          When you build a profile we save your education level, field of study, optional GPA, whether you said you have financial
          need, and any optional groups you chose. This is used only to compare against the eligibility rules of the sample
          listings.
        </p>
        <h3>Your tracker</h3>
        <p>
          Scholarships you save, the stage each one is in, your document checklist and any decision outcome are saved so the board
          looks the same when you come back.
        </p>
        <h3>Where it lives</h3>
        <p>
          Both are stored with your browser’s local storage under keys that start with <code>meritrail.</code>. They never leave
          your device. If your browser blocks storage, the app still works but forgets everything when you close the tab.
        </p>
      </>
    ),
  },
  {
    id: 'sensitive',
    title: 'Sensitive answers',
    content: (
      <>
        <p>
          Some questions, like whether you are a student parent or have a disability, are personal. They are always optional. You
          will still see every listing without them; you just will not be matched to awards reserved for those groups.
        </p>
        <p>Because these answers stay on your device, nobody at meritrail can see them.</p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-party services',
    content: (
      <>
        <p>To render the site, your browser makes a small number of outside requests:</p>
        <ul>
          <li>
            <strong>Fonts.</strong> The General Sans typeface is loaded from Fontshare. That request shares your IP address and
            browser details with the font provider, as any web request does.
          </li>
          <li>
            <strong>Photos.</strong> Photography is served from this site’s own files. The original images come from Unsplash under
            the Unsplash License.
          </li>
        </ul>
        <p>We use no analytics, advertising pixels or social media embeds.</p>
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content: (
      <ul>
        <li>
          Clear your profile from the <Link to="/start">profile page</Link>.
        </li>
        <li>
          Reset or empty your tracker from the <Link to="/dashboard">tracker</Link>.
        </li>
        <li>Clear this site’s data in your browser settings to remove everything at once.</li>
      </ul>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          If a future version adds accounts or a real backend, this policy will be rewritten before that change goes live, and the
          date at the top will change.
        </p>
        <p>
          Questions can go to <a href="mailto:hello@meritrail.example">hello@meritrail.example</a>, a placeholder address for this
          demo.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title="Your answers stay with you."
      intro="How the meritrail demo handles the information you give it, written to be read in a few minutes."
      updated="November 7, 2026"
      sections={SECTIONS}
    />
  );
}

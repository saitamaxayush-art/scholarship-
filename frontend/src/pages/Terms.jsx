import { Link } from 'react-router-dom';
import { LegalLayout } from '../components/layout/LegalLayout';

const SECTIONS = [
  {
    id: 'about',
    title: 'What meritrail is',
    content: (
      <>
        <p>
          meritrail is a demonstration of a scholarship matching and tracking tool. By using it, you agree to these terms. If you
          do not agree, please do not use the site.
        </p>
        <p>
          It runs entirely in your browser. There are no user accounts, payments or submissions to any scholarship provider.
        </p>
      </>
    ),
  },
  {
    id: 'sample-data',
    title: 'Sample data only',
    content: (
      <>
        <p>
          Every scholarship, provider, amount, deadline and requirement shown on meritrail is fictional. Names were invented for this
          demo, and any resemblance to a real program is coincidental.
        </p>
        <ul>
          <li>Do not rely on any listing to make financial or academic decisions.</li>
          <li>Numbers on the home page describe the sample dataset, not the real scholarship market.</li>
          <li>The guides in Resources are general advice, not financial or legal advice.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'matching',
    title: 'How matching works',
    content: (
      <>
        <p>
          Match results come from simple rules that compare your profile with each listing’s level, field, GPA, financial need and
          group requirements. They are an estimate to help you decide where to look first.
        </p>
        <p>
          With real scholarships, always confirm eligibility with the provider. A match on meritrail does not mean a provider has
          reviewed or approved you.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <>
        <p>Please do not:</p>
        <ul>
          <li>Present the sample listings as real opportunities to other people.</li>
          <li>Attempt to disrupt the site or the services it loads.</li>
          <li>Copy the illustrations or brand for use in a way that suggests a connection with meritrail.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Content and credits',
    content: (
      <>
        <p>
          The meritrail name, logo and character illustrations were made for this project. Photographs are from Unsplash and used
          under the Unsplash License. The General Sans typeface is provided by Fontshare.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'No warranty',
    content: (
      <>
        <p>
          The site is provided as is, without warranties of any kind. To the extent the law allows, the meritrail team is not liable
          for any loss that comes from using the demo or relying on its sample content.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    content: (
      <>
        <p>We may update these terms as the project changes. The date at the top shows the latest version.</p>
        <p>
          See the <Link to="/privacy">Privacy Policy</Link> for how your information is handled, or write to{' '}
          <a href="mailto:hello@meritrail.example">hello@meritrail.example</a>, a placeholder address for this demo.
        </p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Terms & Conditions"
      title="The ground rules."
      intro="Plain terms for using the meritrail demo, including the most important one: every listing here is sample data."
      updated="November 7, 2026"
      sections={SECTIONS}
    />
  );
}

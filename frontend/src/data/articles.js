// Resource articles shown on the landing page and at /resources/:slug.
// Guidance only. Dollar figures here are worked examples, not market data.

export const ARTICLES = [
  {
    slug: 'how-much-can-you-get',
    title: 'How Much Can You Actually Get From Scholarships in 2026?',
    tag: 'Money',
    readTime: '6 min read',
    image: '/images/article-amounts.jpg',
    imageAlt: 'Graduates in caps and gowns walking across a field at sunrise',
    excerpt: 'Big awards get the headlines. Most of the money you will actually win comes in smaller pieces that stack.',
    sections: [
      {
        heading: 'Start with the gap, not the prize',
        body: [
          'Before you chase any award, work out your real gap: the full cost of attendance minus the grants and aid already in your offer letter. That number is your target. It tells you whether you need one large award or several small ones.',
          'Write the gap down somewhere you will see it. Every application you choose should move that number.',
        ],
      },
      {
        heading: 'Small awards stack',
        body: [
          'Awards between $1,000 and $5,000 usually get fewer applicants than the large national ones, and many reuse the same essay prompts. Four $2,500 awards close the same gap as one $10,000 award, and you have far better odds on each.',
          'In the meritrail sample dataset, most listings fall in this range on purpose, because that is where students tend to find steady wins.',
        ],
      },
      {
        heading: 'Read the renewal terms',
        body: [
          'A $3,000 award that renews for four years is worth $12,000. A one-time $8,000 award is worth $8,000. Always check whether an award renews and what GPA or credit load you need to keep it.',
        ],
      },
      {
        heading: 'Ask how it is paid',
        body: [
          'Some awards go straight to your school and can reduce other aid. Ask your financial aid office how outside scholarships are applied before you accept one, so you know what you actually keep.',
        ],
      },
    ],
  },
  {
    slug: 'essays-reviewers-read',
    title: 'How to Write an Essay Reviewers Actually Read',
    tag: 'Writing',
    readTime: '8 min read',
    image: '/images/article-essay.jpg',
    imageAlt: 'A student writing by hand in a notebook next to a mug',
    excerpt: 'Reviewers often read dozens of essays in one sitting. Here is how to make yours the one they remember.',
    sections: [
      {
        heading: 'Open with a moment, not a mission statement',
        body: [
          'Skip lines like "I have always been passionate about helping others." Start with a specific scene: the night the power went out during finals, the first time you fixed your grandmother’s phone. A concrete moment earns attention in the first sentence.',
        ],
      },
      {
        heading: 'Answer the prompt they wrote',
        body: [
          'Reuse is smart, but a recycled essay that ignores the question is easy to spot. Keep a core story, then rewrite the first and last paragraphs to answer each prompt directly.',
        ],
      },
      {
        heading: 'Show the turn',
        body: [
          'The strongest essays show a change: what you believed, what happened, and what you do differently now. Reviewers are looking for how you think, not a list of achievements they can already read in your resume.',
        ],
      },
      {
        heading: 'Cut the last 15 percent',
        body: [
          'Once you have a full draft, cut it by about 15 percent. Remove repeated ideas, warm-up sentences and adjectives that do no work. Then read it out loud once before you submit.',
        ],
      },
    ],
  },
  {
    slug: 'application-timeline',
    title: 'Building an Application Timeline That Works',
    tag: 'Planning',
    readTime: '5 min read',
    image: '/images/article-timeline.jpg',
    imageAlt: 'A laptop, open notebook and coffee mug on a wooden desk',
    excerpt: 'Most missed scholarships are missed on logistics, not merit. A simple timeline fixes that.',
    sections: [
      {
        heading: 'Work backwards from each deadline',
        body: [
          'For every award, set three dates: when you ask for recommendation letters (three weeks before), when your first draft is done (ten days before) and when you submit (two days before). The real deadline is your backup, not your plan.',
        ],
      },
      {
        heading: 'Batch the paperwork',
        body: [
          'Transcripts, financial aid summaries and proof of enrollment show up again and again. Request or download them once at the start of the term and keep them in one folder.',
        ],
      },
      {
        heading: 'Use stages, not a to-do list',
        body: [
          'A flat list hides where you are stuck. Moving each award through Saved, In progress, Submitted and Decision shows you at a glance what needs work this week. The meritrail tracker is built around exactly those four stages.',
        ],
      },
      {
        heading: 'Review every Sunday',
        body: [
          'Spend 15 minutes each week looking at deadlines in the next 30 days. Move one item forward. Small, regular progress beats a stressful final weekend.',
        ],
      },
    ],
  },
];

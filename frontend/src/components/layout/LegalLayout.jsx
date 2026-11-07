/** Shared layout for /privacy and /terms: title block, sticky table of contents, readable measure. */
export function LegalLayout({ eyebrow, title, intro, updated, sections }) {
  return (
    <div className="pb-24 pt-[calc(var(--nav-h)+2.5rem)]">
      <div className="container-x">
        <header className="max-w-3xl">
          <p className="eyebrow text-ink/65">{eyebrow}</p>
          <h1 className="mt-2 text-display-sm font-semibold">{title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink/75">{intro}</p>
          <p className="mt-4 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium ring-1 ring-ink/10">Last updated {updated}</p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
            <p className="eyebrow text-ink/65">On this page</p>
            <ol className="mt-4 space-y-1 border-l-2 border-ink/10">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="focus-square -ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] font-medium text-ink/70 hover:border-grass-deep hover:text-ink"
                  >
                    <span className="mr-2 tabular-nums text-ink/65">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose-legal max-w-measure [&>section:first-child>h2]:mt-0">
            {sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import { Reveal } from '../../lib/motion';

export function ArticleCard({ article, index = 0, context = 'home' }) {
  return (
    <Reveal as="li" id={`article-${context}-${article.slug}`} y={40} amount={0.25} delay={index * 0.08}>
      <Link
        to={`/resources/${article.slug}`}
        className="focus-square pressable group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-soft transition-[transform,box-shadow,scale] duration-base hover:-translate-y-1 hover:shadow-card"
      >
        <div className="overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            decoding="async"
            width={1000}
            height={750}
            className="aspect-[4/3] w-full object-cover transition-transform duration-slow group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-grass px-3 py-1 font-semibold">{article.tag}</span>
            <span className="text-ink/65">{article.readTime}</span>
          </div>
          <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight tracking-[-0.03em]">{article.title}</h3>
          <p className="mt-3 flex-1 text-ink/70">{article.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream transition-transform duration-base group-hover:rotate-[-12deg]" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
            Read the guide
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Resources() {
  return (
    <section id="resources" className="bg-cream pb-28 sm:pb-36" aria-labelledby="resources-title">
      <div className="container-x">
        <div className="flex flex-col gap-4 border-t-2 border-ink/10 pt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-ink/65">Resources</p>
            <h2 id="resources-title" className="mt-3 max-w-[18ch] text-title font-semibold">
              Guides for the parts nobody explains.
            </h2>
          </div>
          <p className="max-w-sm text-ink/75">Short, practical reads on money, essays and timing. No sign-up needed.</p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

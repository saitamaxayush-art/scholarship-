import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/home/Resources';
import NotFound from './NotFound';

export default function Article() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  const others = ARTICLES.filter((a) => a.slug !== slug);

  return (
    <div className="pb-24 pt-[calc(var(--nav-h)+2rem)]">
      <article className="container-x">
        <Link to="/#resources" className="inline-flex items-center gap-2 rounded-full py-1 pr-2 font-semibold hover:underline underline-offset-4">
          <ArrowLeft size={18} aria-hidden="true" /> All guides
        </Link>
        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-grass px-3 py-1 font-semibold">{article.tag}</span>
            <span className="text-ink/65">{article.readTime}</span>
          </div>
          <h1 className="mt-5 text-title font-semibold">{article.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink/75">{article.excerpt}</p>
        </header>
        <img src={article.image} alt={article.imageAlt} width={1000} height={500} className="mx-auto mt-10 aspect-[16/8] w-full max-w-5xl rounded-[32px] object-cover" />
        <div className="prose-legal mx-auto max-w-measure">
          {article.sections.map((sec) => (
            <section key={sec.heading}>
              <h2>{sec.heading}</h2>
              {sec.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <section className="container-x mt-24" aria-labelledby="more-title">
        <h2 id="more-title" className="text-2xl font-semibold">
          Keep reading
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} context={`more-${slug}`} />
          ))}
        </ul>
      </section>
    </div>
  );
}

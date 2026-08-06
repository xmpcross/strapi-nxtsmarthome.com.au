import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { AuthorAvatar } from '@/components/AuthorByline';
import { getAllArticles } from '@/lib/content';
import { getAllAuthors, getAuthorBySlug, resolveAuthor } from '@/lib/authors';
import { breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `${author.name} — Articles`,
    description: author.bio?.slice(0, 160),
    alternates: { canonical: `/authors/${author.slug}/` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  // Articles this author is credited on. resolveAuthor() rather than a raw
  // string compare, so the editorial page also collects everything that names
  // nobody — which is the majority, and the honest place for it to land.
  const articles = (await getAllArticles()).filter(
    (a) => resolveAuthor(a.author).slug === author.slug,
  );

  return (
    <div className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: author.name, path: `/authors/${author.slug}/` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': author.slug === 'nxt-smart-home-editorial' ? 'Organization' : 'Person',
          name: author.name,
          url: `${site.url}/authors/${author.slug}/`,
          ...(author.bio ? { description: author.bio } : {}),
          ...(author.role ? { jobTitle: author.role } : {}),
        }}
      />

      <header className="mb-10 flex flex-wrap items-start gap-5">
        <AuthorAvatar author={author} size={72} />
        <div className="min-w-0 flex-1">
          <PageHeader
            eyebrow={author.role ?? 'Author'}
            title={author.name}
            intro={author.bio}
            meta={`${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`}
          />
          {author.links?.length ? (
            <div className="-mt-4 flex flex-wrap gap-4 text-sm">
              {author.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-medium text-brand-700 hover:underline dark:text-brand-400"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {author.note ? (
        <p className="mb-10 w-full text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:w-4/5 sm:text-base">
          {author.note}
        </p>
      ) : null}

      {articles.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
          Nothing published under this byline yet.
        </p>
      )}
    </div>
  );
}

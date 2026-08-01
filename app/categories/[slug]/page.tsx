import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import { getAllArticles, getArticlesByCategory } from '@/lib/content';
import { categories, getCategory } from '@/lib/site';
import { breadcrumbJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} — Guides & Reviews`,
    description: category.intro.slice(0, 160),
    alternates: { canonical: `/categories/${category.slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.key);
  const all = await getAllArticles();
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: `/categories/${category.slug}/` },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 max-w-3xl">
          <div className="mb-3 text-4xl" aria-hidden="true">
            {category.emoji}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {category.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {category.intro}
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
            Nothing published in this section yet — it&apos;s next on the list.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        <section className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-700">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Other topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((other) => {
              const count = all.filter((a) => a.category === other.key).length;
              return (
                <Link
                  key={other.slug}
                  href={`/categories/${other.slug}/`}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300"
                >
                  {other.emoji} {other.name}
                  <span className="ml-1.5 text-xs text-slate-400">{count}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

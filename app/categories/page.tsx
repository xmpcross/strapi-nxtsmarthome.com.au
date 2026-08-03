import type { Metadata } from 'next';
import Link from 'next/link';
import { categoriesWithCounts, getAllArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Topics',
  description:
    'Browse smart home guides and reviews by topic — security, lighting, energy, climate, hubs and platforms, robot vacuums, setup guides and buying guides.',
  alternates: { canonical: '/categories/' },
};

export default async function CategoriesIndex() {
  const articles = await getAllArticles();
  const cats = categoriesWithCounts(articles);

  return (
    <div className="mx-auto max-w-site px-4 py-12">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Topics
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Everything we publish, organised by what you&apos;re trying to do.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}/`}
            className="group rounded-xl border border-slate-200 p-6 transition hover:border-brand-400 hover:shadow-md dark:border-slate-700 dark:hover:border-brand-600"
          >
            <div className="mb-3 text-3xl" aria-hidden="true">
              {category.emoji}
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
              {category.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {category.intro}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {category.count} {category.count === 1 ? 'article' : 'articles'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

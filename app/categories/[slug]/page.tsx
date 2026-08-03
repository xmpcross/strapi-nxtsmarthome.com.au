import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import CategorySidebar from '@/components/CategorySidebar';
import JsonLd from '@/components/JsonLd';
import { categoriesWithCounts, getAllArticles, getArticlesByCategory } from '@/lib/content';
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
  const categoryCounts = categoriesWithCounts(all);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: `/categories/${category.slug}/` },
        ])}
      />

      <div className="mx-auto max-w-site px-4 py-12">
        <header className="mb-10 max-w-3xl">
          <div className="mb-3 text-4xl" aria-hidden="true">
            {category.emoji}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {category.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {category.intro}
          </p>
        </header>

        {/*
          Same rail as /articles/, with this category marked current. It replaces
          the old "Other topics" pill row at the foot of the page — both did the
          same job, and the sidebar keeps the switcher visible while reading.
        */}
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <CategorySidebar
            categories={categoryCounts}
            activeSlug={category.slug}
            total={all.length}
          />

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
        </div>
      </div>
    </>
  );
}

import ArticleCard from '@/components/ArticleCard';
import CategorySidebar from '@/components/CategorySidebar';
import JsonLd from '@/components/JsonLd';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import { breadcrumbJsonLd } from '@/lib/seo';
import type { Article } from '@/lib/content';
import type { Category } from '@/lib/site';

/**
 * The category listing, shared by /categories/[slug]/ and its /page/N/ routes so
 * the two cannot drift. Page 1 is the base URL; later pages are real static
 * files, which is what lets a crawler reach articles beyond the first six.
 */
export default function CategoryView({
  category,
  articles,
  page,
  categoryCounts,
  totalArticles,
}: {
  category: Category;
  articles: Article[];
  page: number;
  // The sidebar's own type, not a structural copy of it — a copy silently drifts
  // the moment a field is added to Category.
  categoryCounts: (Category & { count: number })[];
  totalArticles: number;
}) {
  const base = `/categories/${category.slug}/`;
  const start = (page - 1) * PER_PAGE;
  const visible = articles.slice(start, start + PER_PAGE);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: category.name, path: base },
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
          {page > 1 && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Page {page}</p>
          )}
        </header>

        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <CategorySidebar
            categories={categoryCounts}
            activeSlug={category.slug}
            total={totalArticles}
          />

          <div>
            {visible.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
                Nothing published in this section yet — it&apos;s next on the list.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}

            <Pagination base={base} page={page} total={articles.length} />
          </div>
        </div>
      </div>
    </>
  );
}

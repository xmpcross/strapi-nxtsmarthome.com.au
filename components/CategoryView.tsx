import ArticleCard from '@/components/ArticleCard';
import PageHeader from '@/components/PageHeader';
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

      <div className="mx-auto max-w-[1366px] px-4 py-8 sm:px-6">
        <PageHeader
          eyebrow="Australian Buying Advice & Guides"
          title={category.name}
          intro={category.intro}
          meta={page > 1 ? `Page ${page}` : undefined}
        />

        {/* Long-form orientation, where the category has one. Rendered only on
            page 1 — repeating it on /page/2/ would be duplicate content and
            pushes the articles a reader paged forward for further down. */}
        {category.overview && page === 1 ? (
          <section className="mb-10 w-full sm:w-4/5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {category.overview.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {category.overview.paragraphs.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
            </div>
          </section>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <CategorySidebar
            categories={categoryCounts}
            activeSlug={category.slug}
            total={totalArticles}
          />

          <div>
            {visible.length === 0 ? (
              <p className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import ArticleCard from '@/components/ArticleCard';
import Disclosure from '@/components/Disclosure';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import ProductBox from '@/components/ProductBox';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import ArticleSidebar from '@/components/ArticleSidebar';
import RelatedPosts from '@/components/RelatedPosts';
import ReadAlso from '@/components/ReadAlso';
import NextUp from '@/components/NextUp';
import Comments from '@/components/Comments';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  categoriesWithCounts,
  coverFor,
  formatDate,
  getAllArticles,
  getArticle,
  getFeaturedArticles,
  getRelatedArticles,
  getRelatedWithScores,
  articleHref,
  typeLabels,
} from '@/lib/content';
import { getProductsBySlugs } from '@/lib/products';
import { site } from '@/lib/site';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  // Only real category slugs are emitted, so this dynamic segment can never
  // shadow a static route such as /about/ or /categories/.
  return articles.map((article) => ({
    category: article.categoryMeta?.slug ?? 'articles',
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const url = articleHref(article);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      // Defining openGraph here replaces the root object entirely, so the default
      // image must be repeated — otherwise every article shares with a blank card.
      images: [article.image ?? site.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image ?? site.ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const relatedScored = await getRelatedWithScores(article, 3);
  // A wider pool so the three blocks (mid-article, Next Up, Related Posts) show
  // different articles rather than repeating the same top matches three times.
  const relatedPool = await getRelatedWithScores(article, 7);
  const readAlso = relatedPool.slice(3, 5).map((r) => r.article);
  const nextUp = relatedPool.slice(0, 4).map((r) => r.article);
  const itemList = itemListJsonLd(article);
  const all = await getAllArticles();

  const url = `${site.url}${articleHref(article)}`;
  const categoryCounts = categoriesWithCounts(all);
  const featured = (await getFeaturedArticles(4)).filter((a) => a.slug !== article.slug).slice(0, 3);

  // Previous / next by publication order.
  const idx = all.findIndex((a) => a.slug === article.slug);
  const newer = idx > 0 ? all[idx - 1] : undefined;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;

  // Products placed inline by scripts/link-products.mjs. Only the ones actually
  // referenced by a marker in this article are loaded.
  const inlineSlugs = Array.from(
    new Set(Array.from(article.html.matchAll(/<p>::product:([a-z0-9-]+)::<\/p>/g), (m) => m[1])),
  );
  const inlineProducts = getProductsBySlugs(inlineSlugs);
  // Inline markers plus any front-matter products, deduped — the affiliate block
  // lists every retailer behind every product the article actually discusses.
  // Curated products placed inline, plus any defined inline in front matter.
  // Both carry a name and a retailer list, which is all the affiliate block needs.
  const allProducts = [...inlineProducts, ...(article.products ?? [])];

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Articles', path: '/articles/' },
          ...(article.categoryMeta
            ? [
                {
                  name: article.categoryMeta.name,
                  path: `/categories/${article.categoryMeta.slug}/`,
                },
              ]
            : []),
          { name: article.title, path: articleHref(article) },
        ])}
      />
      {article.faq?.length ? <JsonLd data={faqJsonLd(article.faq)} /> : null}
      {itemList ? <JsonLd data={itemList} /> : null}

      <div className="mx-auto max-w-site px-4 py-10">
        {/* Full-width header: breadcrumb, then text left and cover right */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="font-medium text-slate-700 hover:text-brand-700 hover:underline dark:text-slate-300">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">›</li>
            {article.categoryMeta && (
              <>
                <li>
                  <Link
                    href={`/categories/${article.categoryMeta.slug}/`}
                    className="font-medium text-slate-700 hover:text-brand-700 hover:underline dark:text-slate-300"
                  >
                    {article.categoryMeta.name}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">›</li>
              </>
            )}
            <li className="truncate text-slate-400" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <header className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <Link href="/about/" className="font-semibold text-brand-700 hover:underline dark:text-brand-400">
                {article.author}
              </Link>
              <span className="text-slate-500 dark:text-slate-400">
                {' '}on <time dateTime={article.date}>{formatDate(article.updated ?? article.date)}</time>
              </span>
            </p>

            {/* Fixed 2rem / 700 — no responsive step-up, so the size is the same everywhere. */}
            <h1 className="mt-4 text-[2rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              {article.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {article.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {article.categoryMeta && (
                <Link
                  href={`/categories/${article.categoryMeta.slug}/`}
                  className="rounded border border-slate-300 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:text-slate-300"
                >
                  {article.categoryMeta.name}
                </Link>
              )}
              <span className="rounded border border-slate-300 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:border-slate-600 dark:text-slate-300">
                {typeLabels[article.type] ?? article.type}
              </span>
            </div>
          </div>

          {/*
            2:1 to match how the covers are actually generated (1000x500). The box
            was 16:10, so object-cover trimmed roughly 11% off each side — which is
            what was slicing the left edge off the headline.
          */}
          <figure className="overflow-hidden rounded-lg">
            <img
              src={coverFor(article)}
              alt={article.imageAlt ?? ''}
              width={1000}
              height={500}
              className="aspect-[62/35] w-full object-cover"
            />
          </figure>
        </header>

        {/* metabar rail | content | widget sidebar */}
        <div className="grid gap-8 lg:grid-cols-[5rem_minmax(0,1fr)_19rem] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col items-center gap-5">
              <ReadingProgress minutes={article.readingMinutes} />
              <div className="h-px w-8 bg-slate-200 dark:bg-slate-700" />
              <ShareButtons url={url} title={article.title} variant="compact" orientation="vertical" />
            </div>
          </aside>

          <article>


        <Disclosure />

        {article.keyTakeaway && (
          <div className="mb-8 rounded-xl border-0 bg-brand-50 p-5 dark:bg-card">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-400">
              The short answer
            </p>
            <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">
              {article.keyTakeaway}
            </p>
          </div>
        )}

        <TableOfContents headings={article.headings} />

        <div id="article-body">
          <ArticleBody
            html={article.html}
            products={inlineProducts}
            subId={article.slug}
            midSlot={
              <ReadAlso
                items={readAlso.length ? readAlso : relatedScored.slice(0, 2).map((r) => r.article)}
              />
            }
          />
        </div>

        {article.products?.length ? (
          <section className="mt-12" aria-labelledby="picks-heading">
            <h2
              id="picks-heading"
              className="mb-2 text-2xl font-bold text-slate-900 dark:text-white"
            >
              Where to buy
            </h2>
            <Disclosure compact />
            {article.products.map((product, index) => (
              <ProductBox
                key={product.name}
                product={product}
                subId={article.slug}
                rank={article.products!.length > 1 ? index + 1 : undefined}
              />
            ))}
          </section>
        ) : null}

        <RelatedPosts items={relatedScored} />

        {article.faq?.length ? <Faq items={article.faq} /> : null}

        <Comments slug={article.slug} />

        <NextUp items={nextUp} />

        <AffiliateLinks products={allProducts} subId={article.slug} />

        {article.tags?.length ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-500">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Share row, author card and prev/next — matching the reference's below-body stack */}
        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-700">
          <ShareButtons url={url} title={article.title} />
        </div>

        {(newer || older) && (
          <nav aria-label="More articles" className="mt-8 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link
                href={articleHref(older)}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-brand-400 dark:border-slate-700"
              >
                <img src={coverFor(older)} alt="" width={1200} height={675} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Previous</span>
                  <span className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-brand-700 dark:text-white">
                    {older.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={articleHref(newer)}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-right transition hover:border-brand-400 sm:flex-row-reverse dark:border-slate-700"
              >
                <img src={coverFor(newer)} alt="" width={1200} height={675} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Next</span>
                  <span className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-brand-700 dark:text-white">
                    {newer.title}
                  </span>
                </span>
              </Link>
            )}
          </nav>
        )}
          </article>

          <ArticleSidebar featured={featured} categoryCounts={categoryCounts} />
        </div>
      </div>

    </>
  );
}

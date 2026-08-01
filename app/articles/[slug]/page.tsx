import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import Disclosure from '@/components/Disclosure';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import ProductBox from '@/components/ProductBox';
import TableOfContents from '@/components/TableOfContents';
import {
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
  typeLabels,
} from '@/lib/content';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const url = `/articles/${article.slug}/`;
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
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const itemList = itemListJsonLd(article);

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
          { name: article.title, path: `/articles/${article.slug}/` },
        ])}
      />
      {article.faq?.length ? <JsonLd data={faqJsonLd(article.faq)} /> : null}
      {itemList ? <JsonLd data={itemList} /> : null}

      <article className="mx-auto max-w-3xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-700 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {article.categoryMeta && (
              <>
                <li>
                  <Link
                    href={`/categories/${article.categoryMeta.slug}/`}
                    className="hover:text-brand-700 hover:underline"
                  >
                    {article.categoryMeta.name}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li className="text-slate-400" aria-current="page">
              {typeLabels[article.type] ?? article.type}
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {article.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span>By {article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>
              {article.updated ? 'Updated ' : ''}
              {formatDate(article.updated ?? article.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
        </header>

        <Disclosure />

        {article.keyTakeaway && (
          <div className="mb-8 rounded-xl border-l-4 border-brand-500 bg-brand-50 p-5 dark:bg-slate-800">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-400">
              The short answer
            </p>
            <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">
              {article.keyTakeaway}
            </p>
          </div>
        )}

        <TableOfContents headings={article.headings} />

        <div
          className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-brand-700 prose-a:font-medium hover:prose-a:text-brand-800 prose-th:text-left dark:prose-invert dark:prose-a:text-brand-400"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

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

        {article.faq?.length ? <Faq items={article.faq} /> : null}

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
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Keep reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

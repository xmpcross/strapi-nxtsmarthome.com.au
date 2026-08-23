import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticlesList from '@/components/ArticlesList';
import { pageCount } from '@/components/Pagination';
import { getAllArticles } from '@/lib/content';

/**
 * Pages two and up. Page one stays at /articles/, so /articles/page/1/ is
 * deliberately never generated — it would be a duplicate of the list under a
 * second URL, which is a canonical problem rather than a convenience.
 */
export async function generateStaticParams() {
  const total = pageCount((await getAllArticles()).length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `All Articles — Page ${page}`,
    description:
      'Every smart home review, setup guide, comparison and buying guide published on NXT Smart Home, newest first.',
    alternates: { canonical: `/articles/page/${page}/` },
  };
}

export default async function ArticlesPaged({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = Number(page);
  const articles = await getAllArticles();

  // A page number that is not a number, or past the end, is a 404 rather than
  // an empty grid that looks like the library is gone.
  if (!Number.isInteger(n) || n < 2 || n > pageCount(articles.length)) notFound();

  return <ArticlesList articles={articles} page={n} />;
}

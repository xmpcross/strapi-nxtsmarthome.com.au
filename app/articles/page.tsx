import type { Metadata } from 'next';
import ArticlesList from '@/components/ArticlesList';
import { getAllArticles } from '@/lib/content';

/*
 * Listings refresh from Strapi every 5 minutes (ISR), like /articles/page/N/.
 * This page had no revalidate, so it was prerendered once per deploy and
 * cached for a year: it kept showing the count from the last build (23) while
 * Strapi had many more, and new posts never reached page one.
 */
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Every smart home buying guide, setup guide, comparison and explainer published on NXT Smart Home, newest first.',
  alternates: { canonical: '/articles/' },
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();
  return <ArticlesList articles={articles} page={1} />;
}

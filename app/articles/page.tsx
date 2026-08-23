import type { Metadata } from 'next';
import ArticlesList from '@/components/ArticlesList';
import { getAllArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Every smart home review, setup guide, comparison and buying guide published on NXT Smart Home, newest first.',
  alternates: { canonical: '/articles/' },
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();
  return <ArticlesList articles={articles} page={1} />;
}

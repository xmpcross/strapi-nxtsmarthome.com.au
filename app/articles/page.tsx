import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/content';

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Every smart home review, setup guide, comparison and buying guide published on NXT Smart Home, newest first.',
  alternates: { canonical: '/articles/' },
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          All articles
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'} on smart home gear,
          setup and buying decisions — newest first.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-slate-500">No articles published yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

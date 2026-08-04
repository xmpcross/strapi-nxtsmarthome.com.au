import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryView from '@/components/CategoryView';
import { categoriesWithCounts, getAllArticles, getArticlesByCategory } from '@/lib/content';
import { categories, getCategory } from '@/lib/site';

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

  return (
    <CategoryView
      category={category}
      articles={articles}
      page={1}
      categoryCounts={categoriesWithCounts(all)}
      totalArticles={all.length}
    />
  );
}

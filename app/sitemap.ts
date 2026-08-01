import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content';
import { categories, site } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const newest = articles[0]?.date ? new Date(articles[0].date) : new Date();

  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/articles/', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/categories/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about/', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/how-we-test/', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/contact/', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/affiliate-disclosure/', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: newest,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/categories/${category.slug}/`,
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/articles/${article.slug}/`,
      lastModified: new Date(article.updated ?? article.date),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.9 : 0.8,
    })),
  ];
}

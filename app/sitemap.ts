import type { MetadataRoute } from 'next';
import { articleHref, getAllArticles } from '@/lib/content';
import { pageCount } from '@/components/Pagination';
import { getAllTopProducts } from '@/lib/products';
import { categories, site } from '@/lib/site';
import { getAllAuthors } from '@/lib/authors';

export const dynamic = 'force-static';

/**
 * Every indexable page.
 *
 * The product catalogue, the author profiles and the paginated /articles/ pages
 * were all absent: the sitemap listed 67 URLs against 298 built pages, so 215
 * product pages had no path in it at all and relied on being found by crawl
 * alone.
 *
 * /search/, /preview/ and /design-preview/ stay out — robots.txt disallows them,
 * and a sitemap that lists a disallowed URL is a contradiction Search Console
 * reports back.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const products = getAllTopProducts();
  const authors = getAllAuthors();
  const newest = articles[0]?.date ? new Date(articles[0].date) : new Date();

  // Page one lives at /articles/, already in staticPages; this adds 2..N.
  const articlePages = Array.from(
    { length: Math.max(0, pageCount(articles.length) - 1) },
    (_, i) => i + 2,
  );

  const productCategories = Array.from(
    new Set(products.map((p) => p.categorySlug).filter(Boolean)),
  );

  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/articles/', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/categories/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about/', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/how-we-test/', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/contact/', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/affiliate-disclosure/', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookies/', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/sitemap/', priority: 0.3, changeFrequency: 'weekly' as const },
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
      url: `${site.url}${articleHref(article)}`,
      lastModified: new Date(article.updated ?? article.date),
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.9 : 0.8,
    })),
    ...articlePages.map((n) => ({
      url: `${site.url}/articles/page/${n}/`,
      lastModified: newest,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    })),
    {
      url: `${site.url}/products/`,
      lastModified: newest,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...productCategories.map((slug) => ({
      url: `${site.url}/products/category/${slug}/`,
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}/`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : newest,
      // Prices move, so these are worth recrawling more often than an article.
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...authors.map((author) => ({
      url: `${site.url}/authors/${author.slug}/`,
      lastModified: newest,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
  ];
}

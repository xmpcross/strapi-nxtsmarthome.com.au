import { site } from './site';
import type { Article } from './content';
import { articleHref } from './urls';

const abs = (pathname: string) => new URL(pathname, site.url).toString();

/** Organisation + site-level JSON-LD. Rendered once in the root layout. */
export function organisationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organisation`,
        name: site.organisation.name,
        url: site.url,
        email: site.organisation.email,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        publisher: { '@id': `${site.url}/#organisation` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${site.url}/search/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function articleJsonLd(article: Article) {
  const url = abs(articleHref(article));
  // Reviews and comparisons carry a stronger signal as Review; everything else is an Article.
  const isReview = article.type === 'review';

  const base = {
    '@context': 'https://schema.org',
    '@type': isReview ? 'Review' : 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    name: article.title,
    description: article.description,
    url,
    inLanguage: site.language,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      '@type': 'Organization',
      name: article.author ?? site.organisation.name,
      url: site.url,
    },
    publisher: { '@id': `${site.url}/#organisation` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(article.image ? { image: abs(article.image) } : {}),
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
  };

  if (isReview && article.products?.length) {
    const product = article.products[0];
    return {
      ...base,
      itemReviewed: {
        '@type': 'Product',
        name: product.name,
        ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
      },
      ...(product.rating
        ? {
            reviewRating: {
              '@type': 'Rating',
              ratingValue: product.rating,
              bestRating: 5,
              worstRating: 1,
            },
          }
        : {}),
    };
  }

  return base;
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Roundups and buying guides get an ItemList so Google can show the ranked set. */
export function itemListJsonLd(article: Article) {
  if (!article.products?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: article.title,
    itemListElement: article.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
        ...(product.image ? { image: abs(product.image) } : {}),
      },
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> tag, escaping the XSS vector. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export { abs };

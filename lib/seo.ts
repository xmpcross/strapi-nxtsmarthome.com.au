import { site } from './site';
import { DEFAULT_AUTHOR_SLUG, resolveAuthor } from './authors';
import type { Article } from './content';
import type { TopProduct } from './products';
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
  /*
    Always an Article. A Review with a reviewRating asserts a hands-on verdict,
    and nothing here records that a device was genuinely tested, so a `review`
    type alone must not produce one (CLAUDE.md rule 5, /how-we-test/).
  */
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    name: article.title,
    description: article.description,
    url,
    inLanguage: site.language,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    /*
      The byline as structured data. A named contributor is a Person with their
      own profile URL; the editorial team is an Organization. Typing an editorial
      byline as a Person would assert that an individual wrote it.
    */
    author: (() => {
      const a = resolveAuthor(article.author);
      const isTeam = a.slug === DEFAULT_AUTHOR_SLUG;
      return {
        '@type': isTeam ? 'Organization' : 'Person',
        name: a.name,
        url: `${site.url}/authors/${a.slug}/`,
      };
    })(),
    publisher: { '@id': `${site.url}/#organisation` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(article.image ? { image: abs(article.image) } : {}),
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
  };
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

/**
 * Trim text for a meta description at a sentence or word boundary. A hard
 * `slice(0, 160)` cut category and author descriptions mid-word ("…alarm sy").
 * Prefers the last full sentence that fits; otherwise the last whole word plus
 * an ellipsis.
 */
export function metaDescription(text: string | undefined, max = 155): string | undefined {
  if (!text) return text;
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1);
  const space = cut.lastIndexOf(' ', max - 1);
  return `${cut.slice(0, space > 0 ? space : max - 1).replace(/[\s,;:–—-]+$/, '')}…`;
}

/**
 * Product structured data.
 *
 * Product pages carried only the Organization graph, so 199 pages with verified
 * retailer pricing were invisible to Google's product results — nothing in
 * Search Console's Merchant listings or Product snippets reports.
 *
 * Everything here is measured. Prices come from the verified retailer offers,
 * not the seeded `priceAud`, which the catalogue's own notes describe as never
 * having been a real RRP.
 *
 * No aggregateRating and no Review, even where the page shows a retailer review
 * aggregate. Those reviews are syndicated from other sites, and Google's review
 * snippet policy requires ratings to come from the site's own users — marking
 * them up risks a structured-data manual action. The visible, labelled reviews
 * block (lib/review-sources.ts) is unaffected.
 */
export function productJsonLd(product: TopProduct) {
  const priced = (product.retailers ?? []).filter(
    (r) => typeof r.priceAud === 'number' && r.priceAud > 0,
  );
  const prices = priced.map((r) => r.priceAud as number).sort((a, b) => a - b);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url: `${site.url}/products/${product.slug}/`,
    ...(product.image ? { image: abs(product.image) } : {}),
    ...(product.shortDescription || product.description
      ? { description: (product.shortDescription || product.description || '').slice(0, 5000) }
      : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    ...(product.categoryName ? { category: product.categoryName } : {}),
  };

  if (prices.length) {
    data.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: prices[0],
      highPrice: prices[prices.length - 1],
      offerCount: prices.length,
      availability: 'https://schema.org/InStock',
      offers: priced.map((r) => ({
        '@type': 'Offer',
        priceCurrency: 'AUD',
        price: r.priceAud,
        availability: 'https://schema.org/InStock',
        url: r.url,
        seller: { '@type': 'Organization', name: r.name },
      })),
    };
  }

  return data;
}

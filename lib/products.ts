/**
 * Shared product library.
 *
 * One file per product in `content/products/`, referenced from articles by slug.
 * Also reads top 50 product feeds from `public/data/products.json`.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ProductRef, RetailerLink } from './content';

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products');
const JSON_PRODUCTS_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');

export interface Product extends ProductRef {
  slug: string;
  /** Every string an article might use to name this product. Drives auto-detection. */
  match: string[];
  /** Stable ids so links can be rebuilt and enrichment has somewhere to write. */
  identifiers?: {
    model?: string;
    asin?: string;
    ebayEpid?: string;
    gtin?: string;
  };
  /** Body copy below the front matter — a short editorial note. */
  note?: string;
  categoryKey?: string;
  categorySlug?: string;
  categoryName?: string;
  priceAud?: number;
  reviewCount?: number;
}

export interface TopProductRetailer {
  name: string;
  url: string;
  primary?: boolean;
  priceAud?: number;
  logo?: string;
  /** True when `url` points at the retailer's product page, not a search. */
  deepLink?: boolean;
}

/**
 * A single customer review. Nothing in the current dataset populates this —
 * these fields exist so the reviews section can light up the moment real
 * review data is imported from a retailer feed. Never populate them by hand:
 * an invented review with a name and a "verified purchaser" badge is a fake
 * review, which the ACCC treats as misleading conduct.
 */
export interface ProductReview {
  id: string;
  title?: string;
  body: string;
  rating: number;
  author?: string;
  postedAt?: string;
  badges?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
  images?: string[];
}

export interface TopProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryKey: string;
  categorySlug: string;
  categoryName: string;
  subCategory?: string;
  bestFor?: string;
  rating?: number;
  reviewCount?: number;
  priceAud?: number;
  currency?: string;
  image?: string;
  retailers: TopProductRetailer[];
  pros?: string[];
  cons?: string[];
  updatedAt?: string;
  /** Manufacturer description from the Google Shopping catalogue. */
  description?: string;
  /**
   * Editorial blurb, written in the CMS and synced in by
   * scripts/fetch-product-descriptions.mjs. Preferred over `description`, which
   * is merchant copy and stays as the fallback for anything not yet rewritten.
   */
  shortDescription?: string;
  /**
   * The CMS long description, already converted from markdown to HTML by the
   * same sync. Converted at build time rather than in the component: the panel
   * that renders it is a client component, and the remark stack is server-only.
   */
  cmsDescriptionHtml?: string;
  /** Google Shopping catalogue id — the only external identifier available. */
  googleProductId?: string;
  gtin?: string;
  mpn?: string;
  /** Real specifications from the Google Shopping catalogue. */
  specifications?: Array<{ name: string; value: string }>;
  /** When retailer prices were last verified against the catalogue. */
  pricesCheckedAt?: string;
  /** Star histogram, keyed 1–5. Absent unless a real breakdown is imported. */
  ratingBreakdown?: Record<string, number>;
  /** Share of reviewers who would recommend, 0–100. */
  recommendPercent?: number;
  /** Aggregated themes, e.g. { label: 'Battery Life', count: 32 }. */
  reviewTopics?: Array<{ label: string; count: number }>;
  reviewSummary?: string;
  reviewSummaryIsAi?: boolean;
  customerImages?: string[];
  reviews?: ProductReview[];
  reviewsUrl?: string;
  /** Genuine aggregate from the review catalogue; preferred over `rating`. */
  ratingReal?: number;
  reviewCountReal?: number;
  ratingOriginal?: number;
  reviewCountOriginal?: number;
}

function readProduct(filename: string): Product | null {
  const raw = fs.readFileSync(path.join(PRODUCTS_DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  if (!data?.name) return null;

  const slug = filename.replace(/\.mdx?$/, '');
  const match = Array.isArray(data.match) ? data.match.filter(Boolean) : [];

  return {
    slug,
    name: data.name,
    brand: data.brand,
    bestFor: data.bestFor,
    rating: typeof data.rating === 'number' ? data.rating : undefined,
    pros: Array.isArray(data.pros) ? data.pros : undefined,
    cons: Array.isArray(data.cons) ? data.cons : undefined,
    image: data.image,
    retailers: Array.isArray(data.retailers) ? (data.retailers as RetailerLink[]) : undefined,
    match: Array.from(
      new Set([...match, data.brand ? `${data.brand} ${data.name}` : '', data.name].filter(Boolean)),
    ),
    identifiers: data.identifiers ?? undefined,
    note: content.trim() || undefined,
  };
}

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  if (!fs.existsSync(PRODUCTS_DIR)) {
    cache = [];
    return cache;
  }
  cache = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readProduct)
    .filter((p): p is Product => p !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  return cache;
}

/**
 * One catalogue entry, in the shape an article's ProductBox expects.
 *
 * The catalogue carries a photograph and a `bestFor` line, which is what the box
 * needs; it carries no pros or cons, because those are editorial claims and
 * nobody has written them. The box renders without them.
 *
 * `rating` is deliberately dropped. A star rating in an article reads as "we
 * tested this", and CLAUDE.md is explicit that an unearned rating implies
 * testing that did not happen. The /products/ pages present catalogue ratings in
 * their own context; an inline buy box is not that context.
 */
function fromCatalogue(p: TopProduct): Product {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    match: [p.name],
    bestFor: p.bestFor,
    image: p.image,
    retailers: p.retailers,
    categoryKey: p.categoryKey,
    categorySlug: p.categorySlug,
    categoryName: p.categoryName,
    priceAud: p.priceAud,
  };
}

/**
 * Curated product files and the catalogue behind /products/.
 *
 * content/products/ holds three hand-written entries with real pros and cons.
 * The catalogue holds 200+ with photographs and retailer links. An article that
 * discusses a product on this site should be able to show it, and previously
 * only those three could be embedded — a marker for anything else silently
 * rendered nothing.
 *
 * On a slug collision the curated file supplies the editorial and the catalogue
 * record the photograph and retailers (see below).
 */
export function getProductBySlug(slug: string): Product | undefined {
  const curated = getAllProducts().find((p) => p.slug === slug);
  // An empty listing is not embedded: the box would link to a page with
  // nothing on it (isEmptyListing).
  const listed = getListableTopProducts().find((p) => p.slug === slug || p.id === slug);

  /*
   * A curated file for a catalogue product supplies the editorial (bestFor,
   * pros, cons, note, match) on top of the catalogue record, which keeps the
   * real photograph and the verified retailer prices. Replacing the record
   * wholesale, as a curated-only product does, would swap those for the
   * file's placeholder search links.
   */
  if (curated && listed) {
    const base = fromCatalogue(listed);
    return {
      ...base,
      bestFor: curated.bestFor || base.bestFor,
      pros: curated.pros,
      cons: curated.cons,
      note: curated.note,
      identifiers: curated.identifiers,
      match: Array.from(new Set([...curated.match, ...base.match])),
    };
  }
  if (curated) return curated;
  return listed ? fromCatalogue(listed) : undefined;
}

/** The curated file for a slug, if there is one (content/products/<slug>.md). */
export function getCuratedProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => p !== undefined);
}

let topProductsCache: TopProduct[] | null = null;

/** Slugs in data/disabled-products.json: taken off the site but kept in the catalogue file. */
function disabledSlugs(): Set<string> {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'disabled-products.json'), 'utf8'));
    return new Set((raw.disabled ?? []).map((d: { slug: string } | string) => (typeof d === 'string' ? d : d.slug)));
  } catch {
    return new Set();
  }
}

export function getAllTopProducts(): TopProduct[] {
  if (topProductsCache) return topProductsCache;
  if (!fs.existsSync(JSON_PRODUCTS_PATH)) {
    topProductsCache = [];
    return topProductsCache;
  }
  try {
    const raw = fs.readFileSync(JSON_PRODUCTS_PATH, 'utf8');
    // Disabled products are dropped here, so every listing, the sitemap and the
    // product route (which 404s on a miss) leave them out.
    const disabled = disabledSlugs();
    const parsed = (JSON.parse(raw) as TopProduct[]).filter((p) => !disabled.has(p.slug));
    /*
     * Where a genuine aggregate has been imported from the review catalogue,
     * it wins over the seeded `rating` / `reviewCount`. The seeded values are
     * synthetic — every one falls between 4.5 and 5.0 — and showing "5.0 from
     * 1,008 reviews" above six real reviews averaging 4.5 is both incoherent
     * and an unearned claim under the site's own content rules.
     *
     * Set PRODUCTS_KEEP_SEEDED_RATINGS=1 to fall back to the seeded numbers.
     */
    const keepSeeded = process.env.PRODUCTS_KEEP_SEEDED_RATINGS === '1';
    topProductsCache = parsed.map((product) =>
      !keepSeeded && typeof product.ratingReal === 'number'
        ? {
            ...product,
            rating: product.ratingReal,
            reviewCount: product.reviewCountReal ?? product.reviewCount,
          }
        : product,
    );
  } catch {
    topProductsCache = [];
  }
  return topProductsCache;
}

export function getTopProductsByCategory(categorySlugOrKey: string): TopProduct[] {
  const all = getAllTopProducts();
  return all.filter(
    (p) => p.categorySlug === categorySlugOrKey || p.categoryKey === categorySlugOrKey,
  );
}

export function getTopProductBySlug(slug: string): TopProduct | undefined {
  const all = getAllTopProducts();
  return all.find((p) => p.slug === slug);
}

/*
 * Which product pages carry enough of our own writing to be worth indexing.
 *
 * A /products/<slug>/ page is otherwise a price listing: catalogue specs,
 * retailer prices and syndicated reviews, the same as every other price
 * comparison site. Indexed at scale, that reads to Google and an AdSense
 * reviewer as thin affiliate content (CLAUDE.md rule 3).
 *
 * The rule (AdSense Task 2, 24 Sep 2026). A page is indexable only with ALL of:
 *   - a curated file in content/products/<slug>.md,
 *   - a bestFor line, at least 3 pros and at least 2 cons,
 *   - INDEXABLE_MIN_WORDS words of original editorial text (originalWordCount).
 * Everything else is noindex, follow, out of the sitemap, and labelled as a
 * price listing on the page. Under EMPTY_BELOW_WORDS it is also kept out of
 * every listing (isEmptyListing), so no internal link points at an empty page;
 * its URL still resolves.
 *
 * scripts/audit-thin-content.mjs replicates this rule (it cannot import
 * TypeScript); change both together.
 */
export const INDEXABLE_MIN_WORDS = 300;
export const EMPTY_BELOW_WORDS = 50;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

const stripHtml = (html?: string) =>
  String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

/**
 * Words of our own editorial text on a product page: the curated file's body
 * (HTML comments excluded), bestFor, pros and cons, and the shortDescription
 * blurb. The long description counts only when it is our rewrite
 * (descriptionRewrite.model set): otherwise that field holds the old generated
 * template, which is not original writing. Never counted: the scraped
 * manufacturer description, specifications, retailer data or reviews.
 */
export function originalWordCount(product: TopProduct): number {
  const curated = getAllProducts().find((p) => p.slug === product.slug);
  const note = (curated?.note ?? '').replace(/<!--[\s\S]*?-->/g, ' ');
  const bestFor = curated?.bestFor || product.bestFor || '';
  const pros = curated?.pros ?? product.pros ?? [];
  const cons = curated?.cons ?? product.cons ?? [];
  const rewritten = (product as TopProduct & { descriptionRewrite?: { model?: string } }).descriptionRewrite?.model
    ? stripHtml(product.cmsDescriptionHtml)
    : '';
  return countWords([note, bestFor, ...pros, ...cons, product.shortDescription ?? '', rewritten].join(' '));
}

/** The indexing rule above. */
export function isIndexableProduct(product: TopProduct): boolean {
  const curated = getAllProducts().find((p) => p.slug === product.slug);
  if (!curated) return false;
  if (!(curated.bestFor || product.bestFor)) return false;
  if ((curated.pros ?? product.pros ?? []).length < 3) return false;
  if ((curated.cons ?? product.cons ?? []).length < 2) return false;
  return originalWordCount(product) >= INDEXABLE_MIN_WORDS;
}

/** Under EMPTY_BELOW_WORDS of our own text: kept out of every listing. */
export function isEmptyListing(product: TopProduct): boolean {
  return originalWordCount(product) < EMPTY_BELOW_WORDS;
}

/** Catalogue products whose pages are indexable. */
export function getIndexableTopProducts(): TopProduct[] {
  return getAllTopProducts().filter(isIndexableProduct);
}

/** Catalogue products that may be listed or linked (not empty listings). */
export function getListableTopProducts(): TopProduct[] {
  return getAllTopProducts().filter((p) => !isEmptyListing(p));
}

/**
 * A catalogue product cut down to what a listing card needs.
 *
 * ProductGrid is a client component, so every field it receives is serialised
 * into the page. Passed whole, the /products/ hub shipped all ~2,000 imported
 * customer reviews (AliExpress and Shopee ones included), every spec table and
 * every description: 2.4 MB of HTML for a grid of cards.
 */
export function toListingCard(p: TopProduct): TopProduct {
  const {
    reviews: _reviews,
    specifications: _specifications,
    description: _description,
    shortDescription: _shortDescription,
    cmsDescriptionHtml: _cmsDescriptionHtml,
    ...card
  } = p;
  return card;
}

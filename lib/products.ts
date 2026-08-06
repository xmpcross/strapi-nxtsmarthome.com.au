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
 * Curated product files first, then the catalogue behind /products/.
 *
 * content/products/ holds three hand-written entries with real pros and cons.
 * The catalogue holds 200+ with photographs and retailer links. An article that
 * discusses a product on this site should be able to show it, and previously
 * only those three could be embedded — a marker for anything else silently
 * rendered nothing.
 *
 * Curated wins on a slug collision: a hand-written verdict beats an imported row.
 */
export function getProductBySlug(slug: string): Product | undefined {
  const curated = getAllProducts().find((p) => p.slug === slug);
  if (curated) return curated;

  const listed = getAllTopProducts().find((p) => p.slug === slug || p.id === slug);
  return listed ? fromCatalogue(listed) : undefined;
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => p !== undefined);
}

let topProductsCache: TopProduct[] | null = null;

export function getAllTopProducts(): TopProduct[] {
  if (topProductsCache) return topProductsCache;
  if (!fs.existsSync(JSON_PRODUCTS_PATH)) {
    topProductsCache = [];
    return topProductsCache;
  }
  try {
    const raw = fs.readFileSync(JSON_PRODUCTS_PATH, 'utf8');
    const parsed = JSON.parse(raw) as TopProduct[];
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

/**
 * Shared product library.
 *
 * One file per product in `content/products/`, referenced from articles by slug.
 * This is the single source of truth for a product's verdict: update the file and
 * every article that mentions it changes on the next deploy.
 *
 * Deliberately no price field — see `RetailerLink.price` in content.ts. Prices go
 * stale between deploys and several affiliate programmes require them to be
 * refreshed far more often than this site rebuilds, so the buy buttons say
 * "Check price at X" instead.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ProductRef, RetailerLink } from './content';

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products');

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
    // Always allow the full "Brand Name" and bare name as match strings.
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

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/** Resolve a list of slugs, dropping any that no longer exist. */
export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => p !== undefined);
}

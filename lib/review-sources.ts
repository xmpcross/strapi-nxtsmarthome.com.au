/**
 * Which syndicated customer reviews a product page may show, and the one
 * aggregate score it may show with them.
 *
 * The imported reviews come from Google Shopping's review catalogue, which
 * pools every storefront worldwide: AliExpress, Shopee, Lazada, US and UK
 * chains, brand stores, unknown shops. On an Australian site, a review from
 * shopee.ph or aliexpress.com says nothing a reader here can check. So only
 * reviews from named Australian retailers are kept, and the block is labelled
 * as theirs.
 *
 * The aggregate is counted from those kept reviews alone, never from the
 * catalogue's pooled `ratingReal`: showing a worldwide average under "Customer
 * reviews from JB Hi-Fi" would attribute it to the wrong people. Below
 * MIN_AGGREGATE_REVIEWS it is not shown at all (nor emitted as structured
 * data), since a star score over a handful of reviews reads as a verdict it
 * is not.
 *
 * No fs here: ProductReviews is a client component and imports this.
 */
import type { ProductReview, TopProduct } from './products';

export const MIN_AGGREGATE_REVIEWS = 20;

/** Review source label (a domain, as the catalogue gives it) -> retailer name. */
const AU_REVIEW_RETAILERS: Record<string, string> = {
  'jbhifi.com.au': 'JB Hi-Fi',
  'thegoodguys.com.au': 'The Good Guys',
  'harveynorman.com.au': 'Harvey Norman',
  'bunnings.com.au': 'Bunnings',
  'officeworks.com.au': 'Officeworks',
  'myer.com.au': 'Myer',
  'binglee.com.au': 'Bing Lee',
  'appliancesonline.com.au': 'Appliances Online',
  'betta.com.au': 'Betta',
  'costco.com.au': 'Costco Australia',
  'mitre10.com.au': 'Mitre 10',
  'mwave.com.au': 'Mwave',
  'mightyape.com.au': 'Mighty Ape',
};

function sourceKey(label?: string): string {
  return String(label ?? '')
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
}

/** The retailer name for a review, or null when it is not from a named AU retailer. */
export function auRetailerOf(review: ProductReview): string | null {
  return AU_REVIEW_RETAILERS[sourceKey(review.sourceLabel)] ?? null;
}

export interface RetailerReviews {
  reviews: (ProductReview & { retailer: string })[];
  /** Distinct retailers, most reviews first. */
  retailers: string[];
  /** Counted from `reviews`; null below MIN_AGGREGATE_REVIEWS. */
  aggregate: { rating: number; count: number } | null;
}

export function retailerReviews(product: Pick<TopProduct, 'reviews'>): RetailerReviews {
  const reviews = (product.reviews ?? []).flatMap((r) => {
    const retailer = auRetailerOf(r);
    return retailer ? [{ ...r, retailer }] : [];
  });

  const byRetailer = new Map<string, number>();
  for (const r of reviews) byRetailer.set(r.retailer, (byRetailer.get(r.retailer) ?? 0) + 1);
  const retailers = [...byRetailer.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);

  const rated = reviews.filter((r) => r.rating >= 1 && r.rating <= 5);
  const aggregate =
    rated.length >= MIN_AGGREGATE_REVIEWS
      ? { rating: rated.reduce((sum, r) => sum + r.rating, 0) / rated.length, count: rated.length }
      : null;

  return { reviews, retailers, aggregate };
}

/** "JB Hi-Fi", "JB Hi-Fi and Bunnings", "JB Hi-Fi, Bunnings and Myer". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

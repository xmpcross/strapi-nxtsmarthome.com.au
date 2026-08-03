import { affiliateUrl, affiliateLinkAttrs } from '@/lib/affiliate';
import type { RetailerLink } from '@/lib/content';

/**
 * Both sources of products share this shape: curated files in content/products
 * (lib/products.Product) and inline ProductRef entries in an article's front
 * matter. Typing the union structurally lets one block cover both.
 */
interface Stocked {
  name: string;
  retailers?: RetailerLink[];
}

/**
 * "Affiliate links" — every retailer this article's products are stocked at,
 * listed in full at the foot of the post.
 *
 * The inline buy boxes only surface the primary retailers. This block scans the
 * same product data for the rest of the source retailers, so a reader who wants
 * to price-check elsewhere can, and so no configured link goes unattributed.
 *
 * Every link is decorated through affiliateUrl() with the article slug as the
 * subID, exactly as the buy boxes are, and carries rel="sponsored nofollow".
 *
 * It renders nothing when an article references no products. Listing retailers
 * for products the article does not actually discuss would be inventing
 * commercial relationships that do not exist.
 */
export default function AffiliateLinks({
  products,
  subId,
}: {
  products: Stocked[];
  subId: string;
}) {
  // One entry per unique destination, so a retailer stocking two of the products
  // appears once per product rather than once overall.
  const seen = new Set<string>();
  const links: { label: string; url: string }[] = [];

  for (const product of products) {
    for (const retailer of product.retailers ?? []) {
      if (!retailer?.url || seen.has(retailer.url)) continue;
      seen.add(retailer.url);
      links.push({
        label: `${product.name} at ${retailer.name}`,
        url: affiliateUrl(retailer.url, { subId }),
      });
    }
  }

  if (!links.length) return null;

  return (
    <section className="not-prose mt-12" aria-labelledby="affiliate-links-heading">
      <h2
        id="affiliate-links-heading"
        className="text-base font-bold text-slate-900 dark:text-white"
      >
        Affiliate links
      </h2>

      {/*
        Deliberately not the Amazon Associates boilerplate ("As an Amazon
        Associate, I earn from qualifying purchases"). That sentence is a
        programme-specific attestation and should only appear if the site is
        actually enrolled — this wording is accurate regardless.
      */}
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Some of the links below are affiliate links. If you buy through one we may
        earn a commission, at no extra cost to you. It never changes what we
        recommend — see our{' '}
        <a
          href="/affiliate-disclosure/"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-400"
        >
          affiliate disclosure
        </a>
        .
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              {...affiliateLinkAttrs}
              className="font-bold text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

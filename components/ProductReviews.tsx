'use client';

import { useMemo, useState } from 'react';
import AffiliateLink from './AffiliateLink';
import type { ProductReview, TopProduct } from '@/lib/products';

/**
 * Customer reviews, laid out like the reference PDP: aggregate score, star
 * histogram and review themes across the top, then a grid of review cards and
 * a call to action.
 *
 * Every figure is real or derived from real reviews:
 *   • the score and count come from the Google Shopping review catalogue
 *   • the histogram is counted from the imported reviews' own star ratings
 *   • the "4 stars or higher" figure is counted the same way
 *
 * Blocks the data cannot support stay hidden rather than being invented. In
 * particular the reference's "Customers are saying" AI summary, its sentiment
 * topic chips and its Customer Images strip have no source in this dataset —
 * no review carries an image, and no keyword or summary data is returned — so
 * they do not render. Fabricating them would mean attributing opinions and
 * photos to customers who never supplied them.
 */

const REVIEW_CLAMP = 260;
/* Three fills exactly one row on desktop, matching the reference layout. */
const INITIAL_CARDS = 3;

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="text-base leading-none text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(filled)}
      <span className="text-slate-300 dark:text-slate-600">{'★'.repeat(Math.max(0, 5 - filled))}</span>
    </span>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > REVIEW_CLAMP;
  const body = expanded || !isLong ? review.body : `${review.body.slice(0, REVIEW_CLAMP).trimEnd()}…`;

  return (
    <article className="flex flex-col rounded-[4px] border border-[#e0e0e0] p-4 dark:border-slate-700">
      <Stars rating={review.rating} />

      {review.title ? (
        <h3 className="mt-2 text-base font-bold leading-snug text-[#1d252c] dark:text-white">
          {review.title}
        </h3>
      ) : null}

      {review.sourceLabel ? (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          <li className="rounded-[0.25rem] border border-[#c5cbd5] px-2 py-0.5 text-[0.6875rem] text-[#55555a] dark:border-slate-600 dark:text-slate-400">
            Verified purchase
          </li>
          <li className="rounded-[0.25rem] border border-[#c5cbd5] px-2 py-0.5 text-[0.6875rem] text-[#55555a] dark:border-slate-600 dark:text-slate-400">
            via {review.sourceLabel}
          </li>
        </ul>
      ) : null}

      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#55555a] dark:text-slate-300">
        {body}
      </p>

      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 self-start text-sm text-[#0046be] hover:underline dark:text-blue-400"
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      ) : null}

      {review.postedAt || review.author ? (
        <p className="mt-auto pt-3 text-[0.6875rem] text-[#55555a] dark:text-slate-400">
          {review.postedAt ? `Posted ${review.postedAt}` : ''}
          {review.author ? `${review.postedAt ? ' ' : ''}by ${review.author}` : ''}
        </p>
      ) : null}
    </article>
  );
}

export default function ProductReviews({ product }: { product: TopProduct }) {
  const [showAll, setShowAll] = useState(false);
  const reviews = useMemo(() => product.reviews || [], [product.reviews]);

  // Counted from the imported reviews themselves, so the bars always add up to
  // the reviews actually shown on the page.
  const stats = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let rated = 0;
    for (const r of reviews) {
      const star = Math.round(r.rating);
      if (star >= 1 && star <= 5) {
        counts[star] += 1;
        rated += 1;
      }
    }
    const positive = counts[4] + counts[5];
    return {
      counts,
      rated,
      positivePct: rated ? Math.round((positive / rated) * 100) : null,
    };
  }, [reviews]);

  const rating = product.rating;
  const reviewCount = product.reviewCount;

  if (!rating && !reviews.length) return null;

  const primaryRetailer = product.retailers?.find((r) => r.primary) || product.retailers?.[0];
  const readMoreHref = product.reviewsUrl || primaryRetailer?.url;
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_CARDS);

  return (
    <section className="rounded-[4px] bg-white p-5 dark:bg-slate-800 sm:p-6">
      <h2 className="text-2xl font-bold text-[#1d252c] dark:text-white">Reviews</h2>

      <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Aggregate */}
        {rating ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl leading-none text-amber-500" aria-hidden="true">★</span>
              <span className="text-[2.5rem] font-bold leading-none text-[#1d252c] dark:text-white">
                {rating.toFixed(1)}
              </span>
            </div>
            {reviewCount ? (
              <p className="mt-2 text-sm text-[#55555a] dark:text-slate-400">
                {reviewCount.toLocaleString('en-AU')} review{reviewCount === 1 ? '' : 's'}
              </p>
            ) : null}
            {stats.positivePct !== null && stats.rated > 0 ? (
              /* Deliberately not "would recommend to a friend" — that is a
                 survey question this data does not answer. This is simply the
                 share of imported reviews rated four stars or higher. */
              <p className="mt-4 flex items-start gap-2 text-sm text-[#1d252c] dark:text-slate-200">
                <span className="text-emerald-600" aria-hidden="true">✓</span>
                <span>
                  <strong className="font-bold">{stats.positivePct}%</strong> rated this 4 stars or
                  higher
                </span>
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Histogram */}
        {stats.rated > 0 ? (
          <div className="space-y-1.5 self-start">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.counts[star];
              const pct = stats.rated ? (count / stats.rated) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 shrink-0 text-right text-[#1d252c] dark:text-slate-300">
                    {star}
                  </span>
                  <span className="shrink-0 text-amber-500" aria-hidden="true">★</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-sm bg-[#d5d5d5] dark:bg-slate-600">
                    <span
                      className="block h-full rounded-sm bg-[#0c5adb] dark:bg-blue-500"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-[#55555a] dark:text-slate-400">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Where these reviews come from — replaces the reference's AI summary,
            which this dataset has no source for. */}
        {reviews.length ? (
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base font-bold text-[#1d252c] dark:text-white">
              About these reviews
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#55555a] dark:text-slate-300">
              These are verified customer reviews syndicated from retailer product pages, shown
              with the retailer each one came from. We do not edit them, and we do not write our
              own reviews for this listing.
            </p>
            <p className="mt-3 text-[0.6875rem] leading-relaxed text-[#55555a] dark:text-slate-400">
              Reviews may relate to a different variant, bundle or colour of this product. Check
              the retailer&apos;s page for the exact item before buying.
            </p>
          </div>
        ) : null}
      </div>

      {/* Review cards */}
      {reviews.length ? (
        <>
          <div className="mt-6 grid gap-4 border-t border-[#e0e0e0] pt-5 dark:border-slate-700 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {reviews.length > INITIAL_CARDS ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="rounded-[0.25rem] bg-[#0c5adb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0949ad]"
              >
                {showAll
                  ? 'Show fewer reviews'
                  : `See all ${reviews.length} customer reviews`}
              </button>
            ) : null}

            {readMoreHref && primaryRetailer ? (
              <AffiliateLink
                href={readMoreHref}
                subId={`reviews-cta-${product.slug}`}
                className="text-sm font-semibold text-[#0046be] hover:underline dark:text-blue-400"
              >
                Read more at {primaryRetailer.name} →
              </AffiliateLink>
            ) : null}
          </div>
        </>
      ) : (
        <div className="mt-6 border-t border-[#e0e0e0] pt-5 dark:border-slate-700">
          <p className="text-sm text-[#55555a] dark:text-slate-300">
            {rating
              ? 'The score above is the aggregate rating for this product. We have not published individual customer reviews for this listing yet.'
              : 'No customer reviews have been published for this listing yet.'}
          </p>
          {readMoreHref && primaryRetailer ? (
            <AffiliateLink
              href={readMoreHref}
              subId={`reviews-cta-${product.slug}`}
              className="mt-4 inline-block rounded-[0.25rem] bg-[#0c5adb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0949ad]"
            >
              Read customer reviews at {primaryRetailer.name}
            </AffiliateLink>
          ) : null}
        </div>
      )}
    </section>
  );
}

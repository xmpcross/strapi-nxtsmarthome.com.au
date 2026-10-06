import type { ArticleType } from '@/lib/content';

/**
 * Article types in reading order — decide what to buy, set it up, then
 * background — with the one label each carries on category pages. Filters,
 * list rows and section metadata all use these, so a page speaks one
 * vocabulary.
 */
export const TYPE_ORDER: { type: ArticleType; label: string }[] = [
  { type: 'pillar', label: 'Complete guides' },
  { type: 'buying-guide', label: 'Buying advice' },
  { type: 'comparison', label: 'Comparisons' },
  { type: 'roundup', label: 'Roundups' },
  { type: 'review', label: 'Reviews' },
  { type: 'how-to', label: 'How-to & setup' },
  { type: 'explainer', label: 'Explained' },
];

export const typeLabel = (type: ArticleType) => TYPE_ORDER.find((t) => t.type === type)?.label ?? type;

/** Brand focus ring for links, matching the filter buttons and the site's own controls. */
export const FOCUS =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

/**
 * "5 Oct" for this year, "5 Oct 2025" otherwise, so an older item never reads
 * as this year's. Fixed to UTC so the server render and the browser agree.
 */
export const shortDate = (value: string) => {
  const date = new Date(value);
  const sameYear = date.getUTCFullYear() === new Date().getUTCFullYear();
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
    timeZone: 'UTC',
  });
};

/**
 * Posts, from the CMS.
 *
 * The site read 48 markdown files from content/articles/ until this existed.
 * Strapi held a copy, pushed one way by scripts/strapi-import.mjs, which meant
 * publishing in the CMS changed nothing on the site and the two drifted — 48
 * files against 26 documents by the time anyone checked.
 *
 * Strapi is now the source. The markdown is kept in git as history, not read.
 *
 * Everything here returns the shape lib/content.ts already produced, so the
 * components consuming articles did not have to change.
 */

const BASE = (process.env.STRAPI_URL || 'https://cms.fxnstudio.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN || process.env.STRAPI_API_TOKEN || '';

/**
 * The CMS and the site name article types differently — the CMS vocabulary grew
 * from the shared multi-site schema, the site's from its own routing. Mapped
 * rather than renamed on either side, because both are in use elsewhere.
 */
const POST_TYPE: Record<string, string> = {
  'how-to-guide': 'how-to',
  'product-comparison': 'comparison',
  'product-roundup': 'roundup',
  informative: 'explainer',
  'buying-guide': 'buying-guide',
  pillar: 'pillar',
  review: 'review',
};

export interface StrapiPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  postType?: string;
  publishDate?: string;
  dateModified?: string;
  keyTakeaways?: string;
  coverImage?: { url?: string; alternativeText?: string } | null;
  coverImageUrl?: string;
  coverImageAlt?: string;
  tags?: string[];
  featured?: boolean;
  readingTimeMinutes?: number;
  faq?: { q?: string; question?: string; a?: string; answer?: string }[];
  categories?: { name?: string; slug?: string }[];
  author?: { name?: string; slug?: string } | null;
  publishedAt?: string;
}

export function articleType(postType?: string): string {
  return POST_TYPE[String(postType ?? '')] ?? 'explainer';
}

/** Absolute URL for a Strapi media path, which comes back root-relative. */
export function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return /^https?:\/\//.test(url) ? url : `${BASE}${url}`;
}

/**
 * Every published post.
 *
 * Asks for `status=published` explicitly. Without it Strapi 5 returns the draft
 * version of each document, whose publishedAt is null whether or not it is live
 * — the same trap that made the CMS dashboard report every row as a draft.
 */
/*
 * One value per build process, appended to the CMS query.
 *
 * Next keys its fetch cache on the URL, and that cache survives in .next/cache
 * between builds. A cover uploaded four minutes before a rebuild was therefore
 * served from cache, so the build baked the OLD image and it looked as though
 * the upload had failed. cache: 'no-store' is the obvious fix but output:
 * 'export' refuses to build an uncached fetch, so the URL changes instead.
 */
const BUILD_STAMP = String(Date.now());

export async function listPosts(): Promise<StrapiPost[]> {
  const params = new URLSearchParams({
    _build: BUILD_STAMP,
    status: 'published',
    'pagination[pageSize]': '200',
    'sort[0]': 'publishDate:desc',
    'populate[categories]': 'true',
    'populate[author]': 'true',
    'populate[coverImage]': 'true',
    'populate[faq]': 'true',
  });

  const res = await fetch(`${BASE}/api/nxtsmarthome-posts?${params}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    // Cacheable, because output: 'export' refuses to build an uncached fetch.
    // BUILD_STAMP below is what actually guarantees freshness.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    // Loudly, and without falling back to something that looks like success.
    // A silent empty list here would publish a site with no articles on it.
    throw new Error(`Strapi returned ${res.status} for nxtsmarthome-posts`);
  }

  const json = await res.json();
  const rows = Array.isArray(json?.data) ? json.data : [];
  return rows.map((row: Record<string, unknown>) => (row.attributes ?? row) as StrapiPost);
}

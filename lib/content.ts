import fs from 'node:fs';
import path from 'node:path';
import { articleType, listPosts, mediaUrl, type StrapiPost } from './strapi';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { categories, getCategoryByKey, type Category } from './site';


/** The kinds of article this site publishes. Drives the badge and the JSON-LD type. */
export type ArticleType =
  | 'review'
  | 'comparison'
  | 'buying-guide'
  | 'how-to'
  | 'explainer'
  | 'roundup'
  /** Hub page that links down to a cluster of supporting articles. */
  | 'pillar';

export interface RetailerLink {
  /** Display name, e.g. "JB Hi-Fi". */
  name: string;
  /** Raw merchant URL — the affiliate wrapper is applied at render time. */
  url: string;
  /** Optional price string as seen at time of writing, e.g. "A$249". */
  price?: string;
  /**
   * Render as a full button. Everything else becomes a compact secondary link, so
   * a product stocked at seven retailers does not turn into a wall of buttons.
   */
  primary?: boolean;
}

export interface ProductRef {
  name: string;
  brand?: string;
  /** One-line summary of who it suits. */
  bestFor?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
  retailers?: RetailerLink[];
  image?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: string;
  type: ArticleType;
  date: string;
  updated?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  image?: string;
  imageAlt?: string;
  /** Short takeaway rendered in a callout at the top of the article. */
  keyTakeaway?: string;
  products?: ProductRef[];
  faq?: FaqItem[];
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  /** Rendered HTML body. */
  html: string;
  /** Raw markdown body, used for the search index and excerpts. */
  raw: string;
  readingMinutes: number;
  wordCount: number;
  headings: Heading[];
  categoryMeta: Category | undefined;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Article shape without the rendered body — cheap to pass into list components. */
export type ArticleSummary = Omit<Article, 'html' | 'raw' | 'headings'>;

let cache: Article[] | null = null;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  // Ignore anything inside fenced code blocks so ``` # comments ``` are not treated as headings.
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '');
  const re = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(withoutCode)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

/**
 * A Strapi document, in the shape the rest of this file already produced.
 *
 * The CMS stores the body as markdown, so it goes through exactly the same
 * renderMarkdown pipeline the files did — headings keep their anchors and the
 * article HTML is byte-identical for identical source.
 *
 * Two fields need translating rather than copying. The CMS names article types
 * from the shared multi-site schema (`informative`, `product-roundup`), which
 * articleType() maps to this site's vocabulary. And the CMS relates a post to a
 * category by URL slug, while every component here keys off the category KEY —
 * `security`, not `security-and-cameras`.
 */
function categoryKeyFromSlug(slug?: string): string {
  if (!slug) return '';
  const hit = categories.find((c) => c.slug === slug || c.key === slug);
  return hit?.key ?? '';
}

async function fromStrapi(post: StrapiPost): Promise<Article | null> {
  if (!post?.slug || !post.title) return null;

  const body = String(post.content ?? '');
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const categoryKey = categoryKeyFromSlug(post.categories?.[0]?.slug);

  return {
    title: post.title,
    description: post.excerpt ?? '',
    category: categoryKey,
    type: articleType(post.postType) as Article['type'],
    date: post.publishDate ?? post.publishedAt ?? '',
    updated: post.dateModified || undefined,
    /*
     * The CMS author when the post has one, by slug so resolveAuthor matches a
     * file in content/authors/ and the byline links to a real profile. Posts
     * with no author set still fall back to the editorial byline.
     */
    author: post.author?.slug ?? post.author?.name ?? 'NXT Smart Home',
    tags: Array.isArray(post.tags) ? post.tags : [],
    featured: Boolean(post.featured),
    /*
     * The uploaded media wins over coverImageUrl. Content Manager's image
     * picker writes the media relation, so reading only the string field meant
     * an upload changed nothing — and on at least one post coverImageUrl held a
     * URL pointing back at this site's own /covers/ file, so the upload lost to
     * the very asset it was meant to replace.
     */
    image: mediaUrl(post.coverImage?.url) || post.coverImageUrl || undefined,
    imageAlt: post.coverImageAlt || post.coverImage?.alternativeText || undefined,
    keyTakeaway: post.keyTakeaways || undefined,
    faq: (post.faq ?? [])
      .map((f) => ({ q: f.q ?? f.question ?? '', a: f.a ?? f.answer ?? '' }))
      .filter((f) => f.q && f.a),
    slug: post.slug,
    html: await renderMarkdown(body),
    raw: body,
    wordCount: words,
    // The CMS carries its own estimate; fall back to the same 225wpm the files used.
    readingMinutes: post.readingTimeMinutes || Math.max(1, Math.round(words / 225)),
    headings: extractHeadings(body),
    categoryMeta: getCategoryByKey(categoryKey),
  } as Article;
}

/** All published articles, newest first. Cached for the duration of the build. */
export async function getAllArticles(): Promise<Article[]> {
  if (cache) return cache;

  const posts = await listPosts();
  const built = await Promise.all(posts.map(fromStrapi));

  cache = built
    .filter((a): a is Article => a !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return cache;
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const all = await getAllArticles();
  return all.find((a) => a.slug === slug);
}

export async function getArticlesByCategory(categoryKey: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === categoryKey);
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => (a.tags ?? []).some((t) => slugify(t) === tag));
}

export async function getAllTags(): Promise<{ tag: string; slug: string; count: number }[]> {
  const all = await getAllArticles();
  const counts = new Map<string, { tag: string; count: number }>();
  for (const article of all) {
    for (const tag of article.tags ?? []) {
      const key = slugify(tag);
      const existing = counts.get(key);
      if (existing) existing.count += 1;
      else counts.set(key, { tag, count: 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getFeaturedArticles(limit = 4): Promise<Article[]> {
  const all = await getAllArticles();
  const featured = all.filter((a) => a.featured);
  // Top up with the newest articles if not enough are flagged featured.
  const rest = all.filter((a) => !a.featured);
  return [...featured, ...rest].slice(0, limit);
}

/**
 * Related articles, ranked by shared tags then same category.
 * Falls back to recent articles so the slot is never empty on a young site.
 */
export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const all = await getAllArticles();
  const others = all.filter((a) => a.slug !== article.slug);
  const tags = new Set((article.tags ?? []).map(slugify));

  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.category === article.category) score += 3;
    for (const tag of candidate.tags ?? []) {
      if (tags.has(slugify(tag))) score += 2;
    }
    return { candidate, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || +new Date(b.candidate.date) - +new Date(a.candidate.date))
    .slice(0, limit)
    .map((s) => s.candidate);
}

/**
 * Related articles with a real relevance figure attached.
 *
 * The percentage is derived from the same signals used to rank them — same
 * category scores 3, each shared tag scores 2 — expressed against the best score
 * in the set. It is a genuine measure of how related two articles are, not a
 * decorative "100% match" badge.
 */
export async function getRelatedWithScores(
  article: Article,
  limit = 3,
): Promise<{ article: Article; match: number }[]> {
  const all = await getAllArticles();
  const others = all.filter((a) => a.slug !== article.slug);
  const tags = new Set((article.tags ?? []).map(slugify));

  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.category === article.category) score += 3;
    for (const tag of candidate.tags ?? []) {
      if (tags.has(slugify(tag))) score += 2;
    }
    return { article: candidate, score };
  });

  const top = scored
    .sort((a, b) => b.score - a.score || +new Date(b.article.date) - +new Date(a.article.date))
    .slice(0, limit);

  const best = Math.max(1, ...top.map((t) => t.score));
  return top.map((t) => ({
    article: t.article,
    // Floor at 40% so a weak-but-shown suggestion is not advertised as 0%.
    match: Math.max(40, Math.round((t.score / best) * 100)),
  }));
}

/** Strip markdown down to plain text — used for search snippets. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Shape of one entry in public/search-index.json.
 * The file itself is generated by scripts/build-search-index.mjs during `prebuild`.
 */
export interface SearchDoc {
  categoryMeta?: { slug: string };
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  type: string;
  date: string;
  tags: string[];
  body: string;
  /* Emitted by scripts/build-search-index.mjs but previously undeclared, so
     anything reading them failed to typecheck. */
  cover?: string;
  readingMinutes?: number;
}

/**
 * Cover image for an article. Falls back to the generated branded cover in
 * public/covers/ — the site has no photography, and a magazine layout with empty
 * image slots looks broken. Replace with a real photo by setting `image` in the
 * article front matter; that always wins.
 */
export { articleHref } from './urls';

/**
 * First existing file from `candidates`, cache-busted by its own content.
 *
 * Covers keep the same filename when regenerated and nginx serves images with
 * max-age=2592000 — without the ?v= hash a regenerated cover stays invisible in
 * browsers and at the CDN edge for up to 30 days.
 */
function assetUrl(candidates: string[], fallback: string): string {
  for (const rel of candidates) {
    try {
      const { size, mtimeMs } = fs.statSync(path.join(process.cwd(), 'public', rel));
      const v = (size ^ Math.round(mtimeMs)).toString(36).slice(-6);
      return `/${rel}?v=${v}`;
    } catch {
      /* try the next one */
    }
  }
  return fallback;
}

/**
 * 500x500 product-centred crop of the same artwork, written alongside the wide
 * cover by scripts/compose-cover.py.
 *
 * Used wherever the cover is shown small and square. The wide cover has the
 * headline baked into its left half, so cropping it to a thumbnail shows a slab
 * of unreadable type; this variant is centred on the product instead.
 *
 * Falls back to the wide cover when no square exists yet, so an article without
 * one still renders.
 */
export function squareCoverFor(article: { slug: string; image?: string }): string {
  if (article.image) return article.image;
  return assetUrl(
    [`covers/square/${article.slug}.webp`, `covers/square/${article.slug}.png`],
    coverFor(article),
  );
}

export function coverFor(article: { slug: string; image?: string }): string {
  if (article.image) return article.image;
  // WebP is what the composer writes now; the PNG entry keeps any cover that has
  // not been regenerated yet working.
  return assetUrl(
    [`covers/${article.slug}.webp`, `covers/${article.slug}.png`],
    `/covers/${article.slug}.png`,
  );
}

/**
 * Hero banner for a category, written by scripts/generate-category-hero.mjs.
 *
 * Returns null when that category has no banner yet, so a page can fall back to
 * its plain text header rather than rendering a broken image. Banners are
 * generated one category at a time and cost credits, so "not generated yet" is
 * the normal state for most of them, not an error.
 *
 * `kind` picks the set: 'product' for /products/category/<slug>/, 'post' for
 * /categories/<slug>/. The two are different artwork on purpose.
 */
export function categoryHeroFor(slug: string, kind: 'post' | 'product'): string | null {
  return assetUrl([`heroes/${kind}/${slug}.webp`], '') || null;
}

export function categoriesWithCounts(articles: Article[]) {
  return categories.map((category) => ({
    ...category,
    count: articles.filter((a) => a.category === category.key).length,
  }));
}

export const typeLabels: Record<ArticleType, string> = {
  review: 'Review',
  comparison: 'Comparison',
  'buying-guide': 'Buying Guide',
  'how-to': 'How-To',
  explainer: 'Explainer',
  roundup: 'Roundup',
  pillar: 'Complete Guide',
};

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export { slugify };

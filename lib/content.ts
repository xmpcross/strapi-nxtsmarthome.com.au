import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { categories, getCategoryByKey, type Category } from './site';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

/** The kinds of article this site publishes. Drives the badge and the JSON-LD type. */
export type ArticleType =
  | 'review'
  | 'comparison'
  | 'buying-guide'
  | 'how-to'
  | 'explainer'
  | 'roundup';

export interface RetailerLink {
  /** Display name, e.g. "JB Hi-Fi". */
  name: string;
  /** Raw merchant URL — the affiliate wrapper is applied at render time. */
  url: string;
  /** Optional price string as seen at time of writing, e.g. "A$249". */
  price?: string;
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

async function loadArticle(filename: string): Promise<Article | null> {
  const fullPath = path.join(ARTICLES_DIR, filename);
  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);
  const fm = data as ArticleFrontmatter;

  if (fm.draft) return null;

  if (!fm.title || !fm.description || !fm.category) {
    throw new Error(
      `content/articles/${filename}: missing required frontmatter (title, description, category)`,
    );
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    ...fm,
    slug: filename.replace(/\.mdx?$/, ''),
    html: await renderMarkdown(content),
    raw: content,
    wordCount: words,
    readingMinutes: Math.max(1, Math.round(words / 225)),
    headings: extractHeadings(content),
    categoryMeta: getCategoryByKey(fm.category),
    author: fm.author ?? 'NXT Smart Home',
    tags: fm.tags ?? [],
  };
}

/** All published articles, newest first. Cached for the duration of the build. */
export async function getAllArticles(): Promise<Article[]> {
  if (cache) return cache;

  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.mdx?$/.test(f));
  const loaded = await Promise.all(files.map(loadArticle));

  cache = loaded
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
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  type: string;
  date: string;
  tags: string[];
  body: string;
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

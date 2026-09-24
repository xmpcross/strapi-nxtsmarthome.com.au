import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Bylines.
 *
 * One file per author in `content/authors/`, resolved from an article's
 * `author:` front matter. The default is the editorial team, and it is a real
 * identity with a real profile rather than an invented person: an article that
 * names nobody was produced by the team, and the byline says exactly that.
 *
 * Adding a named contributor is two steps — drop a file in `content/authors/`,
 * then set `author: <slug>` on the articles they wrote. Nothing else changes.
 */

export interface AuthorLink {
  label: string;
  href: string;
}

export interface Author {
  slug: string;
  name: string;
  role?: string;
  /** Fallback avatar when there is no photograph. Two or three characters. */
  initials: string;
  /** Path under public/, or '' for an initials avatar. */
  avatar?: string;
  bio?: string;
  links?: AuthorLink[];
  /** Body copy below the front matter — a longer profile for the author page. */
  note?: string;
}

const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');

export const DEFAULT_AUTHOR_SLUG = 'nxt-smart-home-editorial';

/*
 * One person, one profile. Strapi's author for Kritin Curtis has the slug
 * `k-curtis` and the name "K Curtis", while this site had already published
 * /authors/kritin-curtis/. Both profiles were live, splitting one person's
 * articles across two pages. The site keeps kritin-curtis: an alias resolves
 * the CMS slug to it (posts in Strapi stay linked to k-curtis, so the AI
 * writer needs no change), scripts/fetch-authors.mjs writes the CMS profile
 * under the kept slug, and /authors/k-curtis/ 301s to it.
 */
export const AUTHOR_ALIASES: Record<string, string> = {
  'k-curtis': 'kritin-curtis',
};

/*
 * A role still holding the CMS template text ("What they cover, e.g. Security
 * and cameras") renders as no role line at all rather than as placeholder copy.
 */
function cleanRole(role: unknown): string | undefined {
  const value = String(role ?? '').trim();
  if (!value || /what they cover|e\.g\./i.test(value)) return undefined;
  return value;
}

let cache: Author[] | null = null;

/** Initials from a name, for an avatar with no photograph behind it. */
function initialsFor(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function getAllAuthors(): Author[] {
  if (cache) return cache;
  if (!fs.existsSync(AUTHORS_DIR)) {
    cache = [];
    return cache;
  }
  cache = fs
    .readdirSync(AUTHORS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f): Author | null => {
      const { data, content } = matter(fs.readFileSync(path.join(AUTHORS_DIR, f), 'utf8'));
      if (!data?.name) return null;
      const slug = String(data.slug ?? f.replace(/\.mdx?$/, ''));
      // A stale file under an aliased slug would bring the duplicate back.
      if (AUTHOR_ALIASES[slug]) return null;
      return {
        slug,
        name: String(data.name),
        role: cleanRole(data.role),
        initials: String(data.initials ?? initialsFor(String(data.name))),
        avatar: data.avatar ? String(data.avatar) : undefined,
        bio: data.bio ? String(data.bio) : undefined,
        links: Array.isArray(data.links) ? (data.links as AuthorLink[]) : undefined,
        note: content.trim() || undefined,
      } satisfies Author;
    })
    .filter((a): a is Author => a !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
  return cache;
}

/**
 * The author for an article's `author:` value.
 *
 * Accepts a slug or a display name, so an article that predates this system and
 * carries `author: 'NXT Smart Home'` still resolves. Anything unrecognised falls
 * back to the editorial identity rather than rendering a byline for someone who
 * does not exist.
 */
export function resolveAuthor(value?: string): Author {
  const authors = getAllAuthors();
  const fallback: Author = {
    slug: DEFAULT_AUTHOR_SLUG,
    name: 'NXT Smart Home Editorial',
    role: 'Editorial team',
    initials: 'NXT',
  };
  if (!authors.length) return fallback;

  const raw = (value ?? '').trim().toLowerCase();
  const wanted = AUTHOR_ALIASES[raw] ?? raw;
  const match =
    authors.find((a) => a.slug.toLowerCase() === wanted) ??
    authors.find((a) => a.name.toLowerCase() === wanted);

  return match ?? authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG) ?? fallback;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAllAuthors().find((a) => a.slug === slug);
}

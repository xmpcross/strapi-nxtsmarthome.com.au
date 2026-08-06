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
      return {
        slug,
        name: String(data.name),
        role: data.role ? String(data.role) : undefined,
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

  const wanted = (value ?? '').trim().toLowerCase();
  const match =
    authors.find((a) => a.slug.toLowerCase() === wanted) ??
    authors.find((a) => a.name.toLowerCase() === wanted);

  return match ?? authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG) ?? fallback;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAllAuthors().find((a) => a.slug === slug);
}

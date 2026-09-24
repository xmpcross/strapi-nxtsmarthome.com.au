/**
 * Ncmaz author shape, backed by the site's author profiles (lib/authors.ts).
 */
import { getAllArticles } from '@/lib/content'
import { getAllAuthors, getAuthorBySlug, resolveAuthor, type Author } from '@/lib/authors'
import type { TImage } from './types'

export interface TAuthor {
  id: string
  name: string
  handle: string
  career: string
  description: string
  count: number
  joinedDate: string
  reviewCount: number
  rating: number
  initials: string
  avatar: TImage
  cover: TImage
}

const DEFAULT_COVER = '/og-default.png'

export function toTAuthor(author: Author, count = 0): TAuthor {
  return {
    id: `author-${author.slug}`,
    name: author.name,
    handle: author.slug,
    career: author.role ?? 'Contributor',
    description: author.bio ?? '',
    count,
    joinedDate: '',
    reviewCount: 0,
    rating: 0,
    initials: author.initials,
    avatar: { src: author.avatar ?? '', alt: author.name, width: 400, height: 400 },
    cover: { src: DEFAULT_COVER, alt: author.name, width: 1920, height: 1080 },
  }
}

export async function getAuthors(): Promise<TAuthor[]> {
  const articles = await getAllArticles()
  return getAllAuthors().map((a) =>
    toTAuthor(a, articles.filter((p) => resolveAuthor(p.author).slug === a.slug).length),
  )
}

export async function getAuthorByHandle(handle: string): Promise<TAuthor | undefined> {
  const author = getAuthorBySlug(handle)
  if (!author) return undefined
  const articles = await getAllArticles()
  return toTAuthor(author, articles.filter((p) => resolveAuthor(p.author).slug === author.slug).length)
}

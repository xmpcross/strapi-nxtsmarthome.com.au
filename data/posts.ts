/**
 * Ncmaz post shapes, backed by the Strapi articles in lib/content.ts.
 *
 * `handle` is the article's canonical path without the leading slash
 * ("lighting/some-article/"). Every Ncmaz card links with `/${handle}`, so
 * cards land on the real article URL without per-component changes.
 */
import { articleHref, coverFor, getAllArticles, getArticle, type Article } from '@/lib/content'
import { resolveAuthor } from '@/lib/authors'
import { categoryColor, type TBadgeColor } from './categories'
import type { TImage } from './types'

export interface TPostAuthor {
  id: string
  name: string
  handle: string
  avatar: TImage
  description?: string
}

export interface TPostCategory {
  id: string
  name: string
  handle: string
  color: TBadgeColor
}

export interface TPost {
  id: string
  slug: string
  featuredImage: TImage
  title: string
  handle: string
  excerpt: string
  date: string
  readingTime: number
  commentCount: number
  viewCount: number
  bookmarkCount: number
  bookmarked: boolean
  likeCount: number
  liked: boolean
  postType: 'standard' | 'audio' | 'video' | 'gallery'
  status: string
  author: TPostAuthor
  categories: TPostCategory[]
  videoUrl?: string
  audioUrl?: string
  galleryImgs?: string[]
  tags?: { id: string; name: string; handle: string; color?: TBadgeColor }[]
}

export type TPostDetail = TPost & { content: string; article: Article }
export type TComment = never

export function toTPost(article: Article): TPost {
  const author = resolveAuthor(article.author)
  const href = articleHref(article)
  const cat = article.categoryMeta
  return {
    id: `post-${article.slug}`,
    slug: article.slug,
    featuredImage: { src: coverFor(article), alt: article.imageAlt ?? article.title, width: 1240, height: 700 },
    title: article.title,
    handle: href.replace(/^\//, ''),
    excerpt: article.description,
    date: article.date,
    readingTime: article.readingMinutes,
    commentCount: 0,
    viewCount: 0,
    bookmarkCount: 0,
    bookmarked: false,
    likeCount: 0,
    liked: false,
    postType: 'standard',
    status: 'published',
    author: {
      id: `author-${author.slug}`,
      name: author.name,
      handle: author.slug,
      avatar: { src: author.avatar ?? '', alt: author.name, width: 200, height: 200 },
      description: author.bio,
    },
    categories: cat ? [{ id: `category-${cat.key}`, name: cat.name, handle: cat.slug, color: categoryColor(cat.key) }] : [],
    tags: (article.tags ?? []).map((t) => ({ id: `tag-${t}`, name: t, handle: t })),
  }
}

export async function getAllPosts(): Promise<TPost[]> {
  return (await getAllArticles()).map(toTPost)
}

export async function getPostsDefault(): Promise<TPost[]> {
  return getAllPosts()
}

// The site has no audio, video or gallery posts. Kept so template sections compile.
export async function getPostsAudio(): Promise<TPost[]> {
  return []
}
export async function getPostsVideo(): Promise<TPost[]> {
  return []
}
export async function getPostsGallery(): Promise<TPost[]> {
  return []
}

export async function getPostBySlug(slug: string): Promise<TPostDetail | undefined> {
  const article = await getArticle(slug)
  if (!article) return undefined
  return { ...toTPost(article), content: article.html, article }
}

export async function getCommentsByPostId(_postId: string): Promise<TComment[]> {
  void _postId
  return []
}

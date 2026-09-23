/**
 * Ncmaz category/tag shapes, backed by lib/site.ts categories and article tags.
 */
import { categoryHeroFor, coverFor, getAllArticles, getAllTags } from '@/lib/content'
import { categories, getCategory, type Category } from '@/lib/site'
import type { TPost } from './posts'
import { toTPost } from './posts'
import type { TImage } from './types'

/** Colours the shared Badge supports; 'gray' is kept only because template cards compare against it. */
export type TBadgeColor = Exclude<TBadgeColorAll, 'gray'>
type TBadgeColorAll =
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue'
  | 'indigo' | 'violet' | 'rose' | 'zinc' | 'gray'

const COLORS: Record<string, TBadgeColor> = {
  security: 'red',
  lighting: 'yellow',
  energy: 'green',
  entertainment: 'violet',
  climate: 'sky',
  'hubs-and-platforms': 'indigo',
  'robot-vacuums': 'teal',
  'setup-guides': 'blue',
  'buying-guides': 'orange',
}

export interface TCategory {
  id: string
  name: string
  handle: string
  description: string
  color: TBadgeColor
  count: number
  date: string
  thumbnail: TImage
  posts?: TPost[]
}

export interface TTag {
  id: string
  name: string
  handle: string
  description: string
  count: number
  color?: TBadgeColor
  posts?: TPost[]
}

export function categoryColor(key: string): TBadgeColor {
  return COLORS[key] ?? 'indigo'
}

async function toTCategory(category: Category): Promise<TCategory> {
  const articles = (await getAllArticles()).filter((a) => a.category === category.key)
  // Newest article's cover: the category banners carry baked-in text that
  // crops badly in the template's square cards.
  const thumb = articles[0] ? coverFor(articles[0]) : (categoryHeroFor(category.slug, 'post') ?? '/og-default.png')
  return {
    id: `category-${category.key}`,
    name: category.name,
    handle: category.slug,
    description: category.blurb,
    color: categoryColor(category.key),
    count: articles.length,
    date: articles[0]?.date ?? '',
    thumbnail: { src: thumb, alt: category.name, width: 1240, height: 700 },
  }
}

export async function getCategories(): Promise<TCategory[]> {
  return Promise.all(categories.map(toTCategory))
}

export async function getCategoryByHandle(handle: string): Promise<(TCategory & { posts: TPost[] }) | undefined> {
  const category = getCategory(handle)
  if (!category) return undefined
  const articles = (await getAllArticles()).filter((a) => a.category === category.key)
  return { ...(await toTCategory(category)), posts: articles.map(toTPost) }
}

export async function getCategoriesWithPosts(): Promise<TCategory[]> {
  const all = await getAllArticles()
  const list = await getCategories()
  return list.map((c) => ({
    ...c,
    posts: all.filter((a) => a.categoryMeta?.slug === c.handle).map(toTPost),
  }))
}

export async function getTags(): Promise<TTag[]> {
  return (await getAllTags()).map((t) => ({
    id: `tag-${t.slug}`,
    name: t.tag,
    handle: t.tag,
    description: '',
    count: t.count,
    color: 'zinc' as TBadgeColor,
  }))
}

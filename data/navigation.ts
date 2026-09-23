/**
 * Header navigation in the Ncmaz shape, built from the CMS-backed nav cache
 * (lib/nav.ts) so Strapi stays the source of the menu.
 */
import { getNav } from '@/lib/nav'

export type TNavigationItem = Partial<{
  id: string
  href: string
  name: string
  type?: 'dropdown' | 'mega-menu'
  isNew?: boolean
  children?: TNavigationItem[]
}>

export async function getNavigation(): Promise<TNavigationItem[]> {
  const nav = getNav()
  const items = (links: { href: string; label: string }[], prefix: string): TNavigationItem[] =>
    links.map((l, i) => ({ id: `${prefix}-${i}`, href: l.href, name: l.label }))
  return [
    { id: 'home', href: '/', name: 'Home' },
    {
      id: 'topics',
      href: '/categories/',
      name: 'Topics',
      type: 'dropdown',
      children: items(nav.topicNavLinks, 'topics'),
    },
    {
      id: 'guides',
      href: '/articles/',
      name: 'Guides',
      type: 'dropdown',
      children: items(nav.guideNavLinks, 'guides'),
    },
    {
      id: 'products',
      href: nav.productsNavLink.href,
      name: 'Products',
      type: 'dropdown',
      children: [
        { id: 'products-all', href: nav.productsNavLink.href, name: nav.productsNavLink.label },
        ...items(nav.productCategoryNavLinks, 'products'),
      ],
    },
    { id: 'latest', href: nav.latestNavLink.href, name: nav.latestNavLink.label },
  ]
}

export async function getNavMegaMenu(): Promise<TNavigationItem> {
  return {}
}

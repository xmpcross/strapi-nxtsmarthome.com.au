import { CustomLink } from '@/data/types'
import { categories, site } from '@/lib/site'
import Logo from '@/shared/Logo'
import Link from 'next/link'
import React from 'react'
import CookieSettingsLink from '../CookieSettingsLink'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: 'topics',
    title: 'Topics',
    menus: categories.slice(0, 5).map((c) => ({ href: `/categories/${c.slug}/`, label: c.name })),
  },
  {
    id: 'more',
    title: 'More topics',
    menus: [
      ...categories.slice(5).map((c) => ({ href: `/categories/${c.slug}/`, label: c.name })),
      { href: '/categories/', label: 'All topics' },
    ],
  },
  {
    id: 'site',
    title: 'NXT Smart Home',
    menus: [
      { href: '/about/', label: 'About' },
      { href: '/how-we-test/', label: 'How we test' },
      { href: '/products/', label: 'Products' },
      { href: '/contact/', label: 'Contact' },
      { href: '/sitemap/', label: 'Sitemap' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    menus: [
      { href: '/affiliate-disclosure/', label: 'Affiliate Disclosure' },
      { href: '/privacy/', label: 'Privacy Policy' },
      { href: '/terms/', label: 'Terms and Conditions' },
      { href: '/cookies/', label: 'Cookie Information' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => (
    <div key={index} className="text-sm">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
      <ul className="mt-5 space-y-4">
        {menu.menus.map((item, i) => (
          <li key={i}>
            <Link
              className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {menu.id === 'legal' && (
          <li>
            <CookieSettingsLink />
          </li>
        )}
      </ul>
    </div>
  )

  return (
    <footer className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-24 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-1">
          <Logo size="size-10" />
          <p className="max-w-xs text-sm text-neutral-600 dark:text-neutral-400">{site.tagline}</p>
          {site.social.facebook && (
            <a
              href={site.social.facebook}
              rel="noopener"
              target="_blank"
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 dark:text-neutral-300"
            >
              Facebook ↗
            </a>
          )}
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="container mt-12 border-t border-neutral-200 pt-8 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
        © {new Date().getFullYear()} {site.name}. Independent Australian smart home guides. Some links earn us a
        commission — see our{' '}
        <Link href="/affiliate-disclosure/" className="underline">
          affiliate disclosure
        </Link>
        .
      </div>
    </footer>
  )
}

export default Footer

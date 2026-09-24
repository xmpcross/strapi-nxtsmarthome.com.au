import { CustomLink } from '@/data/types'
import { categories, site } from '@/lib/site'
import Logo from '@/shared/Logo'
import Link from 'next/link'
import React from 'react'
import CookieSettingsLink from '../CookieSettingsLink'
import { ADS_ENABLED } from '@/lib/ads'

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
    title: 'The site',
    menus: [
      { href: '/articles/', label: 'All articles' },
      { href: '/products/', label: 'Products' },
      { href: '/about/', label: 'About us' },
      { href: '/how-we-test/', label: 'How we research' },
      { href: '/contact/', label: 'Contact' },
      { href: '/sitemap/', label: 'Sitemap' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    menus: [
      { href: '/affiliate-disclosure/', label: 'Affiliate disclosure' },
      { href: '/privacy/', label: 'Privacy policy' },
      { href: '/terms/', label: 'Terms and conditions' },
      { href: '/cookies/', label: 'Cookie information' },
    ],
  },
]

const linkClass =
  'text-neutral-600 transition-colors hover:text-primary-600 dark:text-neutral-400 dark:hover:text-white'

/**
 * Site footer.
 *
 * Brand block (logo, what the site is, how to reach us) beside four link
 * columns; then a disclosure strip, because an affiliate-and-advertising site
 * should say so where every page ends; then the bottom bar naming the business
 * that operates the site (site.organisation.operator, the same name /about/,
 * /contact/ and /privacy/ use).
 */
const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="nc-Footer relative border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container grid gap-12 py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3fr)] lg:gap-16 lg:py-20">
        {/* Brand */}
        <div className="flex max-w-sm flex-col gap-5">
          <Logo size="size-10" alwaysShowWordmark />
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Research-based smart home guides for Australian homes: 240V wiring, AS/NZS rules,
            renters, local retailers and Australian Consumer Law.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Contact us
            </Link>
            <a
              href={`mailto:${site.organisation.email}`}
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-white"
            >
              {site.organisation.email}
            </a>
          </div>
          {site.social.facebook && (
            <a
              href={site.social.facebook}
              rel="noopener"
              target="_blank"
              aria-label={`${site.name} on Facebook`}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 transition hover:border-primary-600 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
              </svg>
            </a>
          )}
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {widgetMenus.map((menu) => (
            <div key={menu.id} className="text-sm">
              <h2 className="font-logo text-[0.8125rem] font-bold tracking-wider text-neutral-900 uppercase dark:text-white">
                {menu.title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {menu.menus.map((item) => (
                  <li key={item.href}>
                    <Link className={linkClass} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {menu.id === 'legal' && (
                  <li>
                    <CookieSettingsLink className={`${linkClass} cursor-pointer`} />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Disclosure strip */}
      <div className="container">
        <div className="rounded-lg border border-neutral-200 bg-white px-5 py-4 text-xs leading-relaxed text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
          <strong className="font-semibold text-neutral-800 dark:text-neutral-200">Independent and reader-supported.</strong>{' '}
          {ADS_ENABLED
            ? 'Some links to retailers are affiliate links, and the site shows advertising; both are labelled and neither decides what we write.'
            : 'Some links to retailers are affiliate links; they are labelled and never decide what we write.'}{' '}
          See our{' '}
          <Link href="/affiliate-disclosure/" className="underline underline-offset-2 hover:text-primary-600">
            affiliate disclosure
          </Link>
          . Our guides are general information, not electrical or legal advice.
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container flex flex-col gap-3 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:text-neutral-500">
        <p>
          © {year} {site.name}. Operated by {site.organisation.operator}.
        </p>
        <a href="#" className="hover:text-primary-600 dark:hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}

export default Footer

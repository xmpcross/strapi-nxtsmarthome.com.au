import BrandMark from '@/components/BrandMark'
import { site } from '@/lib/site'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  /** Size of the mark tile. */
  size?: string
  /** Show the wordmark on phones too (the header hides it below sm to save room). */
  alwaysShowWordmark?: boolean
}

/**
 * Site logo: the house-and-signal mark on a brand tile, then the wordmark.
 *
 * The wordmark is Outfit at 700 (font-logo, self-hosted in app/fonts/outfit),
 * with "NXT" in the brand colour and "Smart Home" in the text colour, so the
 * name reads as one tight lockup rather than a heading beside an icon. The
 * mark is white on the brand tile in both themes, so its knock-out is drawn in
 * the tile colour.
 */
const Logo: React.FC<Props> = ({ className, size = 'size-9 sm:size-10', alwaysShowWordmark = false }) => {
  return (
    <Link href="/" className={clsx('group inline-flex shrink-0 items-center gap-2.5', className)} aria-label={site.name}>
      <span
        className={clsx(
          size,
          'flex shrink-0 items-center justify-center rounded-lg bg-primary-600 shadow-sm transition group-hover:bg-primary-700 dark:bg-primary-500'
        )}
      >
        <BrandMark
          className="size-[68%] text-white"
          cutClassName="fill-primary-600 stroke-primary-600 group-hover:fill-primary-700 group-hover:stroke-primary-700 dark:fill-primary-500 dark:stroke-primary-500"
        />
      </span>
      <span
        className={clsx(
          'font-logo text-[1.35rem] leading-none font-bold tracking-[-0.02em] text-neutral-900 dark:text-white',
          alwaysShowWordmark ? 'block' : 'hidden sm:block'
        )}
      >
        <span className="text-primary-600 dark:text-primary-400">NXT</span> Smart Home
      </span>
    </Link>
  )
}

export default Logo

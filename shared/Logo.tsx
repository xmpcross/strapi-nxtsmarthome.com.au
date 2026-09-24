import BrandMark from '@/components/BrandMark'
import { site } from '@/lib/site'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

export interface LogoProps {
  className?: string
  /** Size class for the mark icon (e.g. 'size-9 sm:size-10', 'size-10'). */
  size?: string
  /** Show the wordmark on phones too (the header hides it below sm to save room). */
  alwaysShowWordmark?: boolean
  /** Force light or dark mode rendering, or auto (default) which tracks site theme. */
  theme?: 'auto' | 'light' | 'dark'
  /** Slogan text underneath NXT Smart Home. Defaults to "AUSTRALIA'S SMART HOME GUIDE". */
  slogan?: string
  /** Show or hide the slogan. Defaults to true. */
  showSlogan?: boolean
}

/**
 * Site logo:
 * - Brand Mark (Concept 3): Architectural smart home monogram with dynamic 'N' diagonal & smart signal pulse.
 * - Wordmark: Urbanist at weight 700 via `font-logo`.
 * - Slogan: Urbanist at weight 700 with wide tracking directly beneath "NXT Smart Home".
 * - Seamless automatic light and dark mode styling.
 */
const Logo: React.FC<LogoProps> = ({
  className,
  size = 'size-9 sm:size-10',
  alwaysShowWordmark = false,
  theme = 'auto',
  slogan = "AUSTRALIA'S SMART HOME GUIDE",
  showSlogan = true,
}) => {
  return (
    <Link
      href="/"
      className={clsx('group inline-flex shrink-0 items-center gap-3', className)}
      aria-label={`${site.name} — ${slogan}`}
    >
      {/* Creative Brand Mark before the title */}
      <span
        className={clsx(
          size,
          'flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105'
        )}
      >
        <BrandMark theme={theme} className="size-full" />
      </span>

      {/* Title & Slogan lockup */}
      <span
        className={clsx(
          'flex-col justify-center leading-none',
          alwaysShowWordmark ? 'flex' : 'hidden sm:flex'
        )}
      >
        <span
          className={clsx(
            'font-logo text-[1.25rem] sm:text-[1.35rem] font-bold tracking-[-0.02em]',
            theme === 'auto' && 'text-neutral-900 dark:text-white',
            theme === 'light' && 'text-neutral-900',
            theme === 'dark' && 'text-white'
          )}
        >
          <span
            className={clsx(
              theme === 'auto' && 'text-primary-600 dark:text-primary-400',
              theme === 'light' && 'text-primary-600',
              theme === 'dark' && 'text-primary-400'
            )}
          >
            NXT
          </span>{' '}
          Smart Home
        </span>

        {showSlogan && (
          <span
            className={clsx(
              'font-logo text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.16em] uppercase mt-1 leading-none',
              theme === 'auto' && 'text-neutral-500 dark:text-neutral-400',
              theme === 'light' && 'text-neutral-500',
              theme === 'dark' && 'text-neutral-400'
            )}
          >
            {slogan}
          </span>
        )}
      </span>
    </Link>
  )
}

export default Logo

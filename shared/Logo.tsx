import BrandMark from '@/components/BrandMark'
import { site } from '@/lib/site'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  size?: string
}

/** Site logo: the NXT Smart Home mark plus wordmark (replaces the Ncmaz logo). */
const Logo: React.FC<Props> = ({ className, size = 'size-9 sm:size-10' }) => {
  return (
    <Link href="/" className={clsx('inline-flex shrink-0 items-center gap-2.5', className)} aria-label={site.name}>
      <BrandMark
        className={clsx(size, 'text-primary-600 dark:text-primary-400')}
        cutClassName="fill-white stroke-white dark:fill-neutral-900 dark:stroke-neutral-900"
      />
      <span className="hidden text-lg leading-tight font-semibold tracking-tight text-neutral-900 sm:block dark:text-white">
        NXT Smart Home
      </span>
    </Link>
  )
}

export default Logo

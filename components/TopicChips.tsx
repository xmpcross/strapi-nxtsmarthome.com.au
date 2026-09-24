import { categoryColor } from '@/data/categories'
import type { Category } from '@/lib/site'
import clsx from 'clsx'
import Link from 'next/link'

/**
 * Topic links for each category; the active one is filled. `row` is a wrap of
 * pills; `sidebar` stacks them full width for a left filter column.
 */
export default function TopicChips({
  categories,
  activeSlug,
  allHref = '/articles/',
  total,
  layout = 'row',
}: {
  categories: (Category & { count: number })[]
  activeSlug?: string
  allHref?: string
  total?: number
  layout?: 'row' | 'sidebar'
}) {
  const pill =
    layout === 'sidebar'
      ? 'flex w-full items-center justify-between gap-2 rounded-[8px] border px-3 py-2 text-sm font-medium transition-colors'
      : 'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors'
  return (
    <nav aria-label="Topics" className={layout === 'sidebar' ? 'flex flex-col gap-1.5' : 'flex flex-wrap gap-2'}>
      <Link
        href={allHref}
        className={clsx(
          pill,
          !activeSlug
            ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300'
        )}
      >
        All{typeof total === 'number' ? ` (${total})` : ''}
      </Link>
      {categories
        .filter((c) => c.count > 0)
        .map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}/`}
            data-color={categoryColor(c.key)}
            className={clsx(
              pill,
              c.slug === activeSlug
                ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300'
            )}
          >
            {c.name}
            <span className="opacity-60">{c.count}</span>
          </Link>
        ))}
    </nav>
  )
}

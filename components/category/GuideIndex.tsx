'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface GuideRow {
  href: string
  title: string
  type: string
  typeLabel: string
  minutes: number
}

/**
 * Every guide in a topic as a compact, ruled list, narrowed by article type.
 * The rows are server-rendered in full; the filter only hides rows, so the list
 * works and is crawlable without JavaScript.
 */
export default function GuideIndex({ rows, types }: { rows: GuideRow[]; types: { type: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null)
  const counts = new Map<string, number>()
  for (const row of rows) counts.set(row.type, (counts.get(row.type) ?? 0) + 1)
  const filters = types.filter((t) => counts.has(t.type))
  const shown = active ? rows.filter((r) => r.type === active).length : rows.length

  const button = (pressed: boolean) =>
    `rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
      pressed
        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
    }`

  return (
    <div>
      {filters.length > 1 ? (
        <div role="group" aria-label="Filter guides by type" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)} className={button(active === null)}>
            All <span className="tabular-nums opacity-70">{rows.length}</span>
          </button>
          {filters.map((f) => (
            <button
              key={f.type}
              type="button"
              aria-pressed={active === f.type}
              onClick={() => setActive(active === f.type ? null : f.type)}
              className={button(active === f.type)}
            >
              {f.label} <span className="tabular-nums opacity-70">{counts.get(f.type)}</span>
            </button>
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {shown} {shown === 1 ? 'guide' : 'guides'} shown
      </p>

      <ul className="mt-5 border-t border-neutral-200 dark:border-neutral-800">
        {rows.map((row) => (
          <li
            key={row.href}
            hidden={active !== null && row.type !== active}
            className="border-b border-neutral-200 dark:border-neutral-800"
          >
            <Link
              href={row.href}
              className="group flex flex-col gap-1 rounded-sm py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="font-semibold text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 sm:flex-1 dark:text-neutral-100 dark:group-hover:text-primary-400">
                {row.title}
              </span>
              <span className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400">
                {row.typeLabel} · <span className="tabular-nums">{row.minutes}</span> min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

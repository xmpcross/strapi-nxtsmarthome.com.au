'use client'

import Link from 'next/link'
import { useId, useState } from 'react'

export interface ArticleRow {
  href: string
  title: string
  topic: string
  topicName: string
  type: string
  typeLabel: string
  date: string
  dateLabel: string
  minutes: number
}

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500'

const chip = (pressed: boolean) =>
  `rounded-full border px-3 py-1 text-sm font-medium transition-colors ${FOCUS} ${
    pressed
      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
  }`

/**
 * Every article in one compact list, newest first, narrowed by a title search,
 * a topic and an article type. All rows are server-rendered; the controls only
 * hide rows, so the list works and is crawlable without JavaScript.
 */
export default function ArticleIndex({
  rows,
  topics,
  types,
}: {
  rows: ArticleRow[]
  topics: { key: string; name: string }[]
  types: { type: string; label: string }[]
}) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const searchId = useId()

  const q = query.trim().toLowerCase()
  const visible = (row: ArticleRow) =>
    (!topic || row.topic === topic) && (!type || row.type === type) && (!q || row.title.toLowerCase().includes(q))
  const shown = rows.filter(visible).length

  const count = (pred: (r: ArticleRow) => boolean) => rows.filter(pred).length
  const topicList = topics.filter((t) => rows.some((r) => r.topic === t.key))
  const typeList = types.filter((t) => rows.some((r) => r.type === t.type))
  const filtered = topic !== null || type !== null || q !== ''

  return (
    <div>
      <div className="space-y-4">
        <div className="max-w-md">
          <label htmlFor={searchId} className="text-sm font-semibold text-neutral-900 dark:text-white">
            Find a guide
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, e.g. doorbell"
            className={`mt-1.5 block w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-400 ${FOCUS}`}
          />
        </div>

        <div role="group" aria-label="Filter by topic" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-neutral-900 dark:text-white">Topic</span>
          <button type="button" aria-pressed={topic === null} onClick={() => setTopic(null)} className={chip(topic === null)}>
            All
          </button>
          {topicList.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={topic === t.key}
              onClick={() => setTopic(topic === t.key ? null : t.key)}
              className={chip(topic === t.key)}
            >
              {t.name} <span className="tabular-nums opacity-70">{count((r) => r.topic === t.key)}</span>
            </button>
          ))}
        </div>

        <div role="group" aria-label="Filter by type" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-neutral-900 dark:text-white">Type</span>
          <button type="button" aria-pressed={type === null} onClick={() => setType(null)} className={chip(type === null)}>
            All
          </button>
          {typeList.map((t) => (
            <button
              key={t.type}
              type="button"
              aria-pressed={type === t.type}
              onClick={() => setType(type === t.type ? null : t.type)}
              className={chip(type === t.type)}
            >
              {t.label} <span className="tabular-nums opacity-70">{count((r) => r.type === t.type)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
          <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">{shown}</span> of{' '}
          <span className="tabular-nums">{rows.length}</span> articles, newest first
        </p>
        {filtered ? (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setTopic(null)
              setType(null)
            }}
            className={`rounded-sm text-sm font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <ul>
        {rows.map((row) => (
          <li key={row.href} hidden={!visible(row)} className="border-b border-neutral-200 dark:border-neutral-800">
            <Link
              href={row.href}
              className={`group flex flex-col gap-1 rounded-sm py-3.5 sm:flex-row sm:items-baseline sm:gap-6 ${FOCUS}`}
            >
              <time
                dateTime={row.date}
                className="w-24 shrink-0 text-sm tabular-nums text-neutral-600 dark:text-neutral-400"
              >
                {row.dateLabel}
              </time>
              <span className="font-semibold text-neutral-900 group-hover:text-primary-600 group-hover:underline group-hover:underline-offset-4 sm:flex-1 dark:text-neutral-100 dark:group-hover:text-primary-400">
                {row.title}
              </span>
              <span className="shrink-0 text-sm text-neutral-600 sm:text-right dark:text-neutral-400">
                {row.topicName} · {row.typeLabel} · <span className="tabular-nums">{row.minutes}</span> min
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown === 0 ? (
        <p className="py-8 text-neutral-700 dark:text-neutral-300">
          No articles match. Try a shorter search, or clear the filters.
        </p>
      ) : null}
    </div>
  )
}

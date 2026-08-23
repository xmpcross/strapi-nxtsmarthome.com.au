'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { categories } from '@/lib/site';
import { articleHref } from '@/lib/urls';

/**
 * Search overlay opened from the header icon.
 *
 * Data comes from /search-index.json — the same file the /search/ page uses, so
 * there is one index and no duplicated build step. Category counts are derived
 * from it rather than hardcoded, so they cannot drift.
 *
 * /search/ still exists and still works: submitting sends you there with ?q=, which
 * keeps the results shareable, crawlable and usable without JavaScript.
 */

interface Doc {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  categoryMeta?: { slug: string };
  date: string;
  body: string;
  tags?: string[];
  readingMinutes: number;
  cover: string;
}

// "19 Aug, 2025" — the reference's date format.
const fmt = (iso: string) =>
  new Date(iso)
    .toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    .replace(/ (\d{4})$/, ', $1');

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  /*
   * Rendered through a portal onto <body>, not where it sits in the tree.
   *
   * SearchModal is a child of <header>, and that header carries `backdrop-blur`.
   * An element with a filter or backdrop-filter becomes the containing block for
   * its fixed-position descendants, so `fixed inset-0` sized itself to the
   * header's box instead of the viewport: the overlay appeared as a strip across
   * the header, the page underneath was never covered, and z-[60] was trapped in
   * the header's stacking context.
   *
   * The mounted flag exists because a static export renders this on the server,
   * where there is no document to portal into.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load the index once, the first time the modal is opened.
  useEffect(() => {
    if (!open || docs.length) return;
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => setDocs([]));
  }, [open, docs.length]);

  // Escape to close, focus the field, and stop the page scrolling behind the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const d of docs) m.set(d.category, (m.get(d.category) ?? 0) + 1);
    return m;
  }, [docs]);

  const chips = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, count: counts.get(c.key) ?? 0 }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count),
    [counts],
  );

  // Live matches while typing; otherwise the three newest as a recommendation.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return docs
      .filter((d) =>
        `${d.title} ${d.description} ${d.categoryName} ${(d.tags ?? []).join(' ')} ${d.body}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 8);
  }, [docs, query]);

  // The row scrolls horizontally, so it can carry more than fits at once —
  // matching the reference, where items run past both edges of the panel.
  const recommended = useMemo(
    () => [...docs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8),
    [docs],
  );

  if (!open || !mounted) return null;

  const shown = query.trim() ? results : recommended;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
      }}
    >
      {/*
        Centred in the viewport, both axes.

        The centring lives on an inner wrapper with `min-h-full` rather than on
        the scroll container itself. Centring directly on an `overflow-y-auto`
        element clips the top of any panel taller than the window — the overflow
        goes above the scroll origin and cannot be reached. This arrangement
        centres a short panel and scrolls a tall one, which matters here because
        the recommendations list grows the panel on a laptop screen.
      */}
      <div className="flex min-h-full items-center justify-center">
        <div
          ref={panelRef}
          className="relative w-full max-w-4xl rounded-lg bg-slate-50 p-6 shadow-2xl sm:p-10 dark:bg-slate-900"
        >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-[1.75rem] font-bold text-slate-900 dark:text-white">
          Search
        </h2>

        {/*
          * Navigate first, close second.
          *
          * This was `onSubmit={onClose}` on a plain GET form, which looked
          * right and did nothing: closing the modal sets open=false, the
          * component returns null, and React removes the <form> from the DOM
          * before the browser has processed the submission. A disconnected
          * form does not navigate, so clicking Search went nowhere.
          */}
        <form
          action="/search/"
          method="get"
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            const term = query.trim();
            if (!term) return;
            onClose();
            router.push(`/search/?q=${encodeURIComponent(term)}`);
          }}
        >
          <input
            ref={inputRef}
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What Are You Looking For?"
            className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-base text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-slate-900 px-10 py-4 font-bold text-white transition hover:bg-brand-600 sm:min-w-[10.5rem] dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            Search
          </button>
        </form>

        {chips.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}/`}
                onClick={onClose}
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-800 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {c.name}
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs tabular-nums text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                  {c.count}
                </span>
              </Link>
            ))}
          </div>
        )}

        <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <span aria-hidden="true" className="text-brand-600 dark:text-brand-400">✦</span>
          {query.trim() ? `Results for “${query.trim()}”` : 'Recommended for you'}
        </h3>

        {query.trim() && shown.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Nothing matched. Try a broader term, or browse a category above.
          </p>
        ) : (
          /*
            Horizontal scroller rather than a grid. In the reference the row runs
            past both edges of the panel, which is what tells the reader there is
            more to see — a 3-up grid would hide the rest with no such cue.
          */
          <div className="-mx-6 mt-5 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 [scrollbar-width:thin]">
            <ul className="flex snap-x snap-mandatory gap-6">
              {shown.map((d) => (
                <li key={d.slug} className="w-[19rem] shrink-0 snap-start">
                  <Link
                    href={articleHref(d)}
                    onClick={onClose}
                    className="group flex items-start gap-4"
                  >
                    <img
                      src={d.cover ?? `/covers/${d.slug}.png`}
                      alt=""
                      width={1000}
                      height={500}
                      loading="lazy"
                      className="h-[4.75rem] w-[6.5rem] shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                        {d.title}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <time dateTime={d.date}>{fmt(d.date)}</time>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">•</span>
                        {/*
                          The reference shows a comment count here. This site has no
                          comments, so inventing a number would be a fabrication —
                          reading time is the honest equivalent in the same slot.
                        */}
                        <span>{d.readingMinutes} min</span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

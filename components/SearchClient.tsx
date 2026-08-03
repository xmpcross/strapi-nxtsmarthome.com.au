'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { SearchDoc } from '@/lib/content';
import { articleHref } from '@/lib/urls';

/** Weighted substring scoring — good enough for a few hundred articles, zero dependencies. */
function score(doc: SearchDoc, terms: string[]): number {
  const title = doc.title.toLowerCase();
  const description = doc.description.toLowerCase();
  const body = doc.body.toLowerCase();
  const tags = doc.tags.join(' ').toLowerCase();

  let total = 0;
  for (const term of terms) {
    if (title.includes(term)) total += 10;
    if (tags.includes(term)) total += 5;
    if (description.includes(term)) total += 4;
    if (body.includes(term)) total += 1;
  }
  // Every term must appear somewhere, otherwise it is not a match.
  const matchesAll = terms.every(
    (t) => title.includes(t) || description.includes(t) || body.includes(t) || tags.includes(t),
  );
  return matchesAll ? total : 0;
}

export default function SearchClient() {
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data: SearchDoc[]) => setDocs(data))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  // Seed from ?q= so links and the JSON-LD SearchAction work.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return docs
      .map((doc) => ({ doc, s: score(doc, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((r) => r.doc);
  }, [docs, query]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search articles
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try “Matter”, “video doorbell”, “smart switch wiring”…"
        autoComplete="off"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-brand-900"
      />

      <div className="mt-6">
        {loading && <p className="text-sm text-slate-500">Loading search index…</p>}

        {!loading && query && (
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{query}”
          </p>
        )}

        {!loading && !query && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Start typing to search {docs.length} articles.
          </p>
        )}

        <ul className="space-y-4">
          {results.map((doc) => (
            <li
              key={doc.slug}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 dark:border-slate-700 dark:hover:border-brand-600"
            >
              <p className="mb-1 text-xs font-medium text-brand-700 dark:text-brand-400">
                {doc.categoryName}
              </p>
              <h2 className="font-bold text-slate-900 dark:text-white">
                <Link href={articleHref(doc)} className="hover:underline">
                  {doc.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{doc.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Card11 from '@/components/PostCards/Card11';
import Pagination, { PER_PAGE } from '@/components/Pagination';
import type { TPost } from '@/data/posts';

/**
 * Post category listing with the product category page's left filter
 * (components/ProductGrid.tsx): same card, headings, list buttons, mobile
 * toggle, active-filter chips and "Showing X of Y" bar, with filters that fit
 * articles — search, sort, topic, article type and author.
 *
 * Unfiltered, the page shows exactly the server's page N and the real
 * /page/N/ links (crawlable, work without JavaScript). Once a filter is set it
 * filters the whole category client-side and pages through the results.
 */

export interface PostFilterItem {
  post: TPost;
  title: string;
  description: string;
  date: string;
  type: string;
  typeLabel: string;
  author: string;
}

interface TopicOption {
  key: string;
  slug: string;
  name: string;
  emoji: string;
  count: number;
}

interface Props {
  items: PostFilterItem[];
  topics: TopicOption[];
  totalArticles: number;
  currentSlug: string;
  base: string;
  page: number;
}

type SortKey = 'newest' | 'oldest' | 'title';

const listButton = (active: boolean, strong = false) =>
  `flex w-full items-center justify-between rounded-lg px-3 ${strong ? 'py-2' : 'py-1.5'} text-xs font-medium transition ${
    active
      ? strong
        ? 'bg-primary-600 font-bold text-white shadow-2xs'
        : 'bg-slate-900 font-bold text-white dark:bg-slate-700'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
  }`;

const chip =
  'inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-900 dark:text-primary-300';

export default function PostFilterGrid({ items, topics, totalArticles, currentSlug, base, page }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('newest');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, selectedType, selectedAuthor]);

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) + (selectedType !== 'all' ? 1 : 0) + (selectedAuthor !== 'all' ? 1 : 0);
  // Sorting alone re-orders the whole category, so it also switches to client paging.
  const filtering = activeFilterCount > 0 || sortBy !== 'newest';

  const resetAll = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedAuthor('all');
    setSortBy('newest');
  };

  const types = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    for (const i of items) {
      const hit = map.get(i.type);
      if (hit) hit.count += 1;
      else map.set(i.type, { label: i.typeLabel, count: 1 });
    }
    return [...map.entries()].sort((a, b) => a[1].label.localeCompare(b[1].label));
  }, [items]);

  const authors = useMemo(() => {
    const map = new Map<string, number>();
    for (const i of items) if (i.author) map.set(i.author, (map.get(i.author) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  const filtered = useMemo(() => {
    let result = [...items];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
      );
    }
    if (selectedType !== 'all') result = result.filter((i) => i.type === selectedType);
    if (selectedAuthor !== 'all') result = result.filter((i) => i.author === selectedAuthor);
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      const diff = +new Date(a.date) - +new Date(b.date);
      return sortBy === 'oldest' ? diff : -diff;
    });
    return result;
  }, [items, searchQuery, selectedType, selectedAuthor, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shownPage = filtering ? currentPage : page;
  const start = (shownPage - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <div>
      {/* Mobile Filter Toggle Button */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <span>🔍 Filter & Sort</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">{filtered.length} articles found</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        {/* Left Filter Sidebar */}
        <aside className={`mb-6 w-full lg:mb-0 lg:w-72 lg:shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 space-y-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-2xs dark:border-slate-700/80 dark:bg-slate-800/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
              <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                Filter Articles
              </h2>
              {filtering && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search Filter */}
            <div>
              <label htmlFor="article-search" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Search Articles
              </label>
              <input
                id="article-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. doorbell, NBN, renters..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:bg-white focus:outline-hidden dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Sort Order Selector */}
            <div>
              <label htmlFor="article-sort-by" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sort By
              </label>
              <select
                id="article-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-hidden dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title: A to Z</option>
              </select>
            </div>

            {/* Topics — each is its own category page, so these are links */}
            <div>
              <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">Topics</span>
              <div className="space-y-1.5">
                <Link href="/articles/" className={listButton(false, true)}>
                  <span className="flex items-center gap-2">
                    <span>🏠</span>
                    <span>All Topics</span>
                  </span>
                  <span className="text-[10px] opacity-80">({totalArticles})</span>
                </Link>
                {topics
                  .filter((t) => t.count > 0)
                  .map((t) => (
                    <Link
                      key={t.slug}
                      href={`/categories/${t.slug}/`}
                      aria-current={t.slug === currentSlug ? 'page' : undefined}
                      className={listButton(t.slug === currentSlug, true)}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{t.emoji}</span>
                        <span className="truncate">{t.name}</span>
                      </span>
                      <span className="shrink-0 text-[10px] opacity-80">({t.count})</span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Article Type Filter */}
            {types.length > 1 && (
              <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">Article Type</span>
                <div className="space-y-1.5">
                  <button type="button" onClick={() => setSelectedType('all')} className={listButton(selectedType === 'all')}>
                    <span>All types</span>
                    <span className="text-[10px] opacity-80">({items.length})</span>
                  </button>
                  {types.map(([key, { label, count }]) => (
                    <button key={key} type="button" onClick={() => setSelectedType(key)} className={listButton(selectedType === key)}>
                      <span>{label}</span>
                      <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Author Filter */}
            {authors.length > 1 && (
              <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">Author</span>
                <div className="space-y-1.5">
                  <button type="button" onClick={() => setSelectedAuthor('all')} className={listButton(selectedAuthor === 'all')}>
                    <span>All authors</span>
                    <span className="text-[10px] opacity-80">({items.length})</span>
                  </button>
                  {authors.map(([name, count]) => (
                    <button key={name} type="button" onClick={() => setSelectedAuthor(name)} className={listButton(selectedAuthor === name)}>
                      <span className="truncate">{name}</span>
                      <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Article Grid Area */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 hidden items-center justify-between border-b border-slate-100 pb-3 lg:flex dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{visible.length}</span> of{' '}
              <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> articles
            </p>
            <div className="flex flex-wrap gap-2">
              {searchQuery.trim() && (
                <span className={chip}>
                  Search: {searchQuery.trim()}
                  <button type="button" onClick={() => setSearchQuery('')} className="ml-1 font-bold hover:text-primary-900">
                    ×
                  </button>
                </span>
              )}
              {selectedType !== 'all' && (
                <span className={chip}>
                  Type: {types.find(([k]) => k === selectedType)?.[1].label ?? selectedType}
                  <button type="button" onClick={() => setSelectedType('all')} className="ml-1 font-bold hover:text-primary-900">
                    ×
                  </button>
                </span>
              )}
              {selectedAuthor !== 'all' && (
                <span className={chip}>
                  Author: {selectedAuthor}
                  <button type="button" onClick={() => setSelectedAuthor('all')} className="ml-1 font-bold hover:text-primary-900">
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="grid gap-[15px] sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((i) => (
                <Card11 key={i.post.handle} post={i.post} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700">
              Nothing published in this section yet — it&apos;s next on the list.
            </p>
          ) : (
            <div className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                No articles match your selected filters.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-3 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filtering ? (
            totalPages > 1 && (
              <nav aria-label="Filtered results pages" className="mt-8 flex flex-wrap justify-end gap-2">
                {Array.from({ length: totalPages }, (_, n) => n + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCurrentPage(n)}
                    aria-current={n === currentPage ? 'page' : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-md text-sm transition ${
                      n === currentPage
                        ? 'bg-[#0c5adb] font-semibold text-white dark:bg-blue-600'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </nav>
            )
          ) : (
            <Pagination base={base} page={page} total={items.length} />
          )}
        </div>
      </div>
    </div>
  );
}

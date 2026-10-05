'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export type TopicCategoryData = {
  id: string | number;
  name: string;
  handle: string;
  count: number;
  description: string;
  emoji?: string;
  intro?: string;
  subcategories?: string[];
  hasProducts: boolean;
};

interface AllTopicsClientProps {
  categories: TopicCategoryData[];
}

export default function AllTopicsClient({ categories }: AllTopicsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract unique subcategories across all topics
  const allSubcategories = useMemo(() => {
    const tags = new Set<string>();
    categories.forEach((cat) => {
      cat.subcategories?.forEach((sub) => tags.add(sub));
    });
    return Array.from(tags).sort();
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        searchQuery === '' ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.intro && cat.intro.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cat.subcategories?.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        !selectedTag || cat.subcategories?.some((sub) => sub === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [categories, searchQuery, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Interactive Control Deck & Search */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/70 p-6 md:p-8 backdrop-blur-xl shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-neutral-400">
              <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, protocols, devices (e.g. HomeKit, Wi-Fi, Security)..."
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 py-3.5 ps-12 pe-10 text-sm font-medium text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-white dark:focus:border-primary-400 dark:focus:bg-neutral-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 flex items-center pe-4 text-xs font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Switcher & Counter */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'Topic' : 'Topics'} Found
            </span>

            {/* Layout Toggle Buttons */}
            <div className="inline-flex rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm dark:bg-neutral-700 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm dark:bg-neutral-700 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                Compact Directory
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Topic Filter Tags */}
        {allSubcategories.length > 0 && (
          <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Filter by Smart Home Focus
              </span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
                >
                  Reset Filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedTag === null
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                All Topics ({categories.length})
              </button>
              {allSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedTag(selectedTag === sub ? null : sub)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedTag === sub
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Display: Grid or Compact Directory */}
      {filteredCategories.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View - Futuristic Elevated Cards */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((c) => (
              <div
                key={c.id}
                id={c.handle}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10 dark:border-neutral-800/90 dark:bg-neutral-900/90"
              >
                {/* Accent Backdrop Glow */}
                <div className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-gradient-to-br from-primary-500/10 to-purple-500/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-primary-500/20 group-hover:to-indigo-500/20"></div>

                <div>
                  {/* Top Avatar & Count */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/15 via-indigo-500/10 to-purple-500/15 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110 dark:from-primary-500/25 dark:to-purple-500/25">
                      {c.emoji || '⚡'}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700 ring-1 ring-primary-500/20 dark:bg-primary-950/60 dark:text-primary-300 dark:ring-primary-500/30">
                      {c.count} {c.count === 1 ? 'Guide' : 'Guides'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    <Link
                      href={`/categories/${c.handle}/`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {c.name}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-3">
                    {c.intro || c.description}
                  </p>

                  {/* Subcategories */}
                  {c.subcategories && c.subcategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Includes Topics
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {c.subcategories.slice(0, 4).map((sub) => (
                          <span
                            key={sub}
                            className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {sub}
                          </span>
                        ))}
                        {c.subcategories.length > 4 && (
                          <span className="rounded-lg bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                            +{c.subcategories.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <Link
                    href={`/categories/${c.handle}/`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-lg focus:outline-none"
                  >
                    View Guides
                    <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>

                  {c.hasProducts && (
                    <Link
                      href={`/products/category/${c.handle}/`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-xs hover:border-primary-500 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-primary-400 dark:hover:bg-neutral-700"
                    >
                      Products
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List Directory View - Ultra Clean Accordion Directory */
          <div className="divide-y divide-neutral-200 rounded-3xl border border-neutral-200/80 bg-white overflow-hidden shadow-xl dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
            {filteredCategories.map((c) => (
              <div
                key={c.id}
                id={c.handle}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 gap-6 transition-colors hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40"
              >
                <div className="flex items-start gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl dark:bg-primary-950/60">
                    {c.emoji || '⚡'}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        <Link href={`/categories/${c.handle}/`} className="hover:text-primary-600 dark:hover:text-primary-400">
                          {c.name}
                        </Link>
                      </h3>
                      <span className="rounded-full bg-primary-100/80 px-2.5 py-0.5 text-xs font-semibold text-primary-800 dark:bg-primary-900/40 dark:text-primary-300">
                        {c.count} {c.count === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
                      {c.intro || c.description}
                    </p>
                    {c.subcategories && c.subcategories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="rounded-md border border-neutral-200 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <Link
                    href={`/categories/${c.handle}/`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white hover:bg-primary-700 transition"
                  >
                    Explore
                    <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                  {c.hasProducts && (
                    <Link
                      href={`/products/category/${c.handle}/`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      Compare Products
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-neutral-100 text-3xl dark:bg-neutral-800">
            🔍
          </div>
          <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-white">
            No matching topics found
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            We couldn&apos;t find any smart home categories matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="mt-5 rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-700"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

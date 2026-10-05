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

  // Extract unique subcategories across all topics for tag filter buttons
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
    <div className="space-y-10">
      {/* Search & Filter Toolbar */}
      <div className="card card-border bg-base-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-base-content/50">
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, e.g. Wi-Fi, HomeKit, Cameras..."
              className="input input-border w-full ps-10 rounded-xl bg-base-200/50 focus:bg-base-100 border-neutral-200 dark:border-neutral-700 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-xs text-base-content/50 hover:text-base-content"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-medium text-base-content/70">
            <span className="badge badge-soft badge-primary px-3 py-2 text-xs rounded-full">
              Showing {filteredCategories.length} of {categories.length} topics
            </span>
          </div>
        </div>

        {/* Subcategory Tag Quick Pills */}
        {allSubcategories.length > 0 && (
          <div className="mt-5 pt-4 border-t border-base-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                Popular Sub-Topics
              </span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Reset filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedTag(null)}
                className={`btn btn-xs rounded-full ${
                  selectedTag === null
                    ? 'btn-primary'
                    : 'btn-outline border-neutral-200 dark:border-neutral-700'
                }`}
              >
                All
              </button>
              {allSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedTag(selectedTag === sub ? null : sub)}
                  className={`btn btn-xs rounded-full transition-all ${
                    selectedTag === sub
                      ? 'btn-primary'
                      : 'btn-outline border-neutral-200 dark:border-neutral-700 text-base-content/80 hover:border-primary'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Topics Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredCategories.map((c) => (
            <div
              key={c.id}
              id={c.handle}
              className="card card-border group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs hover:shadow-lg transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {c.emoji || '💡'}
                  </span>
                  <span className="badge badge-soft badge-primary font-semibold py-2 px-3 text-xs rounded-full">
                    {c.count} {c.count === 1 ? 'guide' : 'guides'}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-bold leading-tight text-neutral-900 dark:text-white">
                  <Link
                    href={`/categories/${c.handle}/`}
                    className="hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {c.intro || c.description}
                </p>

                {c.subcategories && c.subcategories.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                      Covers
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="badge badge-outline border-neutral-200 text-xs font-normal text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 py-2"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-5 text-sm font-medium dark:border-neutral-800">
                <Link
                  href={`/categories/${c.handle}/`}
                  className="btn btn-sm btn-primary gap-1 font-semibold rounded-lg"
                >
                  Read {c.name} guides
                  <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>

                {c.hasProducts && (
                  <Link
                    href={`/products/category/${c.handle}/`}
                    className="btn btn-sm btn-outline border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-primary rounded-lg"
                  >
                    Compare products
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-lg font-semibold text-base-content">No topics found</p>
          <p className="mt-1 text-sm text-base-content/60">
            No categories matched &ldquo;{searchQuery}&rdquo;. Try clearing your search filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="mt-4 btn btn-sm btn-primary rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { TopProduct } from '@/lib/products';

/** Default page size. Overridable per page — /products/ runs a shorter page
 *  than the category listings. */
const DEFAULT_PAGE_SIZE = 9;

/**
 * Price bands, chosen so each holds a usable slice of the catalogue rather than
 * splitting on round numbers that leave a bucket almost empty.
 */
const PRICE_BANDS: Array<{ key: string; label: string; min: number; max: number }> = [
  { key: 'u100', label: 'Under $100', min: 0, max: 100 },
  { key: '100-250', label: '$100 – $250', min: 100, max: 250 },
  { key: '250-500', label: '$250 – $500', min: 250, max: 500 },
  { key: '500-1000', label: '$500 – $1,000', min: 500, max: 1000 },
  { key: 'o1000', label: '$1,000+', min: 1000, max: Infinity },
];

interface CategoryOption {
  key: string;
  slug: string;
  name: string;
  emoji: string;
  subcategories?: string[];
}

interface Props {
  products: TopProduct[];
  categoriesList?: CategoryOption[];
  currentCategorySlug?: string;
  /** Products per page. Defaults to DEFAULT_PAGE_SIZE. */
  pageSize?: number;
}

export default function ProductGrid({
  products,
  categoriesList = [],
  currentCategorySlug = 'all',
  pageSize = DEFAULT_PAGE_SIZE,
}: Props) {
  const PAGE_SIZE = pageSize;
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategorySlug);
  // On a category page the category is already chosen, so its subcategories are
  // shown straight away. On /products/ nothing is selected and every subcategory
  // list stays collapsed until a category is clicked.
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    currentCategorySlug !== 'all' ? currentCategorySlug : null,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedRetailer, setSelectedRetailer] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Reset to page 1 whenever any filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory, selectedRetailer, selectedPrice, searchQuery, sortBy]);

  // Extract list of all unique retailers present in current products
  const availableRetailers = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.retailers) {
        for (const r of p.retailers) {
          if (r.name) set.add(r.name);
        }
      }
    }
    return Array.from(set).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) =>
          p.categorySlug === selectedCategory ||
          p.categoryKey === selectedCategory ||
          categoriesList.find((c) => (c.slug === selectedCategory || c.key === selectedCategory) && (p.categorySlug === c.slug || p.categoryKey === c.key)),
      );
    }

    // Subcategory filter
    if (selectedSubCategory !== 'all') {
      result = result.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.bestFor?.toLowerCase().includes(q),
      );
    }

    // Price band filter. Products with no verified price are excluded from a
    // band rather than guessed into one.
    if (selectedPrice !== 'all') {
      const band = PRICE_BANDS.find((b) => b.key === selectedPrice);
      if (band) {
        result = result.filter(
          (p) => typeof p.priceAud === 'number' && p.priceAud >= band.min && p.priceAud < band.max,
        );
      }
    }

    // Retailer filter
    if (selectedRetailer !== 'all') {
      result = result.filter((p) =>
        p.retailers?.some((r) => r.name.toLowerCase() === selectedRetailer.toLowerCase()),
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'price-asc') {
        return (a.priceAud || 0) - (b.priceAud || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.priceAud || 0) - (a.priceAud || 0);
      }
      return 0;
    });

    return result;
  }, [products, selectedCategory, selectedSubCategory, searchQuery, selectedRetailer, selectedPrice, sortBy, categoriesList]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;

  /**
   * Page numbers to render: first, last, and a window around the current page,
   * with gaps collapsed to an ellipsis. Listing all of them pushed the control
   * off the row once the catalogue grew.
   */
  const pageItems = useMemo<(number | 'gap')[]>(() => {
    const WINDOW = 1; // pages either side of the current one
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const keep = new Set<number>([1, totalPages, currentPage]);
    for (let i = 1; i <= WINDOW; i++) {
      if (currentPage - i > 1) keep.add(currentPage - i);
      if (currentPage + i < totalPages) keep.add(currentPage + i);
    }
    const sorted = [...keep].sort((a, b) => a - b);

    const out: (number | 'gap')[] = [];
    let prev = 0;
    for (const n of sorted) {
      if (prev && n - prev > 1) out.push('gap');
      out.push(n);
      prev = n;
    }
    return out;
  }, [totalPages, currentPage]);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIdx, startIdx + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    (selectedRetailer !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filter categories list to only show product categories (skip setup/buying guides with 0 products)
  const productCategories = useMemo(() => {
    return categoriesList.filter((cat) =>
      products.some((p) => p.categorySlug === cat.slug || p.categoryKey === cat.key),
    );
  }, [categoriesList, products]);

  return (
    <div className="my-6">
      {/* Mobile Filter Toggle Button */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <span>🔍 Filter & Sort</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] text-white font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {filteredProducts.length} items found
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        {/* Left Filter Sidebar */}
        <aside
          className={`w-full lg:w-72 lg:shrink-0 ${
            isMobileFilterOpen ? 'block' : 'hidden lg:block'
          } mb-6 lg:mb-0`}
        >
          <div className="sticky top-20 space-y-6 rounded-[8px] border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-800/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Filter Products
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setSelectedRetailer('all');
                    setSelectedPrice('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search Filter */}
            <div>
              <label htmlFor="product-search" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Search Products
              </label>
              <input
                id="product-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Roborock, Eufy, Doorbell..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              />
            </div>

            {/* Sort Order Selector */}
            <div>
              <label htmlFor="sidebar-sort-by" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sort By
              </label>
              <select
                id="sidebar-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              >
                <option value="rating">★ Highest Rated First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Product Category & Nested Subcategories Filter */}
            {productCategories.length > 0 && (
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Categories & Subcategories
                </label>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setExpandedCategory(null);
                      setSelectedSubCategory('all');
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                      selectedCategory === 'all'
                        ? 'bg-emerald-600 font-bold text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🏠</span>
                      <span>All Categories</span>
                    </span>
                    <span className="text-[10px] opacity-80">({products.length})</span>
                  </button>

                  {productCategories.map((cat) => {
                    const count = products.filter(
                      (p) => p.categorySlug === cat.slug || p.categoryKey === cat.key,
                    ).length;
                    const isSelected = selectedCategory === cat.slug || selectedCategory === cat.key;
                    const isExpanded = expandedCategory === cat.slug || expandedCategory === cat.key;

                    // Extract all unique subcategories for this specific parent category
                    const catSubCategories = Array.from(
                      new Set(
                        products
                          .filter((p) => p.categorySlug === cat.slug || p.categoryKey === cat.key)
                          .map((p) => p.subCategory)
                          .filter((sub): sub is string => Boolean(sub)),
                      ),
                    ).sort();

                    return (
                      <div key={cat.slug} className="space-y-1">
                        {/* Parent Category Header Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setSelectedSubCategory('all');
                            setExpandedCategory(isExpanded ? null : cat.slug);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                            isSelected
                              ? 'bg-emerald-600 font-bold text-white shadow-xs'
                              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span>{cat.emoji}</span>
                            <span className="truncate">{cat.name}</span>
                          </span>
                          <span className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] opacity-80">({count})</span>
                            {catSubCategories.length > 0 && (
                              <span className={`text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                ▶
                              </span>
                            )}
                          </span>
                        </button>

                        {/* Sub-menu display/show ONLY when clicked/expanded */}
                        {isExpanded && catSubCategories.length > 0 && (
                          <div className="ml-3.5 border-l-2 border-emerald-500/50 pl-2.5 py-1 space-y-1 animate-fadeIn">
                            <button
                              type="button"
                              onClick={() => setSelectedSubCategory('all')}
                              className={`flex w-full items-center justify-between rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                                selectedSubCategory === 'all'
                                  ? 'bg-slate-900 font-bold text-white dark:bg-slate-700'
                                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                              }`}
                            >
                              <span>All {cat.name}</span>
                              <span className="text-[10px] opacity-75">({count})</span>
                            </button>

                            {catSubCategories.map((sub) => {
                              const subCount = products.filter(
                                (p) =>
                                  (p.categorySlug === cat.slug || p.categoryKey === cat.key) &&
                                  p.subCategory === sub,
                              ).length;
                              const isSubSelected = selectedSubCategory === sub;

                              return (
                                <button
                                  key={sub}
                                  type="button"
                                  onClick={() => setSelectedSubCategory(sub)}
                                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                                    isSubSelected
                                      ? 'bg-emerald-700 font-bold text-white shadow-xs'
                                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  <span className="truncate flex items-center gap-1">
                                    <span className="text-[9px] opacity-60">•</span>
                                    <span className="truncate">{sub}</span>
                                  </span>
                                  <span className="text-[10px] opacity-75">({subCount})</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Price
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedPrice('all')}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    selectedPrice === 'all'
                      ? 'bg-slate-900 text-white font-bold dark:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>Any price</span>
                  <span className="text-[10px] opacity-80">({products.length})</span>
                </button>
                {PRICE_BANDS.map((band) => {
                  const count = products.filter(
                    (p) => typeof p.priceAud === 'number' && p.priceAud >= band.min && p.priceAud < band.max,
                  ).length;
                  // A band nothing falls into is noise in the sidebar.
                  if (!count) return null;
                  return (
                    <button
                      key={band.key}
                      type="button"
                      onClick={() => setSelectedPrice(band.key)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        selectedPrice === band.key
                          ? 'bg-slate-900 text-white font-bold dark:bg-slate-700'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{band.label}</span>
                      <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Australian Retailer Filter */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Australian Retailer
              </label>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedRetailer('all')}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    selectedRetailer === 'all'
                      ? 'bg-slate-900 text-white font-bold dark:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>All Retailers</span>
                  <span className="text-[10px] opacity-80">({products.length})</span>
                </button>
              </div>
              {/* 32 stockists is too many to list in full. Capped and scrolled,
                  with "All Retailers" left outside so it is always reachable. */}
              <div className="mt-1.5 max-h-56 space-y-1.5 overflow-y-auto pr-1">
                {availableRetailers.map((ret) => {
                  const count = products.filter((p) =>
                    p.retailers?.some((r) => r.name.toLowerCase() === ret.toLowerCase()),
                  ).length;
                  return (
                    <button
                      key={ret}
                      type="button"
                      onClick={() => setSelectedRetailer(ret)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        selectedRetailer === ret
                          ? 'bg-slate-900 text-white font-bold dark:bg-slate-700'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span>{ret}</span>
                      <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <main className="min-w-0 flex-1">
          {/* Header Bar showing count */}
          <div className="mb-4 hidden items-center justify-between border-b border-slate-100 pb-3 lg:flex dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{paginatedProducts.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> products
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Category: {productCategories.find(c => c.slug === selectedCategory || c.key === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="ml-1 font-bold hover:text-emerald-950">
                    ×
                  </button>
                </span>
              )}
              {selectedSubCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Subcategory: {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory('all')} className="ml-1 font-bold hover:text-emerald-950">
                    ×
                  </button>
                </span>
              )}
              {selectedRetailer !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Retailer: {selectedRetailer}
                  <button onClick={() => setSelectedRetailer('all')} className="ml-1 font-bold hover:text-emerald-950">
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Product Cards Grid (Limited to 9 per page) */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id || product.slug}
                    product={product}
                    rank={(currentPage - 1) * PAGE_SIZE + idx + 1}
                  />
                ))}
              </div>

              {/*
                Pager: count on the left, controls on the right. Rounded tiles
                with a light border, the current page a solid blue fill, and a
                dark focus outline so keyboard position stays visible against
                the blue.
              */}
              {totalPages > 1 && (
                <nav
                  aria-label="Product pagination"
                  className="mt-8 flex flex-col items-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredProducts.length)} of {filteredProducts.length} products
                  </span>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 disabled:opacity-40 disabled:hover:bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus-visible:outline-slate-200"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Page numbers */}
                    {pageItems.map((item, idx) => {
                      if (item === 'gap') {
                        return (
                          <span
                            key={`gap-${idx}`}
                            aria-hidden="true"
                            className="px-1 text-sm text-slate-400 dark:text-slate-500"
                          >
                            …
                          </span>
                        );
                      }
                      const pageNum = item;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          aria-label={`Page ${pageNum}`}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex h-10 w-10 items-center justify-center rounded-md text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-200 ${
                            isActive
                              ? 'bg-[#0c5adb] font-semibold text-white dark:bg-blue-600'
                              : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 disabled:opacity-40 disabled:hover:bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:focus-visible:outline-slate-200"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-[8px] border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                No products found matching your selected filter criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                  setSelectedRetailer('all');
                  setSelectedPrice('all');
                  setSearchQuery('');
                }}
                className="mt-3 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

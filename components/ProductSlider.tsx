'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { TopProduct } from '@/lib/products';

const AUTO_ADVANCE_MS = 4500;

/**
 * Auto-advancing product strip.
 *
 * Same mechanics as the category carousel: a scroll-snap row rather than a
 * transform track, so every card stays in normal flow, the links are in the
 * served HTML, and with JavaScript off it degrades to an ordinary horizontal
 * scroller instead of showing one card and dying.
 *
 * Auto-advance pauses on hover, on keyboard focus, and as soon as the reader
 * scrolls by hand, and never starts for anyone who has asked for reduced
 * motion — content that moves on its own and cannot be stopped fails WCAG
 * 2.2.2.
 */
export default function ProductSlider({
  products,
  heading,
  eyebrow,
  intro,
}: {
  products: TopProduct[];
  heading: string;
  eyebrow?: string;
  intro?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    if (!card) return;
    const step = card.getBoundingClientRect().width + 16; // card + gap-4
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    track.scrollTo({
      left: direction === 1 && atEnd ? 0 : track.scrollLeft + step * direction,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => scrollByCard(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [paused, scrollByCard]);

  if (!products.length) return null;

  return (
    <section className="mb-14">
      {eyebrow ? (
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {heading}
      </h2>
      {intro ? (
        <p className="mt-2 w-full text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:w-4/5">
          {intro}
        </p>
      ) : null}

      <div
        className="relative mt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ul
          ref={trackRef}
          onPointerDown={() => setPaused(true)}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li
              key={product.slug}
              /* Fractions include the gap so the last card in a row does not spill. */
              className="w-[60%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
            >
              <Link
                href={`/products/${product.slug}/`}
                className="group flex h-full flex-col rounded-[8px] border border-slate-200 p-3 transition hover:border-emerald-500 dark:border-slate-700 dark:hover:border-emerald-500"
              >
                <div className="mb-2.5 flex h-28 items-center justify-center overflow-hidden rounded-lg bg-slate-50 p-2 dark:bg-slate-900/60">
                  <img
                    src={product.image || '/og-default.png'}
                    alt={product.brand ? `${product.brand} ${product.name}` : product.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {product.brand ? (
                  <span className="text-[0.6875rem] font-semibold text-emerald-700 dark:text-emerald-400">
                    {product.brand}
                  </span>
                ) : null}

                <h3 className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {product.name}
                </h3>

                <div className="mt-auto pt-2">
                  {/* Only ever a verified retailer price — a product without one
                      says nothing rather than showing a seeded figure. */}
                  {product.priceAud ? (
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${product.priceAud.toLocaleString('en-AU')}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-slate-500">Check price</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Link
            href="/products/"
            className="ml-2 text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
          >
            All products →
          </Link>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
            {paused ? 'Paused' : 'Auto-scrolling'}
          </span>
        </div>
      </div>
    </section>
  );
}

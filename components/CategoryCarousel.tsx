'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type CategoryCard = {
  slug: string;
  emoji: string;
  name: string;
  count: number;
  body: string;
  links: { href: string; label: string }[];
};

const AUTO_ADVANCE_MS = 5000;

/**
 * Auto-advancing category cards.
 *
 * Built as a scroll-snap row rather than a transform carousel: every card stays
 * in normal flow, so the links are in the served HTML for crawlers, and with
 * JavaScript off it degrades to an ordinary horizontal scroller instead of a
 * dead widget.
 *
 * Auto-advance is deliberately easy to escape — it pauses on hover, on keyboard
 * focus, and whenever the reader scrolls the row by hand, and it never starts
 * for anyone who has asked for reduced motion. Content that moves on its own
 * and cannot be stopped fails WCAG 2.2.2, and it is genuinely irritating when
 * you are halfway through reading a card.
 */
export default function CategoryCarousel({ cards }: { cards: CategoryCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    if (!card) return;
    const step = card.getBoundingClientRect().width + 16; // card + gap-4
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    // Wrap rather than stall at the end, otherwise the auto-advance dies
    // silently on the last card and looks broken.
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

  return (
    <div
      className="relative"
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
        {cards.map((cat) => (
          <li
            key={cat.slug}
            /* Four across on desktop; the fractions include the gap so the
               fourth card does not spill. */
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
          >
            <div className="flex h-full flex-col rounded-[8px] border border-slate-200 bg-white p-5 transition hover:border-brand-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-500">
              <Link
                href={`/products/category/${cat.slug}/`}
                className="group flex items-baseline gap-2.5"
              >
                <span className="text-lg" aria-hidden="true">{cat.emoji}</span>
                <span className="text-base font-bold text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                  {cat.name}
                </span>
                <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
                  {cat.count}
                </span>
              </Link>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {cat.body}
              </p>

              <ul className="mt-3 space-y-1 pt-1">
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-400"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous categories"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next categories"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span className="ml-1 text-xs text-slate-400 dark:text-slate-500">
          {paused ? 'Paused' : 'Auto-scrolling'}
        </span>
      </div>
    </div>
  );
}

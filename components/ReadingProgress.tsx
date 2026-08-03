'use client';

import { useEffect, useState } from 'react';

/**
 * Circular reading-progress ring with the read time in the middle, matching the
 * metabar on the reference layout. The ring fills as the article scrolls past.
 *
 * Progress is measured against the article element rather than the whole page, so
 * the footer and related-posts block do not count as "reading".
 */
export default function ReadingProgress({ minutes }: { minutes: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const target = document.getElementById('article-body');

    const onScroll = () => {
      const el = target ?? document.documentElement;
      const top = el === document.documentElement ? 0 : el.getBoundingClientRect().top + window.scrollY;
      const height = el === document.documentElement ? el.scrollHeight : el.offsetHeight;
      const scrolled = window.scrollY + window.innerHeight * 0.5 - top;
      const ratio = height > 0 ? scrolled / height : 0;
      setPct(Math.max(0, Math.min(1, ratio)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative grid h-20 w-20 place-items-center" aria-hidden="true">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={R} fill="none" strokeWidth="2" className="stroke-slate-200 dark:stroke-slate-700" />
        <circle
          cx="40"
          cy="40"
          r={R}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-brand-600 transition-[stroke-dashoffset] duration-150 dark:stroke-brand-400"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct)}
        />
      </svg>
      <span className="text-center text-[11px] font-bold leading-tight text-slate-700 dark:text-slate-300">
        {minutes}
        <br />
        min
      </span>
    </div>
  );
}

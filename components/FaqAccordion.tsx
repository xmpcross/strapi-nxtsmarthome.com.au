'use client';

import { useId, useState } from 'react';
import Link from 'next/link';

export type FaqItem = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

/**
 * Full-width FAQ accordion: hairline rules, regular-weight labels, chevron
 * right. No cards and no fills — at this width a boxed list reads as heavy,
 * and the rules alone are enough to separate rows.
 *
 * Panels stay in the DOM and collapse with CSS rather than unmounting. This is
 * a static export feeding FAQPage schema, so an answer that only exists after
 * a click would be absent from the served HTML and the rich result would claim
 * text no crawler ever saw.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-slate-200 dark:border-slate-700">
            <h3>
              <button
                type="button"
                id={`${baseId}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[0.9375rem] text-slate-800 dark:text-slate-100">
                  {item.q}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>

            <div
              id={`${baseId}-a-${i}`}
              role="region"
              aria-labelledby={`${baseId}-q-${i}`}
              className={isOpen ? 'pb-6 pr-10' : 'hidden'}
            >
              <p className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.a}
              </p>
              {item.link ? (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-400"
                >
                  → {item.link.label}
                </Link>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export type FlyonAccordionItem = {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

interface FlyonAccordionProps {
  items: FlyonAccordionItem[];
  alwaysOpen?: boolean;
  columns?: 1 | 2;
}

export default function FlyonAccordion({ items, alwaysOpen = false, columns = 1 }: FlyonAccordionProps) {
  if (columns === 2) {
    return (
      <div className="grid gap-4 md:grid-cols-2 items-start">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="accordion rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            data-accordion-always-open={alwaysOpen ? 'true' : undefined}
          >
            <div
              className={`accordion-item ${index === 0 ? 'active' : ''}`}
              id={`accordion-heading-${item.id || index}`}
            >
              <button
                className="accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 text-left font-medium text-neutral-900 hover:text-primary-600 focus:outline-none dark:text-white dark:hover:text-primary-400"
                aria-expanded={index === 0}
                aria-controls={`accordion-content-${item.id || index}`}
              >
                <span className="text-base font-bold">{item.question}</span>
                <svg
                  className="accordion-active:rotate-180 size-4 shrink-0 transition-transform duration-300 text-neutral-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                id={`accordion-content-${item.id || index}`}
                className={`accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                  index === 0 ? 'block' : 'hidden'
                }`}
                role="region"
                aria-labelledby={`accordion-heading-${item.id || index}`}
              >
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {item.answer}
                </p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-x-1.5 text-xs font-bold text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {item.link.label}
                    <svg className="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="accordion accordion-border divide-y divide-neutral-200 dark:divide-neutral-800" data-accordion-always-open={alwaysOpen ? 'true' : undefined}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={`accordion-item ${index === 0 ? 'active' : ''}`}
          id={`accordion-heading-${item.id || index}`}
        >
          <button
            className="accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 text-left font-medium text-neutral-900 hover:text-primary-600 focus:outline-none dark:text-white dark:hover:text-primary-400 py-4"
            aria-expanded={index === 0}
            aria-controls={`accordion-content-${item.id || index}`}
          >
            <span className="text-base font-semibold">{item.question}</span>
            <svg
              className="accordion-active:rotate-180 size-4 shrink-0 transition-transform duration-300 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <div
            id={`accordion-content-${item.id || index}`}
            className={`accordion-content w-full overflow-hidden transition-[height] duration-300 ${
              index === 0 ? 'block' : 'hidden'
            }`}
            role="region"
            aria-labelledby={`accordion-heading-${item.id || index}`}
          >
            <p className="mt-2 pb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {item.answer}
            </p>
            {item.link && (
              <Link
                href={item.link.href}
                className="mb-4 inline-flex items-center gap-x-1.5 text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
              >
                {item.link.label}
                <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

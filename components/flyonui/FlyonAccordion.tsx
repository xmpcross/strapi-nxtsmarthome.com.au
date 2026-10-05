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
}

export default function FlyonAccordion({ items, alwaysOpen = false }: FlyonAccordionProps) {
  return (
    <div className="accordion accordion-border divide-y divide-base-200" data-accordion-always-open={alwaysOpen ? 'true' : undefined}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={`accordion-item ${index === 0 ? 'active' : ''}`}
          id={`accordion-heading-${item.id || index}`}
        >
          <button
            className="accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 text-left font-medium text-base-content hover:text-primary focus:outline-none"
            aria-expanded={index === 0}
            aria-controls={`accordion-content-${item.id || index}`}
          >
            <span className="text-base font-semibold">{item.question}</span>
            <svg
              className="accordion-active:rotate-180 size-4 shrink-0 transition-transform duration-300"
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
            <p className="mt-2 text-sm leading-relaxed text-base-content/80">
              {item.answer}
            </p>
            {item.link && (
              <Link
                href={item.link.href}
                className="mt-3 inline-flex items-center gap-x-1.5 text-sm font-medium text-primary hover:underline"
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

import type { FaqItem } from '@/lib/content';

/**
 * "Questions Answered" card.
 *
 * Every question starts collapsed. The answer markup stays in the DOM rather than
 * being conditionally rendered, so it is still crawlable and still backs the
 * FAQPage structured data while hidden.
 *
 * The reference design carries an "AI-generated" tab on the right edge. That is
 * deliberately not reproduced — this copy is written by hand, and labelling it
 * otherwise would be untrue.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;

  return (
    <section
      className="not-prose mt-12 rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-9 dark:border-slate-700 dark:bg-slate-800/60"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="text-xl font-bold text-slate-900 dark:text-white">
        Questions Answered
      </h2>

      <ul className="mt-6 flex flex-col divide-y divide-slate-200 dark:divide-slate-700">
        {items.map((item) => (
          <li key={item.q} className="py-4 first:pt-0 last:pb-0">
            {/*
              No `open` attribute anywhere: every question starts collapsed.
              <details> keeps this working without JavaScript, and the answer text
              stays in the DOM so it is still indexed and still feeds FAQPage
              structured data even while hidden.
            */}
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 marker:content-none">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600 dark:bg-brand-400"
                />
                <h3 className="min-w-0 flex-1 font-bold leading-snug text-slate-900 dark:text-white">
                  {item.q}
                </h3>
                <svg
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-transform duration-200 group-open:rotate-90 dark:text-slate-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </summary>
              <p className="mt-2 pl-5 leading-relaxed text-slate-500 dark:text-slate-400">
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

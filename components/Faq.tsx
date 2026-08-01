import type { FaqItem } from '@/lib/content';

export default function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;

  return (
    <section className="not-prose mt-12" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="mb-4 text-2xl font-bold text-slate-900 dark:text-white"
      >
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none dark:text-white">
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span
                  className="shrink-0 text-brand-600 transition group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

import type { DescriptionFaq } from '@/lib/description-faq';

/**
 * Product description FAQs as an accordion: the article FAQ design
 * (components/Faq.tsx: one row per question with hairline rules between rows,
 * plus turning to minus when open, transparent background), sized for the
 * product page's Description panel. No rule above the first row.
 *
 * <details> keeps it working without JavaScript, and the answers stay in the
 * DOM, so they are still crawlable while collapsed. Answers are HTML from the
 * build-time catalogue (lib/description-faq.ts).
 */
export default function DescriptionFaqs({ items }: { items: DescriptionFaq[] }) {
  if (!items.length) return null;

  return (
    <section className="not-prose mt-6 bg-transparent" aria-label="Frequently asked questions">
      <h2 className="text-lg font-bold text-[#1d252c] dark:text-white">FAQs</h2>

      <div className="mt-1">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-[#e0e0e0] dark:border-slate-700">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-3.5 marker:content-none [&::-webkit-details-marker]:hidden">
              <h3 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[#1d252c] dark:text-white">
                {item.q}
              </h3>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 text-[#1d252c] dark:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                {/* Vertical stroke: shown closed (+), hidden open (−). */}
                <line x1="12" y1="5" x2="12" y2="19" className="group-open:hidden" />
              </svg>
            </summary>
            <div
              className="pb-4 pr-10 text-sm leading-relaxed text-[#55555a] dark:text-slate-300 [&_p+p]:mt-2"
              dangerouslySetInnerHTML={{ __html: item.aHtml }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

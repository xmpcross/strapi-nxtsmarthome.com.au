import type { Heading } from '@/lib/content';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-8 rounded-[8px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50"
    >
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
        In this guide
      </h2>
      <ol className="space-y-1.5 text-[14px]">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="text-slate-600 hover:text-brand-700 hover:underline dark:text-slate-300 dark:hover:text-brand-400"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

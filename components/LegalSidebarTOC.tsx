'use client';

import { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function LegalSidebarTOC() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all h2 and h3 elements within the main section or article
    const container = document.querySelector('main') || document.body;
    const headingElements = Array.from(container.querySelectorAll('h2, h3'));

    const items: HeadingItem[] = headingElements.map((el, index) => {
      if (!el.id) {
        const slug =
          el.textContent
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `section-${index}`;
        el.id = slug;
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });

    setHeadings(items);

    // ScrollSpy observer to highlight current heading while scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 py-2">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Table of Contents
      </h2>
      <nav aria-label="Legal document navigation">
        <ul className="space-y-2.5 text-[14px] border-l-2 border-slate-200 dark:border-slate-800">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                      history.pushState(null, '', `#${item.id}`);
                    }
                  }}
                  className={`block -ml-[2px] border-l-2 py-1 pl-3.5 text-[14px] leading-snug transition-colors ${
                    item.level === 3 ? 'ml-3 text-[13px]' : 'font-medium'
                  } ${
                    isActive
                      ? 'border-brand-600 font-semibold text-brand-600 dark:border-brand-400 dark:text-brand-400'
                      : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';

const KEY = 'saved-articles';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Save-for-later toggle on a post card.
 *
 * This is a real control, not decoration: it persists to localStorage and the
 * state comes back on the next visit. A bookmark icon that looked live but saved
 * nothing would be worse than no icon at all — the reader would believe the
 * article was kept.
 *
 * It is deliberately local to the browser. There are no accounts on this site, so
 * there is nowhere else for a saved list to live, and it is honest about that
 * rather than implying a synced library.
 */
export default function BookmarkButton({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(read().includes(slug));
    setReady(true);
  }, [slug]);

  const toggle = () => {
    const next = !saved;
    const list = read().filter((s) => s !== slug);
    if (next) list.push(slug);
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {
      /* storage disabled — the toggle still reflects this session */
    }
    setSaved(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={ready ? saved : undefined}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title} for later`}
      title={saved ? 'Saved — click to remove' : 'Save for later'}
      className="bookmark-btn"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

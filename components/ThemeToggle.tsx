'use client';

import { useEffect, useState } from 'react';

/**
 * Light/dark switcher for the header, as a two-option segmented pill.
 *
 * Tailwind is configured with darkMode: 'class', and until now nothing ever put
 * that class on <html> — so every dark: style in the codebase was unreachable.
 * This is what makes them live.
 *
 * Order of precedence: an explicit choice saved in localStorage, otherwise the
 * operating system preference. The inline script in app/layout.tsx applies the
 * same rule before first paint, so there is no flash of the wrong theme; this
 * component only has to read back what that script already decided.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setReady(true);
  }, []);

  // Follow the OS while the reader has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setDark(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const set = (next: boolean) => {
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
  };

  /*
    Segmented pill: sun on the left, moon on the right, with a raised chip behind
    whichever is active.

    The chip is styled through Tailwind's dark: variant rather than from React
    state, so it is correct on the very first paint — driven by the same <html>
    class the pre-paint script sets. Deriving it from state instead would flash
    the wrong half until hydration.
  */
  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800"
    >
      <button
        type="button"
        onClick={() => set(false)}
        aria-label="Switch to light theme"
        title="Light theme"
        aria-pressed={ready ? !dark : undefined}
        className="grid h-7 w-7 place-items-center rounded-full bg-white text-slate-900 shadow-sm transition dark:bg-transparent dark:text-slate-400 dark:shadow-none dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => set(true)}
        aria-label="Switch to dark theme"
        title="Dark theme"
        aria-pressed={ready ? dark : undefined}
        className="grid h-7 w-7 place-items-center rounded-full text-slate-400 transition hover:text-slate-900 dark:bg-slate-700 dark:text-white dark:shadow-sm"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { moreNavLinks, navLinks, searchLink, site } from '@/lib/site';
import SearchModal from './SearchModal';
import ThemeToggle from './ThemeToggle';

function SearchIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);         // mobile drawer
  const [moreOpen, setMoreOpen] = useState(false); // desktop dropdown
  const [searchOpen, setSearchOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click or Escape — a menu you cannot dismiss
  // without navigating is worse than no menu.
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  const linkClass =
    'text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-400';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-card-edge dark:bg-night-50/90">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">
            NXT
          </span>
          <span className="text-slate-900 dark:text-white">
            {site.shortName}
            <span className="ml-1 text-xs font-semibold text-brand-600 dark:text-brand-400">AU</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}

          {moreNavLinks.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 ${linkClass}`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More Articles
                <ChevronIcon />
              </button>

              {/*
                Always in the DOM, hidden with CSS rather than conditionally
                rendered — otherwise these category links never appear in the
                served HTML and no crawler sees them in the navigation.
              */}
              <div
                className={`absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800 ${
                  moreOpen ? '' : 'hidden'
                }`}
              >
                  <ul>
                    {moreNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-brand-400"
                        >
                          <span aria-hidden="true">{link.emoji}</span>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          )}

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={searchLink.label}
            title={searchLink.label}
            className={`-m-1.5 rounded-lg p-1.5 ${linkClass}`}
          >
            <SearchIcon />
          </button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={searchLink.label}
            className={`rounded-lg p-2 ${linkClass}`}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-600 dark:text-slate-200"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 px-4 py-3 lg:hidden dark:border-slate-800">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {moreNavLinks.length > 0 && (
              <li className="pt-2">
                {/* No dropdown on mobile — the drawer is already a list, so the
                    extra categories are simply grouped under a heading. */}
                <p className="px-3 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                  More Articles
                </p>
                <ul className="space-y-1">
                  {moreNavLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span aria-hidden="true">{link.emoji}</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

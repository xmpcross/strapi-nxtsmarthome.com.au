'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
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
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm lg:hidden dark:border-slate-600 dark:text-slate-200"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? '✕' : '☰'}
        </button>
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
          </ul>
        </nav>
      )}
    </header>
  );
}

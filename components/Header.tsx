'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { site } from '@/lib/site';
import type { Nav } from '@/lib/nav';
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

type MenuId = 'products' | 'categories' | 'guides';

/* The nav arrives as a prop because it is fetched from the CMS in the server
   layout — this is a client component and cannot fetch it itself. Destructured
   back into the original names so the markup below reads unchanged. */
export default function Header({ nav }: { nav: Nav }) {
  const {
    guideNavLinks,
    latestNavLink,
    productCategoryNavLinks,
    productsNavLink,
    searchLink,
    topicNavLinks,
  } = nav;

  const [open, setOpen] = useState(false);          // mobile drawer
  const [menu, setMenu] = useState<MenuId | null>(null); // which desktop dropdown
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close on outside click or Escape — a menu you cannot dismiss without
  // navigating is worse than no menu. One listener over the whole nav rather
  // than one ref per dropdown, so adding a fourth menu costs nothing.
  useEffect(() => {
    if (!menu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(null);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  /*
    Hover to open, on the desktop bar only — this nav is `hidden lg:flex`, so
    there is no touch device to worry about here. Click still toggles, which is
    what keyboard users and anyone on a hybrid device get.

    The close is delayed rather than immediate. Each panel is absolutely
    positioned with an 8px offset below its trigger, so the pointer crosses a
    strip that belongs to neither element on its way down; closing on the first
    mouseleave makes the menu vanish exactly as you reach for it. 150ms is long
    enough to cross the gap and short enough not to feel stuck open.
  */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Same ink as a heading — slate-900 light, white dark — rather than the muted
  // body grey the nav carried before, so the top-level links read with the same
  // weight as the section titles they lead to. Hover still shifts to brand.
  const linkClass =
    'text-slate-900 transition hover:text-brand-700 dark:text-white dark:hover:text-brand-400';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-card-edge dark:bg-night-50/90">
      <div className="mx-auto flex max-w-[1366px] items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">
            NXT
          </span>
          <span className="text-slate-900 dark:text-white">
            {site.shortName}
            <span className="ml-1 text-xs font-semibold text-brand-600 dark:text-brand-400">AU</span>
          </span>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {/*
            Grouped by intent: buy something, explore a topic, follow a how-to.
            Each group is one dropdown, which keeps the bar at four items no
            matter how many categories exist.

            Every panel stays in the DOM and hides with CSS. Conditionally
            rendering them would keep these links out of the served HTML, and
            no crawler would ever see the navigation.
          */}

          {/* All Products — the label is a real link, only the chevron opens
              the menu, so the catalogue is never trapped behind a dropdown. */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('products')}
            onMouseLeave={scheduleClose}
          >
            <span className="flex items-center gap-1">
              <Link href={productsNavLink.href} className={linkClass}>
                {productsNavLink.label}
              </Link>
              <button
                type="button"
                onClick={() => setMenu((m) => (m === 'products' ? null : 'products'))}
                className={`-m-1 rounded p-1 ${linkClass}`}
                aria-expanded={menu === 'products'}
                aria-haspopup="true"
                aria-label={`${productsNavLink.label} categories`}
              >
                <ChevronIcon />
              </button>
            </span>

            <div
              className={`absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800 ${
                menu === 'products' ? '' : 'hidden'
              }`}
            >
              <Link
                href={productsNavLink.href}
                onClick={() => setMenu(null)}
                className="block border-b border-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 hover:text-brand-700 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700"
              >
                Browse all products →
              </Link>
              <ul className="pt-1">
                {productCategoryNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenu(null)}
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

          {/* Categories — seven topic hubs, two-up so the panel stays short. */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('categories')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setMenu((m) => (m === 'categories' ? null : 'categories'))}
              className={`flex items-center gap-1 ${linkClass}`}
              aria-expanded={menu === 'categories'}
              aria-haspopup="true"
            >
              Categories
              <ChevronIcon />
            </button>

            <div
              className={`absolute left-0 top-full z-50 mt-2 w-[30rem] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800 ${
                menu === 'categories' ? '' : 'hidden'
              }`}
            >
              <ul className="grid grid-cols-2 gap-x-2">
                {topicNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenu(null)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-brand-400"
                    >
                      <span aria-hidden="true">{link.emoji}</span>
                      <span className="truncate">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/categories/"
                onClick={() => setMenu(null)}
                className="mt-1 block border-t border-slate-100 px-3 pb-1 pt-2 text-sm font-semibold text-brand-700 hover:underline dark:border-slate-700 dark:text-brand-400"
              >
                All topics →
              </Link>
            </div>
          </div>

          {/* Guides & Advice — how-to content, plus the methodology behind it. */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('guides')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setMenu((m) => (m === 'guides' ? null : 'guides'))}
              className={`flex items-center gap-1 ${linkClass}`}
              aria-expanded={menu === 'guides'}
              aria-haspopup="true"
            >
              Guides &amp; Advice
              <ChevronIcon />
            </button>

            <div
              className={`absolute left-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800 ${
                menu === 'guides' ? '' : 'hidden'
              }`}
            >
              <ul>
                {guideNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenu(null)}
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

          <Link href={latestNavLink.href} className={linkClass}>
            {latestNavLink.label}
          </Link>

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
        <nav className="mx-auto max-w-[1366px] border-t border-slate-200 px-4 py-3 lg:hidden dark:border-slate-800">
          <ul className="space-y-1">
            {/* The drawer is already a list, so each group is a labelled
                section rather than a dropdown — no second tap to reach a link. */}
            <li>
              <Link
                href={productsNavLink.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              >
                {productsNavLink.label}
              </Link>
              <ul className="mt-1 space-y-1 border-l border-slate-200 pl-3 dark:border-slate-700">
                {productCategoryNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span aria-hidden="true">{link.emoji}</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="pt-2">
              <p className="px-3 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Categories
              </p>
              <ul className="space-y-1">
                {topicNavLinks.map((link) => (
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

            <li className="pt-2">
              <p className="px-3 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Guides &amp; Advice
              </p>
              <ul className="space-y-1">
                {guideNavLinks.map((link) => (
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

            <li className="pt-2">
              <Link
                href={latestNavLink.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              >
                {latestNavLink.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

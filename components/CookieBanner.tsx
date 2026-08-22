'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Cookie consent banner.
 *
 * This gates real things rather than only recording a click. Two third-party
 * scripts run on this site and both are held back until a choice is made:
 *
 *   Google Analytics  scripts/inject-ga.mjs sets Consent Mode v2 defaults to
 *                     denied before the tag loads, so gtag buffers rather than
 *                     writes. Accepting sends the 'update' that releases it.
 *   Sovrn Commerce    scripts/inject-sovrn.mjs no longer self-starts; it parks
 *                     a loader on window.__nxtLoadSovrn, which is called here.
 *
 * The choice is stored under CONSENT_KEY. The version suffix is deliberate: if
 * the set of scripts changes, bumping it re-asks everyone rather than treating
 * a decision made about the old set as a decision about the new one.
 *
 * Declining is a real decline — neither script runs, and nothing is written
 * beyond the record of the choice itself.
 */

export const CONSENT_KEY = 'nxt.consent.v1';

type Choice = 'granted' | 'denied';

function apply(choice: Choice) {
  if (typeof window === 'undefined') return;

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    __nxtLoadSovrn?: () => void;
  };

  if (choice === 'granted') {
    w.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    w.__nxtLoadSovrn?.();
  }
}

/** Lets the footer reopen the banner so a choice can be changed. */
export function reopenCookieBanner() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* storage unavailable — the banner shows again next visit anyway */
  }
  window.dispatchEvent(new Event('nxt:consent-reopen'));
}

export default function CookieBanner() {
  // Never render on the server pass: the answer depends on localStorage, and
  // guessing it produces a hydration mismatch and a banner that flashes.
  const [show, setShow] = useState(false);

  useEffect(() => {
    const read = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(CONSENT_KEY);
      } catch {
        // Private mode, or storage blocked. Asking again on every visit is the
        // safe failure: it never assumes consent that was not given.
      }
      setShow(stored !== 'granted' && stored !== 'denied');
    };

    read();
    window.addEventListener('nxt:consent-reopen', read);
    return () => window.removeEventListener('nxt:consent-reopen', read);
  }, []);

  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* the choice still applies to this page view */
    }
    apply(choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-heading"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-[1366px] flex-col gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-7 dark:border-card-edge dark:bg-card">
        <div className="min-w-0">
          <h2
            id="cookie-banner-heading"
            className="text-base font-bold text-slate-900 dark:text-white"
          >
            Cookies on this site
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            We use Google Analytics to see which guides are read, and Sovrn Commerce so
            outbound links to retailers can be credited to us. Neither runs until you
            choose. Read our{' '}
            <Link
              href="/cookies/"
              className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
            >
              cookie policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-card-edge dark:text-slate-300 dark:hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

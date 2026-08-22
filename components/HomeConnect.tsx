'use client';

import Link from 'next/link';

/**
 * Closing block: a full-width centred newsletter card.
 */

const NEWSLETTER_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION || '#';

/**
 * Halftone in the top-right corner: a dot field masked so it fades out towards
 * the centre of the card, as in the reference.
 */
function Halftone() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-4 -top-4 hidden h-40 w-64 bg-[radial-gradient(circle,theme(colors.slate.400)_1.3px,transparent_1.3px)] bg-[length:12px_12px] [mask-image:radial-gradient(circle_at_top_right,#000_0%,transparent_72%)] sm:block dark:bg-[radial-gradient(circle,theme(colors.slate.500)_1.3px,transparent_1.3px)]"
    />
  );
}

/** Four-pointed star used as a corner mark. */
export default function HomeConnect() {
  return (
    <section
      className="relative mt-16 overflow-hidden rounded-lg border-0 bg-white px-6 py-16 text-center sm:px-10 sm:py-20 dark:bg-card"
      aria-labelledby="connect-heading"
    >
      <Halftone />
      <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
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
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        Newsletter
      </p>

      <h2
        id="connect-heading"
        className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-white"
      >
        Subscribe to our newsletter and stay updated each week
      </h2>

      <form
        action={NEWSLETTER_ACTION}
        method="post"
        onSubmit={(e) => {
          if (NEWSLETTER_ACTION === '#') {
            e.preventDefault();
            alert('Thank you for subscribing to NXT Smart Home newsletter!');
          }
        }}
        className="mx-auto mt-10 max-w-2xl"
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="w-full max-w-md rounded-full border border-slate-300 bg-white px-7 py-4 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-card dark:text-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-slate-900 px-12 py-4 font-bold text-white transition hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            Send
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          You&rsquo;ll only receive updates on new guides and reviews — no spam.
        </p>

        <label className="mt-4 flex items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <input
            type="checkbox"
            name="terms"
            required
            className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600"
          />
          <span>
            By clicking the button, you are agreeing with our{' '}
            <Link href="/terms/" className="underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-400">
              Terms &amp; Conditions
            </Link>
            .
          </span>
        </label>
      </form>
    </section>
  );
}

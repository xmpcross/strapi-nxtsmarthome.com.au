'use client';

import { useState } from 'react';

/**
 * Share row for single posts.
 *
 * The network links are plain anchors that work without JavaScript. Only "copy
 * link" needs the client, and it degrades to selecting the URL if the clipboard
 * API is unavailable.
 */

interface Props {
  url: string;
  title: string;
  /** `full` shows labels; `compact` is icon-only for the repeat row. */
  variant?: 'full' | 'compact';
  /** `vertical` stacks the icons for the metabar rail. */
  orientation?: 'horizontal' | 'vertical';
}

function Icon({ path }: { path: string }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const X_PATH =
  'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
const FB_PATH =
  'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z';
const LI_PATH =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0';
const LINK_PATH =
  'M3.9 12a5 5 0 0 1 5-5h3v1.9h-3a3.1 3.1 0 0 0 0 6.2h3V17h-3a5 5 0 0 1-5-5m5.6-1h5v2h-5zM15.1 7h-3v1.9h3a3.1 3.1 0 0 1 0 6.2h-3V17h3a5 5 0 0 0 0-10';

export default function ShareButtons({ url, title, variant = 'full', orientation = 'horizontal' }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, path: X_PATH },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, path: FB_PATH },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, path: LI_PATH },
  ];

  const btn =
    // Theme tokens rather than raw slate: card surface and card-edge border in dark,
    // brand accent on hover, so the rail tracks the scheme like every other card.
    'inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-card-edge dark:bg-card dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-brand-950 dark:hover:text-brand-400';

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', url);
    }
  }

  return (
    <div
      className={
        orientation === 'vertical'
          ? 'flex flex-col items-center gap-2'
          : 'flex flex-wrap items-center gap-2'
      }
    >
      {variant === 'full' && (
        <span className="mr-1 text-sm font-semibold text-slate-500 dark:text-slate-400">Share</span>
      )}
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.name}`}
          className={btn}
        >
          <Icon path={l.path} />
          {variant === 'full' && <span>{l.name}</span>}
        </a>
      ))}
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        <Icon path={LINK_PATH} />
        {variant === 'full' && <span>{copied ? 'Copied' : 'Copy link'}</span>}
      </button>
    </div>
  );
}

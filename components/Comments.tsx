'use client';

import { useEffect, useState } from 'react';

/**
 * Comments section.
 *
 * There is no server here — the site is a static export — so the form posts to
 * NEXT_PUBLIC_COMMENTS_ACTION, defaulting to /api/comment, which nginx proxies
 * to a small handler on this host.
 *
 * A submitted comment is emailed for moderation, not published. On a static
 * site a comment can only become visible once it is added to the article and
 * the site is rebuilt, so a human step is unavoidable — and the reader is told
 * that rather than being shown "posted!" for something nobody will see yet.
 *
 * The thread above the form renders only real comments. It is empty because there
 * are none — no placeholder author, no sample text, and no count that is not true.
 */

const ACTION = process.env.NEXT_PUBLIC_COMMENTS_ACTION ?? '/api/comment';
const REMEMBER_KEY = 'comment-author';

export interface Comment {
  id: string;
  author: string;
  date: string;
  body: string;
}

export default function Comments({
  slug,
  comments = [],
}: {
  slug: string;
  comments?: Comment[];
}) {
  const [details, setDetails] = useState({ name: '', email: '', website: '' });
  const [remember, setRemember] = useState(false);

  // "Save my details in this browser" is a real setting, not a decorative
  // checkbox: it reads back on the next visit and clears when unticked.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(REMEMBER_KEY);
      if (raw) {
        setDetails(JSON.parse(raw));
        setRemember(true);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, JSON.stringify(details));
      else localStorage.removeItem(REMEMBER_KEY);
    } catch {
      /* storage unavailable */
    }

    setState('sending');
    setError('');
    try {
      const response = await fetch(ACTION, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: details.name,
          email: details.email,
          website: details.website,
          message: String(data.get('comment') ?? '').trim(),
          elapsedMs: 5000, // the handler's timing guard; a typed comment is never instant
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `The server replied ${response.status}.`);
      }
      setState('sent');
      form.reset();
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : 'The comment could not be sent.');
    }
  };

  const field =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-card-edge dark:bg-card dark:text-white';

  return (
    <section className="not-prose mt-12" aria-labelledby="comments-heading">
      <h2
        id="comments-heading"
        className="border-b border-slate-200 pb-3 text-base font-bold text-slate-900 dark:border-card-edge dark:text-white"
      >
        {comments.length === 0
          ? 'Comments'
          : `${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`}
      </h2>

      {comments.length > 0 && (
        <ul className="mt-6 flex flex-col gap-8">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-5">
              <span
                aria-hidden="true"
                className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded bg-slate-100 text-slate-400 dark:bg-night-100"
              >
                <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-3">
                  <span className="font-bold text-slate-900 dark:text-white">{c.author}</span>
                  <time dateTime={c.date} className="text-sm text-slate-500 dark:text-slate-400">
                    {c.date}
                  </time>
                </p>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-10 text-3xl font-bold text-slate-900 dark:text-white">
        Leave a comment
      </h3>

      {ACTION ? (
        <form action={ACTION} method="post" onSubmit={onSubmit} className="mt-3">
          <input type="hidden" name="article" value={slug} />

          <p className="text-slate-600 dark:text-slate-400">
            Your email address will not be published. Required fields are marked{' '}
            <span className="text-brand-600">*</span>
          </p>

          <label htmlFor="comment-body" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment-body"
            name="comment"
            required
            rows={6}
            placeholder="Enter Your Comment"
            className={`mt-5 ${field}`}
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="comment-name" className="sr-only">
                Your name
              </label>
              <input
                id="comment-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Enter Name"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="comment-email" className="sr-only">
                Your email address
              </label>
              <input
                id="comment-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter Email"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className={field}
              />
            </div>
          </div>

          <label htmlFor="comment-website" className="sr-only">
            Your website
          </label>
          <input
            id="comment-website"
            name="website"
            type="url"
            autoComplete="url"
            placeholder="Enter Website"
            value={details.website}
            onChange={(e) => setDetails({ ...details, website: e.target.value })}
            className={`mt-4 ${field}`}
          />

          <label className="mt-4 flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-card-edge"
            />
            <span>
              Save my name, email, and website in this browser for the next time I comment.
            </span>
          </label>

          {state === 'sent' && (
            <p className="mt-6 rounded-lg border border-emerald-600/20 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
              Thanks — your comment has been sent for moderation. Comments appear on the article
              once they are approved and the page is next published.
            </p>
          )}

          {state === 'error' && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-red-600/20 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'sending' || state === 'sent'}
            className="mt-6 rounded-lg bg-slate-900 px-8 py-4 font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white"
          >
            {state === 'sending' ? 'Sending…' : state === 'sent' ? 'Sent' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="mt-3 max-w-xl rounded-lg border border-dashed border-slate-300 p-5 text-sm leading-relaxed text-slate-500 dark:border-card-edge dark:text-slate-400">
          Comments are closed on this article. You can still reach us on the{' '}
          <a href="/contact/" className="font-semibold underline underline-offset-4">
            contact page
          </a>
          .
        </p>
      )}
    </section>
  );
}

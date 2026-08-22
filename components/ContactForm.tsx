'use client';

import { useState } from 'react';

/**
 * Contact form for a statically exported site.
 *
 * There is no server behind these pages — `output: 'export'` means nginx serves
 * files and nothing else — so the form posts to a small handler of our own at
 * NEXT_PUBLIC_CONTACT_ENDPOINT rather than to a Next route handler, which
 * cannot exist here.
 *
 * Two things guard it, neither of which asks the reader to prove they are human:
 *
 *   A honeypot field, hidden from people and left empty by them, filled in by
 *   most naive bots. Named `company` rather than anything with "bot" or "hp" in
 *   it, since the name is visible in the DOM.
 *
 *   A render timestamp. A submission that arrives within a couple of seconds of
 *   the page rendering was not typed by a person.
 *
 * Both are checked server-side. Doing it here only would stop nothing.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/api/contact';

type State = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS = [
  'Correction to an article',
  'Coverage request',
  'PR or review unit',
  'Something else',
] as const;

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [renderedAt] = useState(() => Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState('sending');
    setError('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          topic: String(data.get('topic') ?? ''),
          message: String(data.get('message') ?? '').trim(),
          company: String(data.get('company') ?? ''), // honeypot
          elapsedMs: Date.now() - renderedAt,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `The server replied ${response.status}.`);
      }

      setState('sent');
      form.reset();
    } catch (e) {
      // Say what actually failed. "Something went wrong" tells the reader
      // nothing and hides a broken endpoint from us for weeks.
      setState('error');
      setError(e instanceof Error ? e.message : 'The message could not be sent.');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-600/20 bg-emerald-50 p-6 dark:border-emerald-400/20 dark:bg-emerald-950/30">
        <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">Message sent</h2>
        <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
          Thanks — we read everything. If it needs a reply you will get one, usually within a few
          days.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 text-sm font-semibold text-emerald-900 underline underline-offset-4 dark:text-emerald-200"
        >
          Send another
        </button>
      </div>
    );
  }

  const field =
    'mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 ' +
    'placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 ' +
    'dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500';
  const label = 'block text-sm font-semibold text-slate-900 dark:text-slate-200';

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className={label}>
          What is this about?
        </label>
        <select id="topic" name="topic" className={field} defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea id="message" name="message" required rows={7} className={field} />
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          For a correction, please include the article URL and what is wrong.
        </p>
      </div>

      {/* Honeypot. Hidden from people, not from bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-300"
        >
          {/* The server's message already tells the reader what to do next -
              appending advice here produced "Please email us instead. You can
              also email us directly." */}
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

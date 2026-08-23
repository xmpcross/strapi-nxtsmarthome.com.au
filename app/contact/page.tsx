import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with NXT Smart Home — corrections, questions and coverage requests.',
  alternates: { canonical: '/contact/' },
};

/**
 * Contact: a form, and the things worth knowing before you use it.
 *
 * No sidebar. The legal pages keep their table of contents because they are
 * long and cross-referenced; this page is one screen and a form, and a nav rail
 * beside it only pushed the form into a column half the width of the viewport.
 */

const NOTES = [
  {
    title: 'Corrections',
    body: 'If we have published something inaccurate, tell us. Include the article URL and what is wrong. We fix errors and note the correction rather than quietly editing.',
  },
  {
    title: 'Coverage requests',
    body: 'Want us to cover a device, a platform or a problem you are stuck on? Reader requests genuinely shape what we write next, especially for Australian-specific questions no one else is answering.',
  },
  {
    title: 'PR and review units',
    body: 'We accept review units on the condition that there is no agreement, expressed or implied, about what we will say. We do not return units in exchange for coverage, we do not send articles for approval before publication, and we disclose loaned hardware in the article. We do not publish sponsored posts or paid link placements.',
  },
  {
    title: 'Support with your own setup',
    body: 'We are a publication, not a support desk, so we cannot troubleshoot individual installations. For device faults, contact the manufacturer or the retailer you bought from — under Australian Consumer Law the retailer carries the obligation.',
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1366px] px-4 py-14 sm:px-6 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl dark:text-white">Contact</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Corrections, coverage requests, or anything else. We read everything that arrives.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Prefer email?{' '}
          <a
            href={`mailto:${site.organisation.email}`}
            className="font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700 dark:text-brand-400"
          >
            {site.organisation.email}
          </a>
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
          <ContactForm />
        </div>

        {/* Right-hand column, not a nav sidebar: context for the form rather
            than links away from it. Stacks under the form on narrow screens. */}
        <aside className="space-y-7">
          {NOTES.map((note) => (
            <section key={note.title}>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{note.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {note.body}
              </p>
            </section>
          ))}
        </aside>
      </div>
    </div>
  );
}

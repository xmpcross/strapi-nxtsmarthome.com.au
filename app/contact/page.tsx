import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { FOCUS } from '@/components/category/shared';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact NXT Smart Home',
  description: 'Get in touch with NXT Smart Home — corrections, coverage requests, PR and anything else.',
  alternates: { canonical: '/contact/' },
};

/**
 * Contact: the form first, starting with what the message is about, and beside
 * it who you are writing to and where to go for help with your own setup.
 *
 * The per-topic guidance (corrections, coverage, PR and review units) lives in
 * the form (components/ContactForm.tsx), shown for the topic chosen, so the
 * reader does not have to read four notes to find the one that applies.
 */
export default function ContactPage() {
  return (
    <div className="page-contact">
      <header className="container pt-8 lg:pt-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          <Link href="/" className={`hover:text-neutral-900 dark:hover:text-white ${FOCUS}`}>
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-neutral-900 dark:text-white" aria-current="page">
            Contact
          </span>
        </nav>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl dark:text-white">Contact</h1>
        <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-neutral-300">
          Corrections, coverage requests, or anything else. We read everything that arrives. Prefer email? Write to{' '}
          <a
            href={`mailto:${site.organisation.email}`}
            className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
          >
            {site.organisation.email}
          </a>
          .
        </p>
      </header>

      <div className="container pt-12 pb-20 lg:pt-14 lg:pb-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-20">
          <ContactForm />

          {/* Context for the form rather than links away from it. Stacks under
              the form on narrow screens. */}
          <aside className="space-y-10">
            <section aria-labelledby="who-heading" className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <h2 id="who-heading" className="text-lg font-bold text-neutral-900 dark:text-white">
                Who you are contacting
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
                {site.name} is published by {site.organisation.operator}. {site.organisation.editor.name} is the editor,
                responsible for what the site publishes.
              </p>
              {/*
                TODO(owner): add the business postal address here, e.g.
                  <address className="mt-2 not-italic text-neutral-700 dark:text-neutral-300">
                    Street, Suburb STATE Postcode, Country
                  </address>
                A registered or mailing address is what AdSense reviewers and
                readers look for on a contact page. The operator name comes from
                site.organisation.operator in lib/site.ts (itself pending a
                [VERIFY] on which entity to name).
              */}
              <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                Email:{' '}
                <a
                  href={`mailto:${site.organisation.email}`}
                  className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                >
                  {site.organisation.email}
                </a>
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                If a message needs a reply, you will usually hear back within a few days.
              </p>
            </section>

            <section aria-labelledby="setup-heading" className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <h2 id="setup-heading" className="text-lg font-bold text-neutral-900 dark:text-white">
                Need help with your own setup?
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
                We are a publication, not a support desk, so we cannot troubleshoot individual installations. These may
                help:
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/categories/setup-guides/"
                    className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                  >
                    Setup guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/setup-guides/fix-smart-home-wifi-dropouts/"
                    className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                  >
                    Fix devices that keep dropping off Wi-Fi
                  </Link>
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
                For a faulty device, contact the manufacturer or the retailer you bought it from. The ACCC explains your
                rights under Australian Consumer Law.
              </p>
            </section>

            <section aria-labelledby="policies-heading" className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <h2 id="policies-heading" className="text-lg font-bold text-neutral-900 dark:text-white">
                How we work
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/how-we-test/" className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}>
                    How we research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliate-disclosure/"
                    className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}
                  >
                    Affiliate disclosure
                  </Link>
                </li>
                <li>
                  <Link href="/privacy/" className={`font-semibold text-primary-600 underline underline-offset-4 dark:text-primary-400 ${FOCUS}`}>
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

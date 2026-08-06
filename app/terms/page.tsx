import type { Metadata } from 'next';
import Link from 'next/link';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms that apply when you use NXT Smart Home — what our content is and is not, affiliate relationships, and your rights under Australian Consumer Law.',
  alternates: { canonical: '/terms/' },
};

{
  /*
    [VERIFY] LEGAL — human review required before relying on this page.
    Written to be accurate about how this site actually operates, but it is not
    legal advice and has not been reviewed by a lawyer. Two things in particular
    need a decision or a check:
      1. Governing law names the state below — confirm it matches where the
         business is actually established.
      2. Australian Consumer Law guarantees cannot be excluded. The liability
         section is drafted to sit under the ACL rather than override it, but a
         lawyer should confirm the wording.
    See CLAUDE.md rule 6.
  */
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1366px] px-4 py-12 sm:px-6">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Terms and conditions
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: 3 August 2026
          </p>

          <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
            <p>
              These terms apply when you use {site.domain}. By browsing the site you accept them. If
              you do not, please stop using the site.
            </p>

            <h2>What this site is</h2>
            <p>
              {site.name} publishes reviews, comparisons, buying guides and setup tutorials about
              smart home technology, written for an Australian audience. Everything here is{' '}
              <strong>general information only</strong>. It is not professional advice and it is not
              tailored to your circumstances.
            </p>
            <p>
              This matters most where we write about electrical work, privacy and surveillance law, or
              renting. Those areas are governed by legislation that differs between states and
              territories and changes over time. Nothing on this site is legal advice or a
              substitute for a licensed electrician, a lawyer, or your own tenancy agreement. Always
              confirm your obligations before acting, and use a licensed electrician for any work
              that requires one.
            </p>

            <h2>Accuracy, prices and availability</h2>
            <p>
              We try hard to be accurate and to say plainly what we have tested and what we have not.
              Even so, product specifications, prices, stock and retailer terms change constantly, and
              we do not display live pricing. Any price or availability mentioned was correct at the
              time of writing only. Always confirm current details on the retailer&apos;s own site
              before you buy.
            </p>

            <h2>Affiliate links</h2>
            <p>
              Some outbound links to retailers are affiliate links. If you buy through one, we may
              earn a commission at no additional cost to you. This never changes what we recommend or
              what we say about a product. Full detail is in our{' '}
              <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
            </p>

            <h2>Third-party sites</h2>
            <p>
              When you follow a link to a retailer or manufacturer you leave this site and become
              subject to their terms and privacy practices. We do not control those sites and are not
              responsible for their content, pricing, delivery, warranty handling or customer service.
            </p>

            <h2>Our content</h2>
            <p>
              The written content, images and layout of this site belong to {site.organisation.name}{' '}
              unless stated otherwise. You are welcome to quote a short extract with clear
              attribution and a link back. Republishing whole articles, or using our content to train
              or fine-tune AI models, is not permitted without written permission.
            </p>
            <p>
              Product names, brands and logos belong to their respective owners and are used for
              identification only.
            </p>

            <h2>Liability</h2>
            <p>
              Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or
              remedy you have under the Australian Consumer Law or other legislation that cannot
              lawfully be excluded.
            </p>
            <p>
              Subject to that, the site is provided on an &quot;as is&quot; basis and, to the extent
              permitted by law, we are not liable for loss arising from your use of the site or from
              decisions made in reliance on it. You are responsible for your own purchasing decisions
              and for arranging any licensed work your installation requires.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms as the site changes. The date at the top shows when they were
              last revised. Continuing to use the site after a change means you accept the revised
              terms.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of Australia, and you submit to the non-exclusive
              jurisdiction of its courts.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can go to{' '}
              <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>, or through
              our <Link href="/contact/">contact page</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

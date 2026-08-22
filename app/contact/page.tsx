import type { Metadata } from 'next';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with NXT Smart Home — corrections, questions and coverage requests.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1366px] px-4 py-12 sm:px-6">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Contact
          </h1>

          <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
            <p>
              The fastest way to reach us is email:{' '}
              <a href={`mailto:${site.organisation.email}`}>{site.organisation.email}</a>
            </p>

            <h2>Corrections</h2>
            <p>
              If we have published something inaccurate, please tell us. Include the article URL and
              what is wrong. We fix errors and note the correction rather than quietly editing.
            </p>

            <h2>Coverage requests</h2>
            <p>
              Want us to cover a device, a platform or a problem you are stuck on? Send it through.
              Reader requests genuinely shape what we write next, especially for Australian-specific
              questions no one else is answering.
            </p>

            <h2>PR and review units</h2>
            <p>
              We accept review units on the condition that there is no agreement, expressed or
              implied, about what we will say. We do not return units in exchange for coverage, we
              do not send articles for approval before publication, and we disclose loaned hardware
              in the article. We do not publish sponsored posts or paid link placements.
            </p>

            <h2>Support with your own setup</h2>
            <p>
              We are a publication, not a support desk, so we cannot troubleshoot individual
              installations. For device faults, contact the manufacturer or the retailer you bought
              from — under Australian Consumer Law the retailer carries the obligation.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

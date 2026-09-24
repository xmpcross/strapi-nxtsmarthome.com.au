import type { Metadata } from 'next';
import Link from 'next/link';
import LegalSidebarTOC from '@/components/LegalSidebarTOC';
import { ADS_ENABLED } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'How We Research and Review',
  description:
    'How NXT Smart Home guides are researched: what each article type means, where our information comes from, and why we do not score products we have not tested.',
  alternates: { canonical: '/how-we-test/' },
};

export default function HowWeTestPage() {
  return (
    <div className="container py-14 lg:py-20">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12 items-start">
        <LegalSidebarTOC />
        <main className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl xl:text-5xl dark:text-white">
            How we research and review
          </h1>

          {/*
            Rewritten Sept 2026 to describe what the site actually does. The
            previous version promised hands-on testing "for at least two weeks"
            and 1–5 scores; no article on the site is a hands-on review, and
            none carries a score. If a genuine hands-on review is ever
            published, add the method used for it here — do not restore the old
            claims wholesale.
          */}
          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-h2:mt-0 prose-h2:pt-0 prose-h3:mt-0 prose-h3:pt-0">
            <h2>Our articles are research-based, not hands-on reviews</h2>
            <p>
              Everything currently published on NXT Smart Home is research-based: buying guides,
              comparisons, explainers, how-to guides and roundups built from manufacturer
              documentation, published specifications, Australian standards and regulator guidance,
              and retailer information. We have not run hands-on tests of the products we write
              about, and we do not present our guides as if we had.
            </p>
            <p>
              That is why you will not find star ratings or scores from us anywhere on this site. A
              score implies testing, and we are not going to imply testing that did not happen.
            </p>

            <h2>What each article type means</h2>
            <p>Every article is labelled with its type, so you know what you are reading:</p>
            <ul>
              <li>
                <strong>Buying guide</strong> — how to choose in a category: what matters, what is
                marketing, and what to check before you buy in Australia.
              </li>
              <li>
                <strong>Comparison</strong> — two or more products or standards side by side, based
                on their published specifications and documented behaviour.
              </li>
              <li>
                <strong>How-to</strong> — step-by-step setup or troubleshooting, based on the
                manufacturer&apos;s instructions and documentation.
              </li>
              <li>
                <strong>Explainer</strong> — how a technology, standard or rule works, from the
                published specification or official source.
              </li>
              <li>
                <strong>Roundup</strong> — a shortlist for a category, chosen on documented features,
                Australian availability and fit for a stated need.
              </li>
              <li>
                <strong>Complete guide</strong> — a longer hub article that links to the related
                guides on a topic.
              </li>
              <li>
                <strong>Review</strong> — reserved for genuine hands-on reviews. We have not published
                any yet. When we do, the review will say how the device was used, for how long, and
                in what kind of home.
              </li>
            </ul>

            <h2>Where our information comes from</h2>
            <p>
              For technical claims — protocol behaviour, power ratings, standards compliance — we
              work from the published specification or the manufacturer&apos;s own documentation
              rather than repeating what other sites say. For electrical, privacy and tenancy
              matters we point to the relevant Australian standard, regulator or official guidance,
              and we tell you when a job legally requires a licensed electrician rather than
              presenting it as DIY.
            </p>
            <p>
              Prices change daily, so our guides do not state them. Product pages show prices from
              Australian retailers with the date they were last checked, and link to the retailer
              so you can confirm the current price before buying.
            </p>

            <h2>Fact-checking before publication</h2>
            <p>
              Any figure or legal, electrical or safety claim that has not been confirmed against a
              source is flagged for a fact-check while an article is being prepared. An article with
              an open fact-check flag is not published.
            </p>

            <h2>Customer reviews on product pages</h2>
            <p>
              Some product pages show customer reviews from Australian retailers. They are the
              retailer&apos;s customers&apos; words, clearly labelled as such, and are not written,
              edited or verified by us. We show an overall score from them only when there are
              enough of them to mean something.
            </p>

            <h2>Corrections</h2>
            <p>
              We get things wrong sometimes. When we do, we fix the article and update its date so
              you can see how current the advice is. If you spot an error,{' '}
              <Link href="/contact/">tell us</Link> — we would genuinely rather know.
            </p>

            <h2>Our commercial relationships</h2>
            <p>
              {ADS_ENABLED
                ? 'We earn affiliate commission on some outbound links, and the site displays advertising. Neither affects what we write.'
                : 'We earn affiliate commission on some outbound links. It does not affect what we write.'}{' '}
              The full detail is on our{' '}
              <Link href="/affiliate-disclosure/">affiliate disclosure</Link> page. We do not accept
              payment for coverage, and we do not let manufacturers approve articles before
              publication.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

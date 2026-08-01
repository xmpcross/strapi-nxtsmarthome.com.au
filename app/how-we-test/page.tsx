import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Test and Review',
  description:
    'Our review methodology: what we test hands-on, what we research, how we score, and how we tell you the difference.',
  alternates: { canonical: '/how-we-test/' },
};

export default function HowWeTestPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        How we test and review
      </h1>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <h2>We tell you what kind of article you&apos;re reading</h2>
        <p>
          The most dishonest thing a review site can do is present desk research as hands-on
          testing. We label every article by type so you know what you are getting:
        </p>
        <ul>
          <li>
            <strong>Review</strong> — we have used the device in a real home, usually for at
            least two weeks.
          </li>
          <li>
            <strong>Comparison</strong> — a head-to-head between products, based on a mix of
            hands-on use and documented specifications.
          </li>
          <li>
            <strong>Buying guide</strong> — a decision framework. Focused on how to choose
            rather than on a single verdict.
          </li>
          <li>
            <strong>How-to</strong> — step-by-step instructions we have followed ourselves.
          </li>
          <li>
            <strong>Explainer</strong> — how a technology or standard works, based on the
            published specification.
          </li>
          <li>
            <strong>Roundup</strong> — a curated shortlist for a category.
          </li>
        </ul>
        <p>
          Where a roundup includes a product we have not personally used, we say so in the entry
          rather than implying otherwise.
        </p>

        <h2>What we actually test</h2>
        <p>When a device is in our hands, we look at the things that decide whether you keep using it:</p>
        <ul>
          <li>
            <strong>Setup friction.</strong> How long from box to working, how many apps and
            accounts, and how often the pairing fails on the first attempt.
          </li>
          <li>
            <strong>Reliability over time.</strong> Anything can work on day one. We care about
            whether it still responds on day 30, and how it recovers from a router reboot or a
            power cut.
          </li>
          <li>
            <strong>Latency.</strong> The gap between the trigger and the action. A light that
            takes two seconds feels broken even though it works.
          </li>
          <li>
            <strong>Local vs cloud.</strong> Whether the device still functions when the
            internet drops. This matters more in Australia than vendors admit.
          </li>
          <li>
            <strong>Ecosystem behaviour.</strong> How it behaves in Apple Home, Google Home,
            Alexa and Home Assistant — not just in the vendor&apos;s own app.
          </li>
          <li>
            <strong>Australian fit.</strong> Plug type, 240V/50Hz compatibility, AU app store
            availability, local warranty support, and whether the AU model differs from the US
            one reviewed everywhere else.
          </li>
        </ul>

        <h2>How we score</h2>
        <p>
          Ratings run from 1 to 5. A 3 is genuinely fine — it means the product does its job
          without excelling. We do not inflate everything to 4.5 to keep manufacturers happy. A
          score reflects value at the price we saw it at; a great device at a bad price scores
          lower than a good device at a fair one.
        </p>

        <h2>Where our information comes from</h2>
        <p>
          For technical claims — protocol behaviour, power ratings, standards compliance — we
          cite the published specification or the manufacturer&apos;s own documentation rather
          than repeating what other blogs say. For electrical and regulatory matters we point to
          the relevant Australian standard or regulator, and we tell you when a job legally
          requires a licensed electrician instead of pretending it is a DIY task.
        </p>

        <h2>Corrections</h2>
        <p>
          We get things wrong sometimes. When we do, we fix the article and note the change
          rather than quietly editing it. Articles carry an &quot;updated&quot; date so you can
          see how current the advice is. If you spot an error,{' '}
          <Link href="/contact/">tell us</Link> — we would genuinely rather know.
        </p>

        <h2>Our commercial relationships</h2>
        <p>
          We earn affiliate commission on some outbound links. It does not affect our verdicts.
          The full detail is on our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>{' '}
          page. We do not accept payment for a positive review, and we do not let manufacturers
          approve articles before publication.
        </p>
      </div>
    </div>
  );
}

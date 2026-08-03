import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why NXT Smart Home exists: smart home advice written for Australian homes, wiring, retailers and consumer law.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        About {site.name}
      </h1>

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p className="lead">
          Almost every smart home article you find online was written for an American house. It
          assumes 120V wiring, a neutral wire in every switch box, US retailers, US warranty law
          and US product availability. Follow it here and you will buy the wrong bulb fitting,
          plan an installation that is illegal to do yourself, and get a warranty that
          isn&apos;t honoured.
        </p>

        <h2>What we do differently</h2>
        <p>
          {site.name} writes smart home advice from an Australian starting point. That means
          being specific about the things that actually differ:
        </p>
        <ul>
          <li>
            <strong>240V / 50Hz and AS/NZS 3000.</strong> What you can legally wire yourself
            here (very little) and what needs a licensed electrician.
          </li>
          <li>
            <strong>Bayonet fittings.</strong> B22 is common in older Australian homes and
            almost unheard of in US product ranges.
          </li>
          <li>
            <strong>Local availability and pricing.</strong> Whether a product is actually sold
            here, and what the parallel-import trade-off costs you in warranty terms.
          </li>
          <li>
            <strong>Australian Consumer Law.</strong> Your statutory guarantees are stronger
            than a manufacturer&apos;s warranty, and worth knowing.
          </li>
          <li>
            <strong>Our climate and our grid.</strong> Time-of-use tariffs, feed-in tariffs,
            rooftop solar, bushfire smoke, humidity — these shape which automations are worth
            building.
          </li>
        </ul>

        <h2>Written here, useful anywhere</h2>
        <p>
          Most of what we cover — how Matter and Thread work, how to structure automations, how
          to stop devices dropping off Wi-Fi, how to think about privacy — is universal. If you
          are reading from outside Australia you will still get the value; you will just find
          the occasional note about local wiring rules that does not apply to you.
        </p>

        <h2>Independence</h2>
        <p>
          We are reader-supported through affiliate commission, explained in full on our{' '}
          <Link href="/affiliate-disclosure/">disclosure page</Link>. We do not sell sponsored
          reviews, and manufacturers do not get to see articles before they go live. Our{' '}
          <Link href="/how-we-test/">testing methodology</Link> spells out what we have used
          hands-on versus what we have researched, because conflating the two is the main way
          review sites mislead people.
        </p>

        <h2>Not electrical advice</h2>
        <p>
          Our guides are general information, not a substitute for a licensed professional. In
          Australia, fixed electrical wiring work must be carried out by a licensed
          electrician. Where an article touches on wiring, we say plainly where the DIY line
          sits. Please do not treat a blog post as authority to open a switch plate.
        </p>

        <h2>Get in touch</h2>
        <p>
          Corrections, questions and requests for what to cover next are all welcome —{' '}
          <Link href="/contact/">contact us here</Link>.
        </p>
      </div>
    </div>
  );
}

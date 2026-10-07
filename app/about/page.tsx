import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { getAllAuthors, resolveAuthor, type Author } from '@/lib/authors';
import { site } from '@/lib/site';
import { ADS_ENABLED } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who runs NXT Smart Home, how our research-based guides are written, and how the site is funded: smart home advice for Australian homes, wiring, retailers and consumer law.',
  alternates: { canonical: '/about/' },
};

// Author counts come from Strapi, like the author pages.
export const revalidate = 300;

/*
 * The three photographs in public/images/about/ were generated for this page
 * (fal.ai FLUX, Sept 2026): Australian home interiors with plain, unbranded
 * devices and no people. They illustrate; they are not photos of our team,
 * our homes or any product we have used, and nothing on the page says they are.
 */
const differences = [
  {
    title: '240V / 50Hz and AS/NZS 3000',
    body: 'What you can legally wire yourself here (very little) and what needs a licensed electrician.',
  },
  {
    title: 'Bayonet fittings',
    body: 'B22 is common in older Australian homes and almost unheard of in US product ranges.',
  },
  {
    title: 'Local availability and pricing',
    body: 'Whether a product is actually sold here, and what a parallel import costs you in warranty terms.',
  },
  {
    title: 'Australian Consumer Law',
    body: 'Your statutory guarantees are stronger than a manufacturer’s warranty, and worth knowing.',
  },
  {
    title: 'Our climate and our grid',
    body: 'Time-of-use and feed-in tariffs, rooftop solar, bushfire smoke and humidity shape which automations are worth building.',
  },
  {
    title: 'Renters and strata',
    body: 'What you can install without drilling, rewiring or risking your bond, and what needs permission first.',
  },
];

const policies = [
  {
    title: 'Research, not hands-on testing',
    body: (
      <>
        Our articles are research-based buying guides, comparisons, explainers and how-to guides.
        We do not score products, and we do not present research as testing.{' '}
        <Link href="/how-we-test/">How we research</Link> explains what each article type means.
      </>
    ),
  },
  {
    title: 'AI-assisted drafting',
    body: (
      <>
        Some articles are drafted with the help of AI writing tools, then published under the name
        of the contributor responsible for them. Figures and legal, electrical or safety claims are
        flagged for a fact-check, and an article is not published while a flag is open.
      </>
    ),
  },
  {
    title: 'Corrections',
    body: (
      <>
        When we get something wrong we fix the article and update its date, rather than editing it
        quietly. Spotted an error? <Link href="/contact/">Tell us</Link>.
      </>
    ),
  },
  {
    title: 'Independence',
    body: (
      <>
        We do not accept payment for coverage, and manufacturers do not see or approve articles
        before they are published.
      </>
    ),
  },
  {
    title: 'How affiliate links work',
    body: (
      <>
        Some links to retailers are affiliate links: if you buy after clicking one, the retailer may
        pay us a commission at no extra cost to you. It never decides what we recommend. Details are
        on our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
      </>
    ),
  },
  // Only while ads are actually switched on (lib/ads.ts).
  ...(ADS_ENABLED ? [{
    title: 'Advertising',
    body: (
      <>
        The site also shows advertising. Ads are labelled and kept separate from editorial content,
        and advertisers have no say in what we write. See our <Link href="/privacy/">privacy policy</Link>{' '}
        for how ad cookies work.
      </>
    ),
  }] : []),
];

function Avatar({ author, size }: { author: Author; size: string }) {
  return author.avatar ? (
    // Photos are served by the CMS; next/image is unoptimised site-wide anyway.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={author.avatar} alt={author.name} className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300`}
    >
      {author.initials}
    </span>
  );
}

export default async function AboutPage() {
  const articles = await getAllArticles();
  const countFor = (slug: string) => articles.filter((a) => resolveAuthor(a.author).slug === slug).length;

  const { operator, editor: editorRef } = site.organisation;
  const editor = getAllAuthors().find((a) => a.slug === editorRef.slug);
  // Named contributors with something published; the editorial default is not a person.
  const contributors = getAllAuthors().filter(
    (a) => a.slug !== editorRef.slug && a.slug !== 'nxt-smart-home-editorial' && countFor(a.slug) > 0,
  );

  return (
    <div className="pb-20 lg:pb-28">
      {/* Hero */}
      <section className="container pt-12 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              About {site.name}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              Smart home advice written for Australian homes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              Almost every smart home article online was written for an American house: 120V
              wiring, a neutral wire in every switch box, US retailers and US warranty law. Follow it
              here and you buy the wrong bulb fitting, plan an installation that is illegal to do
              yourself, and end up with a warranty that isn&apos;t honoured. We write from an
              Australian starting point instead.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/articles/"
                className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
              >
                Read the guides
              </Link>
              <Link
                href="/how-we-test/"
                className="inline-flex items-center rounded-lg border border-neutral-300 px-5 py-2.5 font-semibold text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                How we research
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/hero.webp"
            alt="A bright Australian living room with timber floors and a leafy garden outside"
            width={1024}
            height={576}
            className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* What we do differently */}
      <section className="container mt-20 lg:mt-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What we do differently
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            We are specific about the things that actually differ here.
          </p>
        </div>
        <div className="mt-10 grid gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
          {differences.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{d.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-neutral-600 dark:text-neutral-300">
          Most of what we cover — how Matter and Thread work, how to structure automations, how to
          stop devices dropping off Wi-Fi — is universal. Reading from outside Australia, you will
          still get the value, plus the occasional note about local wiring rules that does not apply
          to you.
        </p>
      </section>

      {/* How we work */}
      <section className="container mt-20 lg:mt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/research.webp"
            alt="A home office desk with a laptop, printed product manuals and small smart home devices"
            width={1024}
            height={576}
            loading="lazy"
            className="order-last aspect-[16/10] w-full rounded-2xl object-cover shadow-lg lg:order-first"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              How our guides are made
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
              Our guides are researched, not bench-tested. We work from manufacturer documentation,
              published specifications, Australian standards and regulator guidance, and we say which
              is which. Every article is labelled with its type, so you know whether you are reading
              a buying guide, a comparison, a how-to or an explainer.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
              You will not find a star rating from us: a score implies testing, and we will not imply
              testing that did not happen.
            </p>
          </div>
        </div>
      </section>

      {/* Who runs this site */}
      <section className="container mt-20 lg:mt-28">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Who runs this site</h2>
        <p className="mt-3 max-w-3xl text-neutral-600 dark:text-neutral-300">
          {site.name} is published by {operator}.
          {editor ? ` ${editor.name} is the editor, responsible for what the site publishes.` : ''}
        </p>

        <div className="mt-10 grid gap-[15px] lg:grid-cols-3">
          {editor ? (
            <Link
              href={`/authors/${editor.slug}/`}
              className="group flex gap-5 rounded-2xl border border-brand-200 bg-brand-50 p-6 transition hover:shadow-md lg:col-span-3 dark:border-brand-900/60 dark:bg-brand-950/30"
            >
              <Avatar author={editor} size="size-20" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">Editor</p>
                <h3 className="mt-1 text-xl font-bold text-neutral-900 group-hover:text-brand-700 dark:text-white">
                  {editor.name}
                </h3>
                {editor.bio ? (
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{editor.bio}</p>
                ) : null}
              </div>
            </Link>
          ) : null}

          {contributors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}/`}
              className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Avatar author={author} size="size-14" />
              <div className="min-w-0">
                <h3 className="font-bold text-neutral-900 group-hover:text-brand-700 dark:text-white">{author.name}</h3>
                {author.role ? <p className="text-sm text-neutral-500">{author.role}</p> : null}
                <p className="mt-1 text-sm text-neutral-500">
                  {countFor(author.slug)} {countFor(author.slug) === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial policy */}
      <section className="container mt-20 lg:mt-28">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Editorial policy</h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {policies.map((p) => (
            <div key={p.title} className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-300 [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline dark:[&_a]:text-brand-400">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Not electrical advice */}
      <section className="container mt-20 lg:mt-28">
        <div className="relative overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/home.webp"
            alt=""
            width={1024}
            height={576}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative bg-gradient-to-r from-neutral-950/85 via-neutral-950/70 to-neutral-950/30 p-8 sm:p-12 lg:p-16">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">Not electrical advice</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-neutral-100">
              Our guides are general information, not a substitute for a licensed professional. In
              Australia, fixed electrical wiring work must be carried out by a licensed electrician.
              Where an article touches on wiring, we say plainly where the DIY line sits — please do
              not treat a blog post as authority to open a switch plate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mt-20 lg:mt-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-900/50">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Get in touch</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Corrections, questions and requests for what to cover next are all welcome.
            </p>
          </div>
          <Link
            href="/contact/"
            className="inline-flex shrink-0 items-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}

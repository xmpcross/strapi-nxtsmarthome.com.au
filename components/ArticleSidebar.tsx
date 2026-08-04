import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { articleHref, squareCoverFor, formatDate, type Article } from '@/lib/content';
import { categories, site } from '@/lib/site';

/**
 * Right-hand widget sidebar for single posts, mirroring the reference layout.
 *
 * The reference's demo widgets are portfolio filler — "Work Experience",
 * "Technologies (Figma, Notion, Photoshop)", "Creating". Those are meaningless on
 * a smart-home publication, so the slots are kept and filled with the equivalent
 * widget for this site: what we cover, how we test, and where to start.
 */

/** Slug for the heading id, so the section can point aria-labelledby at it. */
function widgetId(title: string) {
  return `widget-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

/**
 * `href` renders the heading's "View all" link — same control the home page's
 * compact headings use.
 */
function Widget({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  const id = widgetId(title);
  return (
    <section
      aria-labelledby={id}
      className="rounded-lg border border-slate-200 p-5 dark:border-slate-700"
    >
      <SectionHeading id={id} title={title} href={href} compact />
      {children}
    </section>
  );
}

export default function ArticleSidebar({
  featured,
  categoryCounts,
}: {
  featured: Article[];
  categoryCounts: { key: string; name: string; slug: string; emoji: string; count: number }[];
}) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <Widget title="About">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-600 text-xs font-extrabold text-white">
            NXT
          </span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{site.shortName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Australia</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Independent smart home reviews and setup guides, written for Australian homes —
          local retailers, wiring rules and renting realities.
        </p>
        <Link
          href="/about/"
          className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400"
        >
          More about us →
        </Link>
      </Widget>

      {categoryCounts.length > 0 && (
        <Widget title="Browse by topic">
          <ul className="flex flex-col gap-1">
            {categoryCounts.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}/`}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true">{c.emoji}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {c.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>
      )}

      <Widget title="Australian specifics">
        {/*
          The detail that actually separates this site from an overseas guide.
          Stated plainly, and only things that hold true nationally.
        */}
        <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-brand-600 dark:text-brand-400">•</span>
            <span>230&nbsp;V nominal mains and AS/NZS&nbsp;3112 Type&nbsp;I plugs — overseas plug-in gear needs an approved local model, not an adaptor.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-brand-600 dark:text-brand-400">•</span>
            <span>B22 bayonet is still common alongside E27 screw, so bulb fitting matters more here than in most guides.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-brand-600 dark:text-brand-400">•</span>
            <span>Fixed wiring is licensed work. Anything behind the wall plate is an electrician&rsquo;s job.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="text-brand-600 dark:text-brand-400">•</span>
            <span>Australian Consumer Law guarantees run alongside any manufacturer warranty.</span>
          </li>
        </ul>
      </Widget>

      {featured.length > 0 && (
        <Widget title="Featured Posts">
          <ul className="flex flex-col gap-4">
            {featured.map((a) => (
              <li key={a.slug}>
                <Link href={articleHref(a)} className="group flex gap-3">
                  <img
                    src={squareCoverFor(a)}
                    alt=""
                    width={500}
                    height={500}
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">
                      {a.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(a.updated ?? a.date)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>
      )}

      <Widget title="What We Cover">
        <ul className="flex flex-col gap-1">
          {categoryCounts
            .filter((c) => c.count > 0)
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}/`}
                  className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true">{c.emoji}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-slate-400">{c.count}</span>
                </Link>
              </li>
            ))}
        </ul>
      </Widget>

      <Widget title="How We Test">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          We say plainly what has been used in a real home and what has only been researched.
          No invented test results, and no star ratings for gear we have not handled.
        </p>
        <Link
          href="/how-we-test/"
          className="mt-3 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Our method
        </Link>
      </Widget>

      <Widget title="Start Here">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The platform you build on decides what you can buy for the next decade. Get that
          right before spending anything.
        </p>
        <Link
          href="/categories/hubs-and-platforms/"
          className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400"
        >
          Choose a platform →
        </Link>
      </Widget>
    </div>
  );
}

export { Widget };

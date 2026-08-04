import type { Metadata } from 'next';
import ForYou from '@/components/ForYou';
import MagzinHero from '@/components/MagzinHero';
import StaffPicks from '@/components/StaffPicks';
import { getAllArticles } from '@/lib/content';

/**
 * Design preview — hero section and Staff Picks.
 *
 * Renders the same components the live home page uses, so what is judged here is
 * what ships. The only difference is `standalone`, which supplies the section's
 * own background and gutters because there is no site container around them.
 */

export const metadata: Metadata = {
  title: 'Hero and Staff Picks — design preview',
  robots: { index: false, follow: false },
};

export default async function MagzinHeroPreview() {
  const articles = await getAllArticles();
  const lead = articles[0];
  const tiles = articles.slice(1, 5);
  const features = articles.slice(5, 8);
  const items = articles.slice(8, 14);
  // Wraps back to the start if the library is short, so the section is never
  // half-empty on a site with few published articles.
  const fyPool = articles.length > 17 ? articles.slice(14) : articles;
  const fyLead = fyPool[0];
  const fyTiles = fyPool.slice(1, 3);
  const fyRows = fyPool.slice(3, 5);

  if (!lead) return <main className="mzh">No articles found.</main>;

  return (
    <main>
      <MagzinHero lead={lead} tiles={tiles} standalone />
      <StaffPicks features={features} items={items} standalone />
      <ForYou lead={fyLead} tiles={fyTiles} rows={fyRows} standalone />

      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '20px 22px 64px',
          color: '#64748b',
          fontSize: '14px',
          lineHeight: 1.65,
        }}
      >
        <strong>Design preview — not linked from the site, not indexed.</strong>
        <br />
        Both sections are the real components, sharing the corner-pocket geometry
        with the post cards below the fold. The reference&rsquo;s comment and view
        counters are the one thing not reproduced: this site has neither, and
        inventing the numbers would put a falsehood on the front page. Read time and
        date fill those slots and are real. The bookmark is a working control — it
        persists to this browser&rsquo;s localStorage.
      </div>
    </main>
  );
}

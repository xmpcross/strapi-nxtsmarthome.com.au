import SectionMagazine10 from '@/components/SectionMagazine10'
import { getCategoriesWithPosts, type TCategory } from '@/data/categories'
import { toTPost, type TPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { HomeBuyingGuides, HomeHero, HomeSetupGuides, HomeProducts, HomeTopicSection, HomeTopics, HomeTrust } from '@/components/home/HomeSections'
import { getListableTopProducts, toListingCard } from '@/lib/products'

// Home page on the Ncmaz "Home Demo 5" layout, filled from Strapi and
// revalidated with the article data (ISR, 5 minutes). SEO redesign (24 Sep
// 2026): a visible h1 and intro, "Start here", text topic links, the
// researched product pages and the research/trust statement
// (components/home/HomeSections.tsx) around the topic sections.
//
// Below the lead grid and the topic tiles, every section is one of the site's
// topics: its title and description come from lib/site.ts and it shows only
// that topic's posts. Topics are ordered by post count and share one layout
// (HomeTopicSection, lead on alternating sides), so a new topic or new posts
// reshape the page with no code change.
export const revalidate = 300

const HOME_TITLE = 'Smart Home Guides for Australian Homes'
const HOME_DESCRIPTION =
  'Independent smart home buying guides, setup help and explainers for Australian homes: lighting, security cameras, energy, climate, robot vacuums and hubs, with Australian retailers and 230V wiring in mind.'

export const metadata: Metadata = {
  title: { absolute: `${HOME_TITLE} | ${site.name}` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${HOME_TITLE} | ${site.name}`,
    description: HOME_DESCRIPTION,
    images: [site.ogImage],
  },
}

export default async function HomePage() {
  const articles = await getAllArticles()
  // Featured first, then newest, for the lead grid.
  const lead = [...articles.filter((a) => a.featured), ...articles.filter((a) => !a.featured)].slice(0, 8)

  const categories = await getCategoriesWithPosts()
  const topics = categories.filter((c) => c.count > 0).sort((a, b) => b.count - a.count)

  // Pinned slots: Entertainment & Audio is the first section under Top topics,
  // Buying Guides closes the page (HomeBuyingGuides). The other
  // topics rotate between them, biggest first. (A pinned topic with no posts
  // falls back to the count order.)
  const lastTopic = topics.find((c) => c.handle === 'buying-guides') ?? topics[topics.length - 1]
  const firstTopic = topics.find((c) => c.handle === 'entertainment-and-audio' && c !== lastTopic)
  // Topics with no section of their own on the home page (user request, 24 Sep
  // 2026). They still appear in "Browse by topic" and on /all-topics/.
  const HIDDEN_SECTIONS = new Set(['robot-vacuums', 'energy-and-solar', 'lighting', 'hubs-and-platforms'])
  const sectionTopics = [
    ...(firstTopic ? [firstTopic] : []),
    ...topics.filter((c) => c !== lastTopic && c !== firstTopic && !HIDDEN_SECTIONS.has(c.handle)),
  ]
  // Product pages with our own research notes: the indexable ones.
  // Researched products: only products with at least 3 retailers showing a real price, in
  // random order. The page is ISR (revalidate above), so the selection changes on each
  // regeneration, not per visitor.
  const withPrices = getListableTopProducts().filter(
    (p) => (p.retailers ?? []).filter((r) => typeof r.priceAud === 'number' && r.priceAud > 0).length >= 3,
  )
  for (let i = withPrices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[withPrices[i], withPrices[j]] = [withPrices[j], withPrices[i]]
  }
  const researched = withPrices.slice(0, 8).map(toListingCard)
  // Topic sections before and after the researched-products block. The block
  // sits just before Climate & Comfort, so Climate runs straight into Lighting
  // (user request, 24 Sep 2026); without Climate it falls back to halfway.
  const climateAt = sectionTopics.findIndex((c) => c.handle === 'climate-and-comfort')
  const splitAt = climateAt >= 0 ? climateAt : Math.ceil(sectionTopics.length / 2)
  const editor = site.organisation.editor

  const renderTopic = (category: TCategory, i: number) => {
    const posts = category.posts ?? []
    // Setup Guides has its own list design (components/home/HomeSections.tsx).
    if (category.handle === 'setup-guides')
      return (
        <HomeSetupGuides
          key={category.id}
          heading={category.name}
          subHeading={category.description}
          posts={posts.slice(0, 8)}
          moreHref={`/categories/${category.handle}/`}
          moreLabel={`All ${category.name}`}
        />
      )
    return <HomeTopicSection key={category.id} category={category} posts={posts} flip={i % 2 === 1} />
  }

  return (
    <div className="page-home relative container space-y-28 pt-10 pb-28 lg:space-y-32 lg:pt-16 lg:pb-32">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: HOME_TITLE,
          description: HOME_DESCRIPTION,
          url: `${site.url}/`,
          inLanguage: site.language,
          isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.url}/` },
          about: topics.map((t) => ({ '@type': 'Thing', name: t.name })),
        }}
      />

      {/* The page's one h1, visible; section titles are h2 (2rem / 700 here: app/globals.css .page-home). */}
      <HomeHero articleCount={articles.length} topicCount={topics.length} />

      <SectionMagazine10 posts={lead.map(toTPost)} />

      <HomeTopics topics={topics} />

      {sectionTopics.slice(0, splitAt).map((category, i) => renderTopic(category, i))}

      <HomeProducts products={researched} />

      {sectionTopics.slice(splitAt).map((category, i) => renderTopic(category, i + splitAt))}

      <HomeTrust editorName={editor.name} editorSlug={editor.slug} />

      {lastTopic && (
        <HomeBuyingGuides
          heading={lastTopic.name}
          subHeading={lastTopic.description}
          posts={(lastTopic.posts ?? []).slice(0, 9)}
          moreHref={`/categories/${lastTopic.handle}/`}
          moreLabel={`All ${lastTopic.name}`}
        />
      )}
    </div>
  )
}

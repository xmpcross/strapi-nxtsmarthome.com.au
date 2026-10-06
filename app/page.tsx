import SectionMagazine10 from '@/components/SectionMagazine10'
import { getCategoriesWithPosts } from '@/data/categories'
import { toTPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { HomeHero } from '@/components/home/HomeSections'

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

      {/* Top 2 Sections Only */}
      <HomeHero articleCount={articles.length} topicCount={topics.length} />

      <SectionMagazine10 posts={lead.map(toTPost)} />
    </div>
  )
}

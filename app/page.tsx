import SectionMagazine10 from '@/components/SectionMagazine10'
import { getCategoriesWithPosts } from '@/data/categories'
import { toTPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import EditorsChoiceSection from '@/components/home/EditorsChoiceSection'
import ZairaBottomSections from '@/components/home/ZairaBottomSections'

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

  const allPosts = articles.map(toTPost)

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

      {/* Advertisement Banner Placeholder */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group">
          <span className="absolute top-2 right-3 z-10 rounded bg-neutral-900/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Advertisement
          </span>
          <a href="#" className="block w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ads/home_banner_ad.jpg"
              alt="Modern Technology Fest Advertisement"
              className="w-full h-auto max-h-56 object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      {/* Editors Choice Carousel Section */}
      <EditorsChoiceSection posts={allPosts} />

      <SectionMagazine10 posts={lead.map(toTPost)} />

      {/* Zaira Theme Bottom Sections (Recent Posts, Trending News, Sidebar & Bottom Banner) */}
      <ZairaBottomSections posts={allPosts} categories={topics} />
    </div>
  )
}

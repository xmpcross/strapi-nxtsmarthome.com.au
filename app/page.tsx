import BackgroundSection from '@/components/BackgroundSection'
import SectionGridPosts from '@/components/SectionGridPosts'
import SectionMagazine10 from '@/components/SectionMagazine10'
import SectionMagazine2 from '@/components/SectionMagazine2'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionMagazine8 from '@/components/SectionMagazine8'
import SectionMagazine9 from '@/components/SectionMagazine9'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getAuthors } from '@/data/authors'
import { getCategoriesWithPosts, getTags, type TCategory } from '@/data/categories'
import { toTPost, type TPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'
import Link from 'next/link'
import type { ReactNode } from 'react'

// Home page on the Ncmaz "Home Demo 5" layout, filled from Strapi and
// revalidated with the article data (ISR, 5 minutes).
//
// Below the lead grid and the topic slider, every section is one of the site's
// topics: its title and description come from lib/site.ts and it shows only
// that topic's posts. Topics are ordered by post count and rotate through the
// template layouts, so a new topic or new posts reshape the page with no code
// change.
export const revalidate = 300

type Layout = 'magazine9' | 'magazine8' | 'magazine2' | 'magazine7' | 'grid' | 'slider'

// Rotation of layouts, with the fewest posts each needs to look complete.
// A topic with fewer posts than its layout needs falls back to the card grid.
const ROTATION: { layout: Layout; min: number }[] = [
  { layout: 'magazine9', min: 6 },
  { layout: 'magazine8', min: 6 },
  { layout: 'magazine2', min: 5 },
  { layout: 'magazine7', min: 4 },
  { layout: 'grid', min: 1 },
  { layout: 'slider', min: 5 },
]

function ViewAll({ category }: { category: TCategory }) {
  return (
    <div className="mt-8 flex justify-end">
      <Link
        href={`/categories/${category.handle}/`}
        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
      >
        View all {category.count} {category.name} articles →
      </Link>
    </div>
  )
}

function CategorySection({ category, posts, layout }: { category: TCategory; posts: TPost[]; layout: Layout }) {
  const heading = category.name
  const subHeading = category.description
  let body: ReactNode
  switch (layout) {
    case 'magazine9':
      body = <SectionMagazine9 heading={heading} subHeading={subHeading} posts={posts.slice(0, 18)} />
      break
    case 'magazine8':
      body = <SectionMagazine8 heading={heading} subHeading={subHeading} posts={posts.slice(0, 6)} />
      break
    case 'magazine2':
      return (
        <SectionMagazine2
          heading={heading}
          subHeading={subHeading}
          posts={posts.slice(0, 5)}
          viewAllHref={`/categories/${category.handle}/`}
        />
      )
    case 'magazine7':
      body = <SectionMagazine7 heading={heading} subHeading={subHeading} posts={posts.slice(0, 6)} />
      break
    case 'slider':
      return (
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderPosts postCardName="card10V2" heading={heading} subHeading={subHeading} posts={posts} />
          <ViewAll category={category} />
        </div>
      )
    default:
      return (
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionGridPosts
            headingIsCenter
            postCardName="card11"
            heading={heading}
            subHeading={subHeading}
            posts={posts.slice(0, 8)}
            gridClass="md:grid-cols-2 lg:grid-cols-4"
            moreHref={`/categories/${category.handle}/`}
            moreLabel={`All ${category.name}`}
          />
        </div>
      )
  }
  return (
    <div>
      {body}
      <ViewAll category={category} />
    </div>
  )
}

export default async function HomePage() {
  const articles = await getAllArticles()
  // Featured first, then newest, for the lead grid.
  const lead = [...articles.filter((a) => a.featured), ...articles.filter((a) => !a.featured)].slice(0, 8)

  const [categories, authors, tags] = await Promise.all([getCategoriesWithPosts(), getAuthors(), getTags()])
  const topics = categories.filter((c) => c.count > 0).sort((a, b) => b.count - a.count)

  // Pinned slots: Entertainment & Audio is the first section under Top topics,
  // Buying Guides closes the page in the posts-with-widgets layout. The other
  // topics rotate between them, biggest first. (A pinned topic with no posts
  // falls back to the count order.)
  const lastTopic = topics.find((c) => c.handle === 'buying-guides') ?? topics[topics.length - 1]
  const firstTopic = topics.find((c) => c.handle === 'entertainment-and-audio' && c !== lastTopic)
  const sectionTopics = [
    ...(firstTopic ? [firstTopic] : []),
    ...topics.filter((c) => c !== lastTopic && c !== firstTopic),
  ]
  const inDepth = [...articles]
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 4)
    .map(toTPost)

  return (
    <div className="page-home relative container space-y-28 pt-10 pb-28 lg:space-y-32 lg:pt-16 lg:pb-32">
      {/* The page's one h1; section titles are h2 (2rem / 700 here: app/globals.css .page-home). */}
      <h1 className="sr-only">{`${site.name} — ${site.shortTagline}`}</h1>

      <SectionMagazine10 posts={lead.map(toTPost)} />

      {/* Topic slider (Ncmaz card5), biggest topics first. */}
      <SectionSliderNewCategories
        heading="Top topics"
        subHeading={`Discover all ${topics.length} topics`}
        categories={topics}
        categoryCardType="card5"
      />

      {sectionTopics.map((category, i) => {
        const posts = category.posts ?? []
        const slot = ROTATION[i % ROTATION.length]
        const layout: Layout = posts.length >= slot.min ? slot.layout : 'grid'
        return <CategorySection key={category.id} category={category} posts={posts} layout={layout} />
      })}

      {lastTopic && (
        <SectionPostsWithWidgets
          heading={lastTopic.name}
          subHeading={lastTopic.description}
          posts={(lastTopic.posts ?? []).slice(0, 8)}
          postCardName="card4"
          gridClass="sm:grid-cols-2"
          widgetAuthors={authors.slice(0, 4)}
          widgetCategories={topics}
          widgetTags={tags.slice(0, 12)}
          widgetPosts={inDepth}
          moreHref={`/categories/${lastTopic.handle}/`}
          moreLabel={`All ${lastTopic.name}`}
        />
      )}
    </div>
  )
}

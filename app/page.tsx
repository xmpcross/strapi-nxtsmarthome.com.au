import BackgroundSection from '@/components/BackgroundSection'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridPosts from '@/components/SectionGridPosts'
import SectionLargeSlider from '@/components/SectionLargeSlider'
import SectionMagazine1 from '@/components/SectionMagazine1'
import SectionMagazine2 from '@/components/SectionMagazine2'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { toTPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'

// Home page on the Ncmaz template, filled from Strapi. Revalidates with the
// article data (ISR, 5 minutes).
export const revalidate = 300

export default async function HomePage() {
  const articles = await getAllArticles()
  const posts = articles.map(toTPost)
  const featured = [...articles.filter((a) => a.featured), ...articles.filter((a) => !a.featured)]
    .slice(0, 5)
    .map(toTPost)
  const byCategory = (key: string) => articles.filter((a) => a.category === key).map(toTPost)
  const inDepth = [...articles]
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 6)
    .map(toTPost)

  const [categories, authors, tags] = await Promise.all([getCategories(), getAuthors(), getTags()])
  const topics = categories.filter((c) => c.count > 0)

  return (
    <div className="relative pb-28 lg:pb-32">
      {/* The page's one h1; section titles below are h2. */}
      <h1 className="sr-only">{`${site.name} — ${site.shortTagline}`}</h1>
      <div className="relative container space-y-28 lg:space-y-32">
        <SectionLargeSlider
          heading="Editor's picks"
          subHeading="Smart home guides written for Australian homes"
          className="pt-10 lg:pt-16"
          posts={featured}
        />

        <SectionSliderNewCategories
          heading="Explore topics"
          subHeading={`${topics.length} topics, from security cameras to solar`}
          categories={topics}
          categoryCardType="card4"
        />

        <SectionMagazine1 heading="Latest guides" subHeading="Fresh from the NXT Smart Home desk" posts={posts.slice(0, 6)} />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card10V2"
            heading="Buying guides"
            subHeading="What to buy, and what to skip, in Australia"
            posts={byCategory('buying-guides').slice(0, 8)}
          />
        </div>

        <SectionMagazine7
          heading="Hubs & platforms"
          subHeading="Matter, Thread, Home Assistant and the ecosystems that tie it together"
          posts={byCategory('hubs-and-platforms').slice(0, 6)}
        />

        <SectionMagazine2 heading="Most in-depth" posts={inDepth.slice(0, 5)} />
      </div>

      <div className="my-28 bg-neutral-100 py-28 lg:py-32 dark:bg-neutral-800/40">
        <div className="relative container">
          <SectionGridPosts
            headingIsCenter
            postCardName="card11"
            heading="Setup guides"
            subHeading="Step-by-step, tested on Australian gear"
            posts={byCategory('setup-guides').slice(0, 8)}
            gridClass="md:grid-cols-2 lg:grid-cols-4"
            moreHref="/categories/setup-guides/"
            moreLabel="All setup guides"
          />
        </div>
      </div>

      <div className="container space-y-28 lg:space-y-32">
        {authors.length > 1 && (
          <SectionGridAuthorBox authors={authors} heading="Our writers" subHeading="The people behind the guides" />
        )}

        <SectionPostsWithWidgets
          posts={posts.slice(6, 12)}
          heading="More to read"
          subHeading="Recent guides across every topic"
          widgetCategories={topics.slice(0, 9)}
          widgetAuthors={authors.slice(0, 3)}
          widgetTags={tags.slice(0, 12)}
          widgetPosts={inDepth.slice(0, 4)}
        />
      </div>
    </div>
  )
}

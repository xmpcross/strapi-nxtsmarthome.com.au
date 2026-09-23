import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionMagazine10 from '@/components/SectionMagazine10'
import SectionMagazine11 from '@/components/SectionMagazine11'
import SectionMagazine2 from '@/components/SectionMagazine2'
import SectionMagazine9 from '@/components/SectionMagazine9'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import { getAuthors } from '@/data/authors'
import { getCategoriesWithPosts, getTags } from '@/data/categories'
import { toTPost } from '@/data/posts'
import { getAllArticles } from '@/lib/content'
import { site } from '@/lib/site'
import { Divider } from '@/shared/divider'

// Home page on the Ncmaz "Home Demo 5" layout, filled from Strapi. Revalidates
// with the article data (ISR, 5 minutes). The template's ad banner is left out
// (the site runs no display ads).
export const revalidate = 300

export default async function HomePage() {
  const articles = await getAllArticles()
  const posts = articles.map(toTPost)
  // Featured first, then newest, for the lead grid.
  const lead = [...articles.filter((a) => a.featured), ...articles.filter((a) => !a.featured)].slice(0, 8)
  const leadSlugs = new Set(lead.map((a) => a.slug))
  const rest = articles.filter((a) => !leadSlugs.has(a.slug)).map(toTPost)
  const inDepth = [...articles]
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 7)
    .map(toTPost)

  const [categories, authors, tags] = await Promise.all([getCategoriesWithPosts(), getAuthors(), getTags()])
  // The three biggest topics for the per-topic lists.
  const topTopics = [...categories].sort((a, b) => b.count - a.count).slice(0, 3)

  return (
    <div className="relative container space-y-28 pt-10 pb-28 lg:space-y-32 lg:pt-16 lg:pb-32">
      {/* The page's one h1; section titles are h2. */}
      <h1 className="sr-only">{`${site.name} — ${site.shortTagline}`}</h1>

      <SectionMagazine10 posts={lead.map(toTPost)} />

      <SectionMagazine9 heading="Latest guides" subHeading="Fresh from the NXT Smart Home desk" posts={rest.slice(0, 18)} />

      <SectionMagazine2 heading="Most in-depth" subHeading="Our longest, most thorough guides" posts={inDepth} />

      <Divider />

      <SectionMagazine11
        categories={topTopics}
        heading="Editor's picks by topic"
        subHeading="The newest guides in our biggest topics"
      />

      <SectionBecomeAnAuthor />

      <SectionPostsWithWidgets
        heading="More to read"
        subHeading="Recent guides across every topic"
        posts={(rest.length > 18 ? rest.slice(18, 26) : posts.slice(0, 8))}
        postCardName="card4"
        gridClass="sm:grid-cols-2"
        widgetAuthors={authors.slice(0, 4)}
        widgetCategories={categories.filter((c) => c.count > 0).slice(0, 9)}
        widgetTags={tags.slice(0, 12)}
        widgetPosts={inDepth.slice(0, 4)}
      />
    </div>
  )
}

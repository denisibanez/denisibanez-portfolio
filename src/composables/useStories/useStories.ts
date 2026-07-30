import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProjects } from '@/composables/useProjects/useProjects'
import { useBlog } from '@/composables/useBlog/useBlog'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { testimonials } from '@/data/testimonials'
import type { Story, StoryGroup } from '@/types/story'

/**
 * Assembles the home-page story groups from the site's own content — portfolio
 * projects, blog posts and testimonials. Everything runs through the same
 * draft-aware, newest-first sources as the rest of the app. Empty groups (e.g.
 * a person with no photo) are dropped so a ring never opens onto nothing.
 */
export const useStories = () => {
  const { t } = useI18n()
  const { localized } = useLocalize()
  const { projects } = useProjects()
  const { posts } = useBlog()

  const groups = computed<StoryGroup[]>(() => {
    const portfolio: Story[] = projects.map((p) => ({
      image: p.cover ?? p.image ?? '',
      title: p.title,
      subtitle: localized(p.category),
      to: { name: 'project-detail', params: { slug: p.slug } },
    }))

    const blog: Story[] = posts
      .filter((p) => p.image)
      .map((p) => ({
        image: p.image as string,
        title: localized(p.title),
        subtitle: localized(p.category),
        to: { name: 'blog-post', params: { slug: p.slug } },
      }))

    const people: Story[] = testimonials
      .filter((person) => person.photo)
      .map((person) => ({
        image: person.photo as string,
        title: person.name,
        subtitle: person.role,
        to: { name: 'testimonials' },
      }))

    const all: StoryGroup[] = [
      { id: 'portfolio', label: t('stories.portfolio'), cover: portfolio[0]?.image ?? '', stories: portfolio },
      { id: 'blog', label: t('stories.blog'), cover: blog[0]?.image ?? '', stories: blog },
      { id: 'testimonials', label: t('stories.testimonials'), cover: people[0]?.image ?? '', stories: people },
    ]

    return all.filter((group) => group.stories.length > 0)
  })

  return { groups }
}

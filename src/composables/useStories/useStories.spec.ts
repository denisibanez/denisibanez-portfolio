import { describe, it, expect, vi } from 'vitest'

// Isolate the group-assembly logic from i18n/data wiring.
vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (key: string) => key }) }))
vi.mock('@/composables/useLocalize/useLocalize', () => ({
  useLocalize: () => ({ localized: (map: Record<string, string>) => map.en ?? '' }),
}))
vi.mock('@/composables/useProjects/useProjects', () => ({
  useProjects: () => ({
    projects: [
      { slug: 'a', title: 'Project A', cover: '/a-cover.png', image: '/a.png', category: { en: 'Client' } },
      { slug: 'b', title: 'Project B', image: '/b.png', category: { en: 'Study' } },
    ],
  }),
}))
vi.mock('@/composables/useBlog/useBlog', () => ({
  useBlog: () => ({
    posts: [
      { slug: 'p1', title: { en: 'Post 1' }, image: '/p1.png', category: { en: 'Engineering' } },
      { slug: 'p2', title: { en: 'Post 2' }, category: { en: 'Life' } }, // no image → skipped
    ],
  }),
}))
vi.mock('@/data/testimonials', () => ({
  testimonials: [
    { name: 'Ana', role: 'PM', photo: '/ana.jpg', quote: { en: 'q' } },
    { name: 'Bob', role: 'Dev', quote: { en: 'q' } }, // no photo → skipped
  ],
}))

import { useStories } from './useStories'

describe('useStories', () => {
  it('builds the three groups from site content', () => {
    const { groups } = useStories()
    expect(groups.value.map((g) => g.id)).toEqual(['portfolio', 'blog', 'testimonials'])
  })

  it('uses cover then image for the group thumbnail', () => {
    const { groups } = useStories()
    expect(groups.value[0]!.cover).toBe('/a-cover.png')
    expect(groups.value[0]!.stories[0]!.image).toBe('/a-cover.png')
    expect(groups.value[0]!.stories[1]!.image).toBe('/b.png')
  })

  it('skips blog posts and testimonials that have no image/photo', () => {
    const { groups } = useStories()
    const blog = groups.value.find((g) => g.id === 'blog')!
    const people = groups.value.find((g) => g.id === 'testimonials')!
    expect(blog.stories.map((s) => s.title)).toEqual(['Post 1'])
    expect(people.stories.map((s) => s.title)).toEqual(['Ana'])
  })

  it('links each story back to its page', () => {
    const { groups } = useStories()
    expect(groups.value[0]!.stories[0]!.to).toEqual({ name: 'project-detail', params: { slug: 'a' } })
  })
})

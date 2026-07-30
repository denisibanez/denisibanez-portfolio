import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StoryRings from './StoryRings.vue'
import type { StoryGroup } from '@/types/story'

const groups: StoryGroup[] = [
  { id: 'portfolio', label: 'Portfolio', cover: '/a.png', stories: [{ image: '/a.png', title: 'A' }] },
  { id: 'blog', label: 'Blog', cover: '/b.png', stories: [{ image: '/b.png', title: 'B' }] },
]

describe('StoryRings', () => {
  it('renders one ring per group', () => {
    const wrapper = mount(StoryRings, { props: { groups } })
    expect(wrapper.findAll('button')).toHaveLength(2)
    expect(wrapper.text()).toContain('Portfolio')
    expect(wrapper.text()).toContain('Blog')
  })

  it('emits open with the group index when clicked', async () => {
    const wrapper = mount(StoryRings, { props: { groups } })
    await wrapper.findAll('button')[1]!.trigger('click')
    expect(wrapper.emitted('open')?.[0]).toEqual([1])
  })

  it('composes the aria-label from openLabel and the group label', () => {
    const wrapper = mount(StoryRings, { props: { groups, openLabel: 'Open stories' } })
    expect(wrapper.findAll('button')[0]!.attributes('aria-label')).toBe('Open stories: Portfolio')
  })
})

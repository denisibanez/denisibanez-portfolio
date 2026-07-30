import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import StoryViewer from './StoryViewer.vue'
import type { StoryGroup } from '@/types/story'

const groups: StoryGroup[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    cover: '/cover.png',
    stories: [
      { image: '/a.png', title: 'A' },
      { image: '/b.png', title: 'B' },
    ],
  },
]

const labels = { close: 'Close', next: 'Next', prev: 'Previous', view: 'View' }

const factory = (open = true) => {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', name: 'home', component: { template: '<div />' } }] })
  // Stub Teleport so the dialog renders inside the wrapper for querying.
  return mount(StoryViewer, {
    props: { groups, open, startGroup: 0, labels },
    global: { plugins: [router], stubs: { teleport: true } },
  })
}

describe('StoryViewer', () => {
  it('shows the first story of the group when open', () => {
    const wrapper = factory(true)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('/a.png')
    wrapper.unmount()
  })

  it('renders nothing when closed', () => {
    const wrapper = factory(false)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('advances to the next story on the next tap zone', async () => {
    const wrapper = factory(true)
    await wrapper.find('button[aria-label="Next"]').trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/b.png')
    wrapper.unmount()
  })

  it('emits close from the close button', async () => {
    const wrapper = factory(true)
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    wrapper.unmount()
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogGallery from './BlogGallery.vue'

const labels = { prev: 'Previous', next: 'Next', enlarge: 'Enlarge', close: 'Close' }
const images = ['/a.png', '/b.png', '/c.png']

const factory = (props: Partial<{ images: string[]; alt: string }> = {}) =>
  mount(BlogGallery, { props: { images, alt: 'Alt', labels, ...props } })

describe('BlogGallery', () => {
  it('shows the first image initially', () => {
    const wrapper = factory()
    expect(wrapper.find('img').attributes('src')).toBe('/a.png')
  })

  it('advances and wraps with next/prev', async () => {
    const wrapper = factory()
    await wrapper.find('button[aria-label="Next"]').trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/b.png')
    // wrap around from the first image back to the last
    await wrapper.find('button[aria-label="Previous"]').trigger('click')
    await wrapper.find('button[aria-label="Previous"]').trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/c.png')
  })

  it('jumps to an image via its dot', async () => {
    const wrapper = factory()
    const dots = wrapper.findAll('[aria-label="3"]')
    await dots[0]!.trigger('click')
    expect(wrapper.find('img').attributes('src')).toBe('/c.png')
  })

  it('hides prev/next and dots for a single image', () => {
    const wrapper = factory({ images: ['/only.png'] })
    expect(wrapper.find('button[aria-label="Next"]').exists()).toBe(false)
    expect(wrapper.find('button[aria-label="Previous"]').exists()).toBe(false)
  })

  it('opens the lightbox via the enlarge control', async () => {
    // BaseModal teleports to <body>, so assert against the document, not the wrapper.
    const wrapper = factory()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    await wrapper.find('button[aria-label="Enlarge"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
    wrapper.unmount()
  })
})

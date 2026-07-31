import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MediaGallery from './MediaGallery.vue'
import type { Media } from './MediaGallery.vue'

const media: Media[] = [
  { type: 'image', src: '/a.png' },
  { type: 'image', src: '/b.png' },
]
const labels = { prev: 'Prev', next: 'Next', expand: 'Expand', close: 'Close' }

const factory = (props: Partial<{ active: number; variant: 'inline' | 'lightbox' }> = {}) =>
  mount(MediaGallery, { props: { media, active: 0, title: 'Airbnb', alt: 'Airbnb', labels, ...props } })

describe('MediaGallery', () => {
  it('shows the active image', () => {
    expect(factory().find('img').attributes('src')).toBe('/a.png')
    expect(factory({ active: 1 }).find('img').attributes('src')).toBe('/b.png')
  })

  it('emits update:active from the next/prev controls (wrapping)', async () => {
    const wrapper = factory({ active: 0 })
    await wrapper.find('button[aria-label="Next"]').trigger('click')
    expect(wrapper.emitted('update:active')?.[0]).toEqual([1])
    await wrapper.find('button[aria-label="Prev"]').trigger('click')
    expect(wrapper.emitted('update:active')?.[1]).toEqual([1]) // 0 - 1 wraps to last (index 1)
  })

  it('inline: emits maximize from the maximize button, not close', async () => {
    const wrapper = factory({ variant: 'inline' })
    expect(wrapper.find('button[aria-label="Close"]').exists()).toBe(false)
    await wrapper.find('button[aria-label="Expand"]').trigger('click')
    expect(wrapper.emitted('maximize')).toBeTruthy()
  })

  it('lightbox: shows a close button and no maximize', async () => {
    const wrapper = factory({ variant: 'lightbox' })
    expect(wrapper.find('button[aria-label="Expand"]').exists()).toBe(false)
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

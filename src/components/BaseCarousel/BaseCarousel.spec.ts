import { describe, it, expect, vi } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import BaseCarousel from './BaseCarousel.vue'

type Slide = { id: number; label: string }

const slides: Slide[] = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, label: `Slide ${i + 1}` }))

const labels = { prev: 'Previous', next: 'Next', goTo: 'Go to slide' }

const factory = () =>
  mount(BaseCarousel, {
    props: {
      items: slides,
      title: 'Selected Works',
      subtitle: 'A reusable carousel.',
      labels,
      cardClass: 'w-[280px]',
      itemKey: (item: unknown) => (item as Slide).id,
    },
    slots: {
      card: (props: { item: unknown }) => h('span', { class: 'slide' }, (props.item as Slide).label),
    },
  })

describe('BaseCarousel', () => {
  it('renders the title and subtitle', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('Selected Works')
    expect(wrapper.text()).toContain('A reusable carousel.')
  })

  it('renders one card per item via the scoped slot', () => {
    const wrapper = factory()
    expect(wrapper.findAll('article').length).toBe(slides.length)
    expect(wrapper.findAll('.slide')[0]!.text()).toBe('Slide 1')
  })

  it('exposes prev/next controls with accessible labels', () => {
    const wrapper = factory()
    expect(wrapper.find('button[aria-label="Previous"]').exists()).toBe(true)
    expect(wrapper.find('button[aria-label="Next"]').exists()).toBe(true)
  })

  it('scrolls the track when next is clicked', async () => {
    const wrapper = factory()
    const track = wrapper.find('.carousel').element as HTMLElement
    const scrollBy = vi.fn<(options?: ScrollToOptions) => void>()
    track.scrollBy = scrollBy as unknown as typeof track.scrollBy
    await wrapper.find('button[aria-label="Next"]').trigger('click')
    expect(scrollBy).toHaveBeenCalledOnce()
    const [opts] = scrollBy.mock.calls[0]!
    expect(opts?.left ?? 0).toBeGreaterThan(0)
  })

  it('emits select with the item when a card is activated', async () => {
    const wrapper = factory()
    await wrapper.findAll('article')[1]!.trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([slides[1]])
  })

  it('renders a mobile dash indicator per item', () => {
    const wrapper = factory()
    expect(wrapper.findAll('button[aria-label^="Go to slide"]').length).toBe(slides.length)
  })
})

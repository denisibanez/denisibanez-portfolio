import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import TestimonialsView from './TestimonialsView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      testimonials: {
        title: 'Testimonials',
        subtitle: 'What people say.',
        prev: 'Previous',
        next: 'Next',
        goTo: 'Go to testimonial',
        readMore: 'Read more',
        close: 'Close',
      },
    },
  },
})

const factory = () => mount(TestimonialsView, { global: { plugins: [i18n] } })

describe('TestimonialsView', () => {
  it('renders the title heading', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('Testimonials')
  })

  it('renders a card per testimonial with prev/next controls', () => {
    const wrapper = factory()
    expect(wrapper.findAll('article').length).toBeGreaterThanOrEqual(4)
    expect(wrapper.findAll('button[aria-label="Previous"], button[aria-label="Next"]').length).toBe(2)
  })

  it('renders the background image', () => {
    const wrapper = factory()
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })

  it('opens a detail modal with the full quote when a card is clicked', async () => {
    const wrapper = factory()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    await wrapper.findAll('article')[0]!.trigger('click')
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.find('button[aria-label="Close"]').exists()).toBe(true)
  })

  it('closes the detail modal via the close button', async () => {
    const wrapper = factory()
    await wrapper.findAll('article')[0]!.trigger('click')
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })
})

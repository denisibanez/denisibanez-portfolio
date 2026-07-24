import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
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
  // The detail modal teleports to <body>, so reset it between tests.
  beforeEach(() => {
    document.body.innerHTML = ''
  })

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
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    await wrapper.findAll('article')[0]!.trigger('click')
    await nextTick()
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog?.querySelector('button[aria-label="Close"]')).not.toBeNull()
  })

  it('closes the detail modal via the close button', async () => {
    const wrapper = factory()
    await wrapper.findAll('article')[0]!.trigger('click')
    await nextTick()
    document.body.querySelector<HTMLButtonElement>('button[aria-label="Close"]')?.click()
    await flushPromises()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})

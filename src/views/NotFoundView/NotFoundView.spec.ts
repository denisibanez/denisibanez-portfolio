import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import NotFoundView from './NotFoundView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      notFound: { eyebrow: 'Lost?', title: 'Page not found', message: 'That page does not exist.', cta: 'Back home' },
    },
  },
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'home', component: { template: '<div />' } }],
})

const factory = () => mount(NotFoundView, { global: { plugins: [i18n, router] } })

describe('NotFoundView', () => {
  it('renders an accessible (sr-only) heading and a back-home link over the backdrop', () => {
    const wrapper = factory()
    // The backdrop already reads "404 — Page not found", so the heading is
    // visually hidden but kept for accessibility/SEO.
    const heading = wrapper.get('h1')
    expect(heading.text()).toBe('Page not found')
    expect(heading.classes()).toContain('sr-only')
    const link = wrapper.get('a')
    expect(link.text()).toBe('Back home')
    expect(link.attributes('href')).toBe('/')
  })

  it('shows the notfound background image', () => {
    const wrapper = factory()
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })
})

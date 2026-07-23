import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProjectsView from './ProjectsView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      projects: {
        title: 'Selected Works',
        subtitle: 'A curated collection of digital experiences.',
        prev: 'Previous',
        next: 'Next',
        view: 'View project',
        all: 'All',
        study: 'Study',
        client: 'Client',
      },
    },
  },
})

const factory = () => mount(ProjectsView, { global: { plugins: [i18n] } })

describe('ProjectsView', () => {
  it('renders the title heading', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('Selected Works')
  })

  it('renders a card per project with prev/next controls', () => {
    const wrapper = factory()
    expect(wrapper.findAll('article').length).toBeGreaterThanOrEqual(4)
    expect(wrapper.findAll('button[aria-label="Previous"], button[aria-label="Next"]').length).toBe(2)
  })

  it('renders the background image', () => {
    const wrapper = factory()
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })

  it('shows a category placeholder on cards without a real image', () => {
    const wrapper = factory()
    const firstCard = wrapper.findAll('article')[0]!
    // No project.image set yet, so the gradient placeholder (no <img>) is used.
    expect(firstCard.find('img').exists()).toBe(false)
    expect(firstCard.text().length).toBeGreaterThan(0)
  })

  it('filters the carousel by kind via the tabs', async () => {
    const wrapper = factory()
    // Default "All" shows every published project.
    expect(wrapper.findAll('article').length).toBe(5)
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs.find((t) => t.text() === 'Study')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(2)
    await tabs.find((t) => t.text() === 'Client')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(3)
  })
})

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProjectsView from './ProjectsView.vue'

vi.mock('@/data/projects')

// Assert the production-visible set (published only); drafts are a dev-only preview.
// Fixture (src/data/__mocks__/projects) has 3 published (2 client, 1 study) + 1 draft.
beforeEach(() => vi.stubEnv('DEV', false))
afterEach(() => vi.unstubAllEnvs())

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
        national: 'National',
        nearshore: 'Nearshore',
        caseStudy: 'Case Study',
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
    expect(wrapper.findAll('article').length).toBe(3)
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
    // Default "All" shows every published project (fixture: 3).
    expect(wrapper.findAll('article').length).toBe(3)
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs.find((t) => t.text() === 'Study')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(1)
    await tabs.find((t) => t.text() === 'Client')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(2)
    // Region tabs filter by region (studies excluded): alpha=national, gamma=nearshore.
    await tabs.find((t) => t.text() === 'National')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(1)
    await tabs.find((t) => t.text() === 'Nearshore')!.trigger('click')
    expect(wrapper.findAll('article').length).toBe(1)
  })
})

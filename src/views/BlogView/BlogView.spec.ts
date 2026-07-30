import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import BlogView from './BlogView.vue'

vi.mock('@/data/blog')

// Assert the production-visible set (published only); drafts are a dev preview.
beforeEach(() => vi.stubEnv('DEV', false))
afterEach(() => vi.unstubAllEnvs())

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      blog: {
        eyebrow: 'Creative Archive',
        title: 'The Journal',
        subtitle: 'Essays.',
        readTime: '{min} min read',
        prev: 'Previous',
        next: 'Next',
        pagination: 'Blog pagination',
        page: 'Page',
      },
    },
  },
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/blog', name: 'blog', component: { template: '<div />' } },
    { path: '/blog/:slug', name: 'blog-post', component: { template: '<div />' } },
  ],
})

const factory = () => mount(BlogView, { global: { plugins: [i18n, router] } })

describe('BlogView', () => {
  it('renders the journal title', () => {
    expect(factory().get('h1').text()).toBe('The Journal')
  })

  it('renders a card per post — featured plus the rest (fixture: 3)', () => {
    expect(factory().findAll('article').length).toBe(3)
  })

  it('links each post to its page', () => {
    const hrefs = factory()
      .findAll('a')
      .map((a) => a.attributes('href'))
    expect(hrefs).toContain('/blog/alpha') // featured
    expect(hrefs).toContain('/blog/beta')
    expect(hrefs).toContain('/blog/gamma')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import BlogPostView from './BlogPostView.vue'

vi.mock('@/data/blog')

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: { blog: { back: 'Back to the blog', readTime: '{min} min read' } } },
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/blog', name: 'blog', component: { template: '<div />' } },
    { path: '/blog/:slug', name: 'blog-post', component: { template: '<div />' } },
  ],
})

const factory = (slug: string) => mount(BlogPostView, { props: { slug }, global: { plugins: [i18n, router] } })

describe('BlogPostView', () => {
  it('renders the post title, tags and body for a known slug', () => {
    const wrapper = factory('alpha')
    expect(wrapper.get('h1').text()).toBe('Alpha')
    expect(wrapper.text()).toContain('Alpha body.')
    expect(wrapper.text()).toContain('x') // fixture tag
  })

  it('links back to the blog', () => {
    const back = factory('alpha')
      .findAll('a')
      .find((a) => a.text().includes('Back to the blog'))
    expect(back?.attributes('href')).toBe('/blog')
  })

  it('renders no article for an unknown slug (the router guard owns the 404)', () => {
    expect(factory('does-not-exist').find('h1').exists()).toBe(false)
  })
})

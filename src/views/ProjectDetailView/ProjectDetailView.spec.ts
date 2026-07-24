import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import ProjectDetailView from './ProjectDetailView.vue'

vi.mock('@/data/projects')

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      projects: { draft: 'Draft' },
      projectDetail: {
        viewLive: 'View details',
        back: 'Back to Portfolio',
        prev: 'Previous project',
        next: 'Next project',
        expand: 'Expand image',
        close: 'Close',
        notFound: 'Project not found',
      },
    },
  },
})

const makeRouter = (): Router =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/projects', name: 'projects', component: { template: '<div />' } },
      { path: '/projects/:slug', name: 'project-detail', component: { template: '<div />' } },
      { path: '/projects/:slug/specs', name: 'project-specs', component: { template: '<div />' } },
    ],
  })

const factory = async (slug?: string) => {
  const router = makeRouter()
  await router.push(slug ? `/projects/${slug}` : '/projects/unknown-slug')
  await router.isReady()
  const wrapper = mount(ProjectDetailView, { global: { plugins: [i18n, router] } })
  return { wrapper, router }
}

describe('ProjectDetailView', () => {
  // The lightbox teleports to <body>, so reset it between tests.
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the project title and category/year meta for a known slug', async () => {
    const { wrapper } = await factory('alpha')
    expect(wrapper.get('h1').text()).toBe('Alpha')
    expect(wrapper.text()).toContain('Web App')
    expect(wrapper.text()).toContain('2024')
  })

  it('drills into the specs page via the "View details" link', async () => {
    const { wrapper, router } = await factory('alpha')
    const link = wrapper.findAll('a').find((a) => a.text() === 'View details')
    expect(link?.attributes('href')).toBe('/projects/alpha/specs')
    await link?.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('project-specs')
    expect(router.currentRoute.value.params.slug).toBe('alpha')
  })

  it('navigates to the adjacent project via the next control', async () => {
    const { wrapper, router } = await factory('alpha')
    await wrapper.find('button[aria-label="Next project"]').trigger('click')
    await flushPromises()
    // Newest-first order: alpha (2024-06) → beta (2023-06).
    expect(router.currentRoute.value.params.slug).toBe('beta')
  })

  it('opens and closes the image lightbox via the maximize control', async () => {
    const { wrapper } = await factory('alpha')
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    await wrapper.find('button[aria-label="Expand image"]').trigger('click')
    await nextTick()
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
    document.body.querySelector<HTMLButtonElement>('[role="dialog"] button[aria-label="Close"]')?.click()
    await flushPromises()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('plays the lead video inline and in the lightbox', async () => {
    // 'gamma' has a video → it leads the gallery, playing inline in the media
    // box (poster from the cover) and again in the lightbox, both with controls.
    const { wrapper } = await factory('gamma')
    const inline = wrapper.find('video')
    expect(inline.exists()).toBe(true)
    expect(inline.attributes('src')).toBe('/gamma.mp4')
    expect(inline.attributes('controls')).toBeDefined()
    expect(inline.attributes('poster')).toBe('/gamma-cover.png')
    await wrapper.find('button[aria-label="Expand image"]').trigger('click')
    await nextTick()
    const dialogVideo = document.body.querySelector<HTMLVideoElement>('[role="dialog"] video')
    expect(dialogVideo).not.toBeNull()
    expect(dialogVideo?.getAttribute('src')).toBe('/gamma.mp4')
  })

  it('changes the gallery frame when the media is dragged sideways', async () => {
    // 'alpha' has no image, so the placeholder heroCode shows the frame index.
    const { wrapper } = await factory('alpha')
    expect(wrapper.text()).toContain('— 01')
    // jsdom can't set clientX via VTU trigger, so dispatch native events.
    const media = wrapper.find('.cursor-zoom-in').element
    media.dispatchEvent(new MouseEvent('pointerdown', { clientX: 220, bubbles: true }))
    media.dispatchEvent(new MouseEvent('pointerup', { clientX: 120, bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('— 02')
  })

  it('renders no project content for an unknown slug (the router guard owns the 404)', async () => {
    const { wrapper } = await factory('does-not-exist')
    expect(wrapper.find('h1').exists()).toBe(false)
  })

  it('honours the slug prop over the route param', async () => {
    const router = makeRouter()
    await router.push('/projects/unknown-slug')
    await router.isReady()
    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'gamma' },
      global: { plugins: [i18n, router] },
    })
    expect(wrapper.get('h1').text()).toBe('Gamma')
  })
})

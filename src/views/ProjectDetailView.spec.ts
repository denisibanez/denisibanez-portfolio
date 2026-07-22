import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import ProjectDetailView from './ProjectDetailView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      projectDetail: {
        caseStudy: 'Case Study',
        viewLive: 'View Live Project',
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
  it('renders the project title and case-study meta for a known slug', async () => {
    const { wrapper } = await factory('aether-watch')
    expect(wrapper.get('h1').text()).toBe('Aether Watch Co.')
    expect(wrapper.text()).toContain('Case Study')
    expect(wrapper.text()).toContain('2024')
  })

  it('opens a live URL when "View Live Project" is clicked', async () => {
    const { wrapper } = await factory('aether-watch')
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const live = wrapper.findAll('button').find((b) => b.text() === 'View Live Project')
    expect(live?.attributes('disabled')).toBeUndefined()
    await live?.trigger('click')
    expect(openSpy).toHaveBeenCalledOnce()
    openSpy.mockRestore()
  })

  it('navigates to the adjacent project via the next control', async () => {
    const { wrapper, router } = await factory('aether-watch')
    await wrapper.find('button[aria-label="Next project"]').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.params.slug).toBe('brutalist-villa')
  })

  it('opens and closes the image lightbox via the maximize control', async () => {
    const { wrapper } = await factory('aether-watch')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    await wrapper.find('button[aria-label="Expand image"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    await wrapper.find('[role="dialog"] button[aria-label="Close"]').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('changes the gallery frame when the media is dragged sideways', async () => {
    const { wrapper } = await factory('aether-watch')
    expect(wrapper.text()).toContain('AW — 01')
    // jsdom can't set clientX via VTU trigger, so dispatch native events.
    const media = wrapper.find('.cursor-grab').element
    media.dispatchEvent(new MouseEvent('pointerdown', { clientX: 220, bubbles: true }))
    media.dispatchEvent(new MouseEvent('pointerup', { clientX: 120, bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('AW — 02')
  })

  it('shows a not-found fallback for an unknown slug', async () => {
    const { wrapper } = await factory('does-not-exist')
    expect(wrapper.get('h1').text()).toBe('Project not found')
  })

  it('honours the slug prop over the route param', async () => {
    const router = makeRouter()
    await router.push('/projects/unknown-slug')
    await router.isReady()
    const wrapper = mount(ProjectDetailView, {
      props: { slug: 'nexus-system' },
      global: { plugins: [i18n, router] },
    })
    expect(wrapper.get('h1').text()).toBe('Nexus System')
  })
})

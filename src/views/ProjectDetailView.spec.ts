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
        specifications: 'Project Specifications',
        keyFeatures: 'Key Features & Milestones',
        industry: 'Industry',
        timeline: 'Timeline',
        months: 'Months',
        techStack: 'Tech Stack & Tools',
        myRole: 'My Role',
        collaborators: 'Collaborators',
        viewLive: 'View details',
        back: 'Back to Portfolio',
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
  it('renders the title and specification sections for a known slug', async () => {
    const { wrapper } = await factory('aether-watch')
    expect(wrapper.get('h1').text()).toBe('Aether Watch Co.')
    const text = wrapper.text()
    expect(text).toContain('Project Specifications')
    expect(text).toContain('Key Features & Milestones')
  })

  it('renders the metadata panels (industry, timeline, role)', async () => {
    const { wrapper } = await factory('aether-watch')
    const text = wrapper.text()
    expect(text).toContain('Product Design') // industry
    expect(text).toContain('Months') // timeline label
    expect(text).toContain('Lead Front-end & Motion') // role
  })

  it('renders one pill per tech-stack entry', async () => {
    const { wrapper } = await factory('aether-watch')
    // Aether Watch has 5 tech entries; each is a bordered pill.
    expect(wrapper.text()).toContain('Three.js')
    expect(wrapper.text()).toContain('TypeScript')
  })

  it('opens a live URL when "View details" is clicked', async () => {
    const { wrapper } = await factory('aether-watch')
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const live = wrapper.findAll('button').find((b) => b.text() === 'View details')
    expect(live?.attributes('disabled')).toBeUndefined()
    await live?.trigger('click')
    expect(openSpy).toHaveBeenCalledOnce()
    openSpy.mockRestore()
  })

  it('navigates back to the projects list', async () => {
    const { wrapper, router } = await factory('aether-watch')
    await wrapper.findAll('button').find((b) => b.text() === 'Back to Portfolio')?.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('projects')
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

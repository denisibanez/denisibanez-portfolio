import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import ProjectSpecsView from './ProjectSpecsView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      projectSpecs: {
        specifications: 'Project Specifications',
        keyFeatures: 'Key Features & Milestones',
        industry: 'Industry',
        timeline: 'Timeline',
        months: 'Months',
        techStack: 'Tech Stack & Tools',
        myRole: 'My Role',
        collaborators: 'Collaborators',
        viewLive: 'View live project',
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
      { path: '/projects/:slug/specs', name: 'project-specs', component: { template: '<div />' } },
    ],
  })

const factory = async (slug?: string) => {
  const router = makeRouter()
  await router.push(slug ? `/projects/${slug}/specs` : '/projects/unknown-slug/specs')
  await router.isReady()
  const wrapper = mount(ProjectSpecsView, { global: { plugins: [i18n, router] } })
  return { wrapper, router }
}

describe('ProjectSpecsView', () => {
  it('renders the title and specification sections for a known slug', async () => {
    const { wrapper } = await factory('aether-watch')
    expect(wrapper.get('h1').text()).toBe('Aether Watch Co.')
    const text = wrapper.text()
    expect(text).toContain('Project Specifications')
    expect(text).toContain('Key Features & Milestones')
  })

  it('renders the metadata panels (industry, timeline, role, tech)', async () => {
    const { wrapper } = await factory('aether-watch')
    const text = wrapper.text()
    expect(text).toContain('Product Design') // industry
    expect(text).toContain('Months') // timeline label
    expect(text).toContain('Lead Front-end & Motion') // role
    expect(text).toContain('Three.js') // tech pill
  })

  it('opens a live URL when "View live project" is clicked', async () => {
    const { wrapper } = await factory('aether-watch')
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const live = wrapper.findAll('button').find((b) => b.text() === 'View live project')
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
    await router.push('/projects/unknown-slug/specs')
    await router.isReady()
    const wrapper = mount(ProjectSpecsView, {
      props: { slug: 'nexus-system' },
      global: { plugins: [i18n, router] },
    })
    expect(wrapper.get('h1').text()).toBe('Nexus System')
  })
})

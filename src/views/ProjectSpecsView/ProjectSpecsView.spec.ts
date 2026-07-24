import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'
import ProjectSpecsView from './ProjectSpecsView.vue'

vi.mock('@/data/projects')

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
    const { wrapper } = await factory('alpha')
    expect(wrapper.get('h1').text()).toBe('Alpha')
    const text = wrapper.text()
    expect(text).toContain('Project Specifications')
    expect(text).toContain('Key Features & Milestones')
  })

  it('renders the metadata panels (industry, timeline, role, tech)', async () => {
    const { wrapper } = await factory('alpha')
    const text = wrapper.text()
    expect(text).toContain('Fintech') // industry
    expect(text).toContain('Months') // timeline label
    expect(text).toContain('Lead Engineer') // role
    expect(text).toContain('TypeScript') // tech pill
  })

  it('exposes the live project as an external link', async () => {
    const { wrapper } = await factory('alpha')
    const live = wrapper.findAll('a').find((a) => a.text() === 'View live project')
    expect(live?.attributes('href')).toBeTruthy()
    expect(live?.attributes('target')).toBe('_blank')
    expect(live?.attributes('rel')).toContain('noopener')
  })

  it('links back to the projects list', async () => {
    const { wrapper, router } = await factory('alpha')
    const back = wrapper.findAll('a').find((a) => a.text() === 'Back to Portfolio')
    expect(back?.attributes('href')).toBe('/projects')
    await back?.trigger('click')
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
      props: { slug: 'gamma' },
      global: { plugins: [i18n, router] },
    })
    expect(wrapper.get('h1').text()).toBe('Gamma')
  })
})

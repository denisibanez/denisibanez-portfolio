import { describe, it, expect, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useProjectRoute } from './useProjectRoute'

vi.mock('@/data/projects')

type Resolved = ReturnType<typeof useProjectRoute>

const setup = async (path: string, slugProp?: string): Promise<Resolved> => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/projects/:slug', component: { template: '<div />' } },
    ],
  })
  await router.push(path)
  await router.isReady()

  let result!: Resolved
  const Comp = defineComponent({
    setup() {
      result = useProjectRoute(() => slugProp)
      return () => null
    },
  })
  mount(Comp, { global: { plugins: [router] } })
  return result
}

describe('useProjectRoute', () => {
  it('resolves the project from the route slug', async () => {
    const { slug, project } = await setup('/projects/alpha')
    expect(slug.value).toBe('alpha')
    expect(project.value?.title).toBe('Alpha')
  })

  it('honours the slug prop override', async () => {
    const { project } = await setup('/projects/whatever', 'gamma')
    expect(project.value?.title).toBe('Gamma')
  })

  it('returns null for an unknown slug', async () => {
    const { project } = await setup('/projects/nope')
    expect(project.value).toBeNull()
  })
})

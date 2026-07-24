import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useProjectRoute } from './useProjectRoute'

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
    const { slug, project } = await setup('/projects/aether-watch')
    expect(slug.value).toBe('aether-watch')
    expect(project.value?.title).toBe('Aether Watch Co.')
  })

  it('honours the slug prop override', async () => {
    const { project } = await setup('/projects/whatever', 'nexus-system')
    expect(project.value?.title).toBe('Nexus System')
  })

  it('returns null for an unknown slug', async () => {
    const { project } = await setup('/projects/nope')
    expect(project.value).toBeNull()
  })
})

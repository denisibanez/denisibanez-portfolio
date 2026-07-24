import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, unref } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import en from '@/i18n/locales/en.json'

// Capture what useSeo feeds to unhead so we can assert the resolved values
// without depending on unhead's async DOM flush (verified in-browser separately).
let captured: Record<string, unknown> = {}
vi.mock('@unhead/vue', () => ({
  useHead: (input: Record<string, unknown>) => {
    captured = input
  },
}))

const { useSeo } = await import('./useSeo')

const Host = defineComponent({
  setup() {
    useSeo()
    return () => h('div')
  },
})

const routes = [
  { path: '/', name: 'home', component: Host },
  { path: '/about', name: 'about', component: Host },
  { path: '/projects/:slug', name: 'project-detail', component: Host },
]

const metaContent = (key: 'name' | 'property', value: string) => {
  const list = captured.meta as Array<Record<string, unknown>>
  const entry = list.find((m) => m[key] === value)
  return entry ? unref(entry.content) : undefined
}

const mountAt = async (path: string) => {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const i18n = createI18n({ legacy: false, locale: 'en', messages: { en } })
  router.push(path)
  await router.isReady()
  mount(Host, { global: { plugins: [router, i18n] } })
}

describe('useSeo', () => {
  it('sets the home title without the site suffix', async () => {
    await mountAt('/')
    expect(unref(captured.title)).toBe('Denis Ibañez — Software Developer')
  })

  it('suffixes inner-page titles and sets a canonical URL', async () => {
    await mountAt('/about')
    expect(unref(captured.title)).toBe('About me — Denis Ibañez')
    const link = (captured.link as Array<Record<string, unknown>>)[0]!
    expect(unref(link.href)).toContain('/about')
    expect(metaContent('name', 'description')).toContain('senior front-end')
  })

  it('derives title and description from the project on detail routes', async () => {
    await mountAt('/projects/aether-watch')
    expect(unref(captured.title)).toBe('Aether Watch Co. — Denis Ibañez')
    expect(metaContent('property', 'og:title')).toBe('Aether Watch Co. — Denis Ibañez')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, unref } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import en from '@/i18n/locales/en.json'

// Capture what useSeo feeds to unhead so we can assert the resolved values
// without depending on unhead's async DOM flush (verified in-browser separately).
vi.mock('@/data/projects')

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
  { path: '/blog/:slug', name: 'blog-post', component: Host },
]

const metaContent = (key: 'name' | 'property', value: string) => {
  const list = captured.meta as Array<Record<string, unknown>>
  const entry = list.find((m) => m[key] === value)
  return entry ? unref(entry.content) : undefined
}

// The JSON-LD script's innerHTML is a computed ref of the serialized `@graph`.
const graph = (): Array<Record<string, unknown>> => {
  const script = (captured.script as Array<Record<string, unknown>>)[0]!
  return JSON.parse(unref(script.innerHTML) as string)['@graph']
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
    expect(unref(captured.title)).toBe('Denis Ibañez — AI Engineer & Front-end Architect')
  })

  it('suffixes inner-page titles and sets a canonical URL', async () => {
    await mountAt('/about')
    expect(unref(captured.title)).toBe('About me — Denis Ibañez')
    const link = (captured.link as Array<Record<string, unknown>>)[0]!
    expect(unref(link.href)).toContain('/about')
    expect(metaContent('name', 'description')).toContain('senior front-end')
  })

  it('derives title and description from the project on detail routes', async () => {
    await mountAt('/projects/alpha')
    expect(unref(captured.title)).toBe('Alpha — Denis Ibañez')
    expect(metaContent('property', 'og:title')).toBe('Alpha — Denis Ibañez')
    expect(metaContent('name', 'description')).toBe('Alpha summary.')
  })

  it('includes an Organization node with a name and logo on every page', async () => {
    await mountAt('/')
    const org = graph().find((n) => n['@type'] === 'Organization')
    expect(org?.name).toBe('Denis Ibañez')
    expect(org?.logo).toContain('icon-512.png')
  })

  it('emits a WebPage node on ordinary routes', async () => {
    await mountAt('/about')
    const webPage = graph().find((n) => n['@type'] === 'WebPage')
    expect(webPage?.name).toBe('About me — Denis Ibañez')
  })

  it('emits a FAQPage node only on the about route', async () => {
    await mountAt('/about')
    const faqPage = graph().find((n) => n['@type'] === 'FAQPage')
    expect(faqPage).toBeDefined()
    expect((faqPage!.mainEntity as unknown[]).length).toBeGreaterThan(0)

    await mountAt('/')
    expect(graph().find((n) => n['@type'] === 'FAQPage')).toBeUndefined()
  })

  it('emits an Article node instead of a WebPage on blog post routes', async () => {
    await mountAt('/blog/a-complete-vue3-setup-part-1')
    const nodes = graph()
    expect(nodes.find((n) => n['@type'] === 'Article')).toBeDefined()
    expect(nodes.find((n) => n['@type'] === 'WebPage')).toBeUndefined()
  })
})

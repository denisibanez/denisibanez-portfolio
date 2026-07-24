import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { site } from '@/config/site'
import { useProjects } from '@/composables/useProjects/useProjects'

/**
 * Drives per-route <title>, description, canonical and social (OG/Twitter)
 * tags from the active route + i18n locale. Call once, high in the tree
 * (App.vue). Reuses existing page copy so no SEO-only translations are needed.
 * Note: all six locales share one URL (client-side switch), so `og:locale`
 * signals the active language rather than emitting per-language alternates.
 */
export const useSeo = () => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const { getBySlug } = useProjects()

  // Published-only lookup (drafts 404) for the dynamic project routes.
  const project = computed(() => {
    const slug = route.params.slug
    return typeof slug === 'string' ? getBySlug(slug) : undefined
  })

  // Page-specific name (no site suffix) + description, keyed by route name.
  const page = computed<{ title: string; description: string }>(() => {
    const name = String(route.name)
    const p = project.value
    if ((name === 'project-detail' || name === 'project-specs') && p) {
      return { title: p.title, description: p.summary }
    }
    const map: Record<string, { title: string; description: string }> = {
      home: { title: `${site.name} — ${t('home.role')}`, description: t('home.description') },
      about: { title: t('about.title'), description: t('about.lead') },
      projects: { title: t('projects.title'), description: t('projects.subtitle') },
      testimonials: { title: t('testimonials.title'), description: t('testimonials.subtitle') },
      'not-found': { title: t('notFound.title'), description: t('notFound.message') },
    }
    return map[name] ?? { title: site.name, description: site.description }
  })

  const title = computed(() =>
    route.name === 'home' ? page.value.title : `${page.value.title} — ${site.name}`,
  )
  const description = computed(() => page.value.description)
  const url = computed(() => `${site.url}${route.path}`)

  // Structured data (JSON-LD): a Person + WebSite on every page, plus a
  // BreadcrumbList on the project routes for richer results.
  const structuredData = computed(() => {
    const graph: Record<string, unknown>[] = [
      { '@type': 'WebSite', name: site.name, url: site.url },
      {
        '@type': 'Person',
        name: site.name,
        jobTitle: site.role,
        url: site.url,
        description: site.description,
        sameAs: site.socials.map((s) => s.href),
      },
    ]
    const p = project.value
    if (p) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.url}/projects` },
          { '@type': 'ListItem', position: 3, name: p.title, item: `${site.url}/projects/${p.slug}` },
        ],
      })
    }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  })

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: locale },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: url }],
    script: [{ type: 'application/ld+json', innerHTML: structuredData, key: 'ld-json' }],
  })
}

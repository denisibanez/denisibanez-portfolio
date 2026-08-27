import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { site } from '@/config/site'
import { useProjects } from '@/composables/useProjects/useProjects'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useBlog } from '@/composables/useBlog/useBlog'
import { faq } from '@/data/faq'

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
  const { getBySlug: getPostBySlug } = useBlog()
  const { localized } = useLocalize()

  // Published-only lookup (drafts 404) for the dynamic project routes.
  const project = computed(() => {
    const slug = route.params.slug
    return typeof slug === 'string' ? getBySlug(slug) : undefined
  })

  // Blog post lookup, for the Article schema on `blog-post`.
  const post = computed(() => {
    const slug = route.params.slug
    return route.name === 'blog-post' && typeof slug === 'string' ? getPostBySlug(slug) : null
  })

  // Page-specific name (no site suffix) + description, keyed by route name.
  const page = computed<{ title: string; description: string }>(() => {
    const name = String(route.name)
    const p = project.value
    if ((name === 'project-detail' || name === 'project-specs') && p) {
      return { title: p.title, description: localized(p.summary) }
    }
    const b = post.value
    if (name === 'blog-post' && b) {
      return { title: localized(b.title), description: localized(b.excerpt) }
    }
    const map: Record<string, { title: string; description: string }> = {
      home: { title: `${site.name} — ${t('home.role')}`, description: t('home.description') },
      about: { title: t('about.title'), description: t('about.lead') },
      projects: { title: t('projects.title'), description: t('projects.subtitle') },
      testimonials: { title: t('testimonials.title'), description: t('testimonials.subtitle') },
      blog: { title: t('blog.title'), description: t('blog.subtitle') },
      connect: { title: t('connect.title'), description: t('connect.lead') },
      'not-found': { title: t('notFound.title'), description: t('notFound.message') },
    }
    return map[name] ?? { title: site.name, description: site.description }
  })

  const title = computed(() =>
    route.name === 'home' ? page.value.title : `${page.value.title} — ${site.name}`,
  )
  const description = computed(() => page.value.description)
  const url = computed(() => `${site.url}${route.path}`)

  // Structured data (JSON-LD): Organization + Person + WebSite on every page,
  // a WebPage (or Article, on the blog post route) per URL, a BreadcrumbList
  // on the project routes, and a FAQPage on `about` (mirrors the on-page FAQ).
  const structuredData = computed(() => {
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon-512.png`,
        sameAs: site.socials.map((s) => s.href),
      },
      { '@type': 'WebSite', name: site.name, url: site.url, publisher: { '@id': `${site.url}/#organization` } },
      {
        '@type': 'Person',
        name: site.name,
        jobTitle: site.role,
        url: site.url,
        description: site.description,
        sameAs: site.socials.map((s) => s.href),
        worksFor: { '@id': `${site.url}/#organization` },
      },
    ]

    const b = post.value
    if (route.name === 'blog-post' && b) {
      graph.push({
        '@type': 'Article',
        '@id': url.value,
        mainEntityOfPage: url.value,
        headline: localized(b.title),
        description: localized(b.excerpt),
        image: b.image ? `${site.url}${b.image}` : undefined,
        datePublished: b.date,
        author: { '@type': 'Person', name: site.name, url: site.url },
        publisher: { '@id': `${site.url}/#organization` },
      })
    } else {
      graph.push({
        '@type': 'WebPage',
        '@id': url.value,
        url: url.value,
        name: title.value,
        description: description.value,
        isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
      })
    }

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

    if (route.name === 'about') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: localized(item.question),
          acceptedAnswer: { '@type': 'Answer', text: localized(item.answer) },
        })),
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

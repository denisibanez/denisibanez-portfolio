import type { BlogPost } from '../../src/types/blog'
import type { Locale } from '../../src/i18n'
import { posts } from '../../src/data/blog'
import { site } from '../../src/config/site'
import { localizeText } from '../../src/utils/localizeText/localizeText'

// No `import.meta.env.DEV` escape hatch — see api/_lib/projects.ts for why.
export const isPublished = (post: BlogPost): boolean => post.status !== 'draft'

const byDateDesc = (a: BlogPost, b: BlogPost): number => b.date.localeCompare(a.date)

const published = (): BlogPost[] => posts.filter(isPublished).sort(byDateDesc)

const absolutize = (path: string): string => `${site.url}${path}`

export type BlogSummary = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readingMinutes: number
  tags: string[]
}

const toSummary = (p: BlogPost, locale: Locale): BlogSummary => ({
  slug: p.slug,
  title: localizeText(p.title, locale),
  excerpt: localizeText(p.excerpt, locale),
  category: localizeText(p.category, locale),
  date: p.date,
  readingMinutes: p.readingMinutes,
  tags: p.tags,
})

export const listBlogPosts = (locale: Locale): BlogSummary[] => published().map((p) => toSummary(p, locale))

export type ContentBlock =
  | { type: 'p' | 'h2' | 'h3'; text: string }
  | { type: 'code'; code: string }
  | { type: 'img'; src: string; alt?: string }

const toContent = (p: BlogPost, locale: Locale): ContentBlock[] => {
  if (p.blocks) {
    return p.blocks.map((block) => {
      if (block.type === 'code') return { type: 'code', code: block.code }
      if (block.type === 'img') {
        return { type: 'img', src: absolutize(block.src), alt: block.alt ? localizeText(block.alt, locale) : undefined }
      }
      return { type: block.type, text: localizeText(block.text, locale) }
    })
  }
  return localizeText(p.body ?? { en: [], pt: [], es: [], de: [], fr: [], ja: [] }, locale).map((text) => ({
    type: 'p',
    text,
  }))
}

export type BlogDetail = BlogSummary & {
  image?: string
  images: string[]
  video?: string
  youtube?: string
  content: ContentBlock[]
}

export type NotFound = { error: 'not_found'; slug: string }

export const getBlogPost = (slug: string, locale: Locale): BlogDetail | NotFound => {
  const p = published().find((post) => post.slug === slug)
  if (!p) return { error: 'not_found', slug }

  return {
    ...toSummary(p, locale),
    image: p.image ? absolutize(p.image) : undefined,
    images: (p.images ?? []).map(absolutize),
    video: p.video ? absolutize(p.video) : undefined,
    youtube: p.youtube,
    content: toContent(p, locale),
  }
}

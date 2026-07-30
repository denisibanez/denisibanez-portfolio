import type { LocalizedText, LocalizedList, ProjectStatus } from '@/types/project'
import type { Locale } from '@/i18n'

/** Bilingual rich-content text — English required, other locales fall back to it. */
export type BlogText = Partial<Record<Locale, string>> & { en: string }

/**
 * A rich content block for long-form (imported) posts. Prose blocks are
 * localized; code and images are shared across locales.
 */
export type BlogBlock =
  | { type: 'p' | 'h2' | 'h3'; text: BlogText }
  | { type: 'code'; code: string }
  | { type: 'img'; src: string; alt?: BlogText }

/** A blog post — shared across the blog index and the post page. */
export type BlogPost = {
  slug: string
  /** Defaults to published when omitted. Drafts show only in dev. */
  status?: ProjectStatus
  title: LocalizedText
  excerpt: LocalizedText
  category: LocalizedText
  /** Body paragraphs (the article), localized. Omit when using `blocks`. */
  body?: LocalizedList
  /** Rich content blocks (prose + code + images) for long-form imported posts. */
  blocks?: BlogBlock[]
  /** Optional pull-quote shown in the post page's meta panel. */
  quote?: LocalizedText
  /** Publish date as `YYYY-MM-DD` — drives ordering and display. */
  date: string
  /** Estimated reading time in minutes. */
  readingMinutes: number
  /** Freeform tags (kept as-is across locales). */
  tags: string[]
  /** Highlights the lead post at the top of the index. */
  featured?: boolean
  /** Optional cover image (card thumbnail + article hero). Also the video poster. */
  image?: string
  /** Optional extra images — when present, the post page shows a gallery carousel (with lightbox). */
  images?: string[]
  /** Optional video — plays inline at the top of the article (poster = `image`). */
  video?: string
  /** Optional YouTube video id — embeds an inline player at the top of the article. */
  youtube?: string
}

import type { LocalizedText, LocalizedList, ProjectStatus } from '@/types/project'

/** A blog post — shared across the blog index and the post page. */
export type BlogPost = {
  slug: string
  /** Defaults to published when omitted. Drafts show only in dev. */
  status?: ProjectStatus
  title: LocalizedText
  excerpt: LocalizedText
  category: LocalizedText
  /** Body paragraphs (the article), localized. */
  body: LocalizedList
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
}

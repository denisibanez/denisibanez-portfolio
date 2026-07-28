import type { LocalizedText, LocalizedList } from '@/types/project'

/** A blog post — shared across the blog index and the post page. */
export type BlogPost = {
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  category: LocalizedText
  /** Body paragraphs (the article), localized. */
  body: LocalizedList
  /** Publish date as `YYYY-MM-DD` — drives ordering and display. */
  date: string
  /** Estimated reading time in minutes. */
  readingMinutes: number
  /** Freeform tags (kept as-is across locales). */
  tags: string[]
  /** Highlights the lead post at the top of the index. */
  featured?: boolean
}

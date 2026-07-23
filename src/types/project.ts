/** Publish state — `draft` projects are hidden from the public list. */
export type ProjectStatus = 'published' | 'draft'

/** A portfolio project — shared across the projects list and detail pages. */
export type Project = {
  slug: string
  title: string
  category: string
  year: string
  /** Defaults to published when omitted. */
  status?: ProjectStatus
  /** One-line summary (used on cards). */
  summary: string
  /** Detail-page narrative paragraphs. */
  overview: string[]
  features: string[]
  industry: string
  timelineMonths: string
  timelineRange: string
  techStack: string[]
  role: string
  collaborators: string
  image?: string
  /** External live URL, when the project is published. */
  url?: string
}

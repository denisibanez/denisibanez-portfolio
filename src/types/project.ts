/** Publish state — `draft` projects are hidden from the public list. */
export type ProjectStatus = 'published' | 'draft'

/** Whether the work was a self-driven study or client engagement. */
export type ProjectKind = 'study' | 'client'

/** A portfolio project — shared across the projects list and detail pages. */
export type Project = {
  slug: string
  title: string
  category: string
  kind: ProjectKind
  /** Defaults to published when omitted. */
  status?: ProjectStatus
  /** Build window as `YYYY-MM` — drives ordering and the timeline display. */
  startDate: string
  endDate: string
  /** One-line summary (used on cards). */
  summary: string
  /** Detail-page narrative paragraphs. */
  overview: string[]
  features: string[]
  industry: string
  techStack: string[]
  role: string
  collaborators: string
  image?: string
  /** External live URL, when the project is published. */
  url?: string
  /** Repository URL — study projects surface a "View on GitHub" action. */
  repoUrl?: string
}

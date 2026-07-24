/** Publish state — `draft` projects are hidden from the public list. */
export type ProjectStatus = 'published' | 'draft'

/** Whether the work was a self-driven study or client engagement. */
export type ProjectKind = 'study' | 'client'

import type { Locale } from '@/i18n'

/** Copy provided per supported locale. */
export type LocalizedText = Record<Locale, string>
export type LocalizedList = Record<Locale, string[]>

/** A portfolio project — shared across the projects list and detail pages. */
export type Project = {
  slug: string
  title: string
  category: LocalizedText
  kind: ProjectKind
  /** Defaults to published when omitted. */
  status?: ProjectStatus
  /** Build window as `YYYY-MM` — drives ordering and the timeline display. */
  startDate: string
  endDate: string
  /** One-line summary (used on cards). */
  summary: LocalizedText
  /** Detail-page narrative paragraphs. */
  overview: LocalizedList
  features: LocalizedList
  industry: LocalizedText
  techStack: string[]
  role: string
  collaborators: string
  /** Card/hero cover image (path under public/, e.g. /projects/<slug>/home.png). */
  image?: string
  /** Detail-page gallery (ordered). Falls back to `[image]` when omitted. */
  images?: string[]
  /** Optional showcase video (path under public/). Leads the gallery, using
   *  `image` as its poster; plays with controls in the lightbox. */
  video?: string
  /** External live URL, when the project is published. */
  url?: string
  /** Repository URL — study projects surface a "View on GitHub" action. */
  repoUrl?: string
}

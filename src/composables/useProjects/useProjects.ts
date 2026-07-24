import type { Project } from '@/types/project'
import { projects } from '@/data/projects'

// Drafts are visible while developing (localhost) so work-in-progress can be
// previewed, but hidden in the production build (and excluded from the
// prerender/sitemap in vite.config).
const isVisible = (project: Project): boolean => project.status !== 'draft' || import.meta.env.DEV

// Newest first: by end date, then start date (both `YYYY-MM`, so string-sortable).
const byDateDesc = (a: Project, b: Project): number =>
  b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate)

/**
 * Shared access to the project list plus lookup/adjacency helpers.
 * Scoped to VISIBLE projects (published everywhere; drafts only in dev),
 * ordered newest-first. Hidden projects aren't resolvable by slug (pages 404).
 */
export const useProjects = () => {
  const visible = projects.filter(isVisible).sort(byDateDesc)

  const getBySlug = (slug: string): Project | null => visible.find((p) => p.slug === slug) ?? null

  const getAdjacent = (slug: string): { prev: Project | null; next: Project | null } => {
    const index = visible.findIndex((p) => p.slug === slug)
    if (index === -1) return { prev: null, next: null }
    const prev = visible[(index - 1 + visible.length) % visible.length] ?? null
    const next = visible[(index + 1) % visible.length] ?? null
    return { prev, next }
  }

  return { projects: visible, getBySlug, getAdjacent }
}

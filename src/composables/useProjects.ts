import type { Project } from '@/types/project'
import { projects } from '@/data/projects'

const isPublished = (project: Project): boolean => project.status !== 'draft'

// Newest first: by end date, then start date (both `YYYY-MM`, so string-sortable).
const byDateDesc = (a: Project, b: Project): number =>
  b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate)

/**
 * Shared access to the project list plus lookup/adjacency helpers.
 * Everything is scoped to PUBLISHED projects, ordered newest-first — drafts
 * are hidden from the list and are not resolvable by slug (their pages 404).
 */
export const useProjects = () => {
  const published = projects.filter(isPublished).sort(byDateDesc)

  const getBySlug = (slug: string): Project | null => published.find((p) => p.slug === slug) ?? null

  const getAdjacent = (slug: string): { prev: Project | null; next: Project | null } => {
    const index = published.findIndex((p) => p.slug === slug)
    if (index === -1) return { prev: null, next: null }
    const prev = published[(index - 1 + published.length) % published.length] ?? null
    const next = published[(index + 1) % published.length] ?? null
    return { prev, next }
  }

  return { projects: published, getBySlug, getAdjacent }
}

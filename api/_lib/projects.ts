import type { Project, ProjectKind } from '../../src/types/project'
import type { Locale } from '../../src/i18n'
import { projects } from '../../src/data/projects'
import { site } from '../../src/config/site'
import { localizeText } from '../../src/utils/localizeText/localizeText'
import { notFound, type NotFound } from './notFound'

// No `import.meta.env.DEV` escape hatch here (unlike `useProjects`'s `isVisible`):
// there is no reliable "am I in dev" signal in a deployed serverless function,
// and the public MCP endpoint must never preview drafts.
export const isPublished = (project: Project): boolean => project.status !== 'draft'

const byDateDesc = (a: Project, b: Project): number =>
  b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate)

const published = (): Project[] => projects.filter(isPublished).sort(byDateDesc)

const absolutize = (path: string): string => `${site.url}${path}`

export type ProjectSummary = {
  slug: string
  title: string
  category: string
  kind: ProjectKind
  region?: string
  summary: string
  techStack: string[]
  startDate: string
  endDate: string
  url?: string
  repoUrl?: string
}

const toSummary = (p: Project, locale: Locale): ProjectSummary => ({
  slug: p.slug,
  title: p.title,
  category: localizeText(p.category, locale),
  kind: p.kind,
  region: p.region,
  summary: localizeText(p.summary, locale),
  techStack: p.techStack,
  startDate: p.startDate,
  endDate: p.endDate,
  url: p.url,
  repoUrl: p.repoUrl,
})

export const listProjects = (locale: Locale, kind?: ProjectKind): ProjectSummary[] =>
  published()
    .filter((p) => !kind || p.kind === kind)
    .map((p) => toSummary(p, locale))

export type ProjectDetail = ProjectSummary & {
  overview: string[]
  features: string[]
  industry: string
  role: string
  collaborators: string
  image?: string
  images: string[]
  video?: string
}

export const getProject = (slug: string, locale: Locale): ProjectDetail | NotFound => {
  const p = published().find((project) => project.slug === slug)
  if (!p) return notFound(slug)

  const images = (p.images ?? (p.image ? [p.image] : [])).map(absolutize)

  return {
    ...toSummary(p, locale),
    overview: localizeText(p.overview, locale),
    features: localizeText(p.features, locale),
    industry: localizeText(p.industry, locale),
    role: p.role,
    collaborators: p.collaborators,
    image: p.image ? absolutize(p.image) : undefined,
    images,
    video: p.video ? absolutize(p.video) : undefined,
  }
}

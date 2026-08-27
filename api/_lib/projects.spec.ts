import { describe, it, expect, vi } from 'vitest'
import type { Project } from '../../src/types/project'

const text = (en: string) => ({ en, pt: en, es: en, de: en, fr: en, ja: en })
const list = (items: string[]) => ({ en: items, pt: items, es: items, de: items, fr: items, ja: items })

const fixture: Project[] = [
  {
    slug: 'published-one',
    title: 'Published One',
    category: text('Web'),
    kind: 'client',
    startDate: '2024-01',
    endDate: '2024-06',
    summary: text('A published project.'),
    overview: list(['Overview.']),
    features: list(['Feature.']),
    industry: text('Retail'),
    techStack: ['Vue'],
    role: 'Lead',
    collaborators: 'Solo',
  },
  {
    slug: 'draft-one',
    title: 'Draft One',
    status: 'draft',
    category: text('Web'),
    kind: 'study',
    startDate: '2025-01',
    endDate: '2025-06',
    summary: text('A draft project.'),
    overview: list(['Secret overview.']),
    features: list(['Secret feature.']),
    industry: text('Retail'),
    techStack: ['React'],
    role: 'Lead',
    collaborators: 'Solo',
  },
]

vi.mock('../../src/data/projects', () => ({ projects: fixture }))

const { isPublished, listProjects, getProject } = await import('./projects')

describe('isPublished', () => {
  it('excludes draft projects', () => {
    expect(isPublished(fixture[0]!)).toBe(true)
    expect(isPublished(fixture[1]!)).toBe(false)
  })
})

describe('listProjects', () => {
  it('never includes a draft project', () => {
    const slugs = listProjects('en').map((p) => p.slug)
    expect(slugs).toEqual(['published-one'])
    expect(slugs).not.toContain('draft-one')
  })
})

describe('getProject', () => {
  it('returns not-found for a draft slug — never the draft content', () => {
    const result = getProject('draft-one', 'en')
    expect(result).toEqual({ error: 'not_found', slug: 'draft-one' })
  })

  it('returns not-found for an unknown slug', () => {
    expect(getProject('nope', 'en')).toEqual({ error: 'not_found', slug: 'nope' })
  })

  it('returns full detail for a published slug', () => {
    const result = getProject('published-one', 'en')
    expect(result).toMatchObject({ slug: 'published-one', title: 'Published One', role: 'Lead' })
  })
})

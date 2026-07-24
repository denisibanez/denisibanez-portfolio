import { describe, it, expect, vi, afterEach } from 'vitest'
import { useProjects } from './useProjects'

afterEach(() => vi.unstubAllEnvs())

describe('useProjects', () => {
  const { projects, getBySlug, getAdjacent } = useProjects()

  it('exposes a non-empty project list', () => {
    expect(projects.length).toBeGreaterThan(0)
    expect(projects.every((p) => p.slug && p.title)).toBe(true)
  })

  it('finds a project by slug and returns null for unknown', () => {
    expect(getBySlug(projects[0]!.slug)?.slug).toBe(projects[0]!.slug)
    expect(getBySlug('does-not-exist')).toBeNull()
  })

  it('wraps around when getting adjacent projects', () => {
    const first = projects[0]!.slug
    const last = projects[projects.length - 1]!.slug
    expect(getAdjacent(first).prev?.slug).toBe(last)
    expect(getAdjacent(first).next?.slug).toBe(projects[1]!.slug)
    expect(getAdjacent(last).next?.slug).toBe(first)
  })

  it('returns nulls for an unknown slug', () => {
    expect(getAdjacent('nope')).toEqual({ prev: null, next: null })
  })

  it('shows drafts in dev but hides them (and 404s) in production', () => {
    vi.stubEnv('DEV', true)
    expect(useProjects().projects.some((p) => p.status === 'draft')).toBe(true)

    vi.stubEnv('DEV', false)
    const prod = useProjects()
    expect(prod.projects.every((p) => p.status !== 'draft')).toBe(true)
    expect(prod.getBySlug('titanium-pen')).toBeNull()
  })
})

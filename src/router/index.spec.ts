import { describe, it, expect, vi } from 'vitest'
import type { RouteLocationNormalized } from 'vue-router'
import { requireProject } from './index'

vi.mock('@/data/projects')

// Fixture (src/data/__mocks__/projects) publishes alpha/beta/gamma.
const at = (path: string, slug: string) =>
  ({ path, params: { slug } }) as unknown as RouteLocationNormalized

describe('requireProject guard', () => {
  it('allows a known project slug through', () => {
    expect(requireProject(at('/projects/alpha', 'alpha'))).toBe(true)
    expect(requireProject(at('/projects/gamma/specs', 'gamma'))).toBe(true)
  })

  it('redirects an unknown slug to the 404 route, preserving the URL segments', () => {
    const result = requireProject(at('/projects/does-not-exist', 'does-not-exist'))
    expect(result).toMatchObject({
      name: 'not-found',
      params: { pathMatch: ['projects', 'does-not-exist'] },
    })
  })

  it('redirects an unknown specs slug to the 404 route', () => {
    const result = requireProject(at('/projects/nope/specs', 'nope'))
    expect(result).toMatchObject({
      name: 'not-found',
      params: { pathMatch: ['projects', 'nope', 'specs'] },
    })
  })
})

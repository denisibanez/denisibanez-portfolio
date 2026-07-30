import { describe, it, expect, vi, afterEach } from 'vitest'
import { useBlog } from './useBlog'

vi.mock('@/data/blog')

afterEach(() => vi.unstubAllEnvs())

describe('useBlog', () => {
  it('orders visible posts newest-first', () => {
    // Dev (default) shows the draft too: beta 2025-01, delta 2025-06... → newest first.
    vi.stubEnv('DEV', true)
    const { posts } = useBlog()
    expect(posts.map((p) => p.slug)).toEqual(['delta-draft', 'beta', 'alpha', 'gamma'])
  })

  it('hides drafts in production', () => {
    vi.stubEnv('DEV', false)
    const { posts, getBySlug } = useBlog()
    expect(posts.map((p) => p.slug)).toEqual(['beta', 'alpha', 'gamma'])
    expect(getBySlug('delta-draft')).toBeNull()
  })

  it('looks a post up by slug', () => {
    vi.stubEnv('DEV', false)
    const { getBySlug } = useBlog()
    expect(getBySlug('beta')?.title.en).toBe('Beta')
    expect(getBySlug('nope')).toBeNull()
  })
})

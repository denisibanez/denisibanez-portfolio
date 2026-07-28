import { describe, it, expect, vi } from 'vitest'
import { useBlog } from './useBlog'

vi.mock('@/data/blog')

describe('useBlog', () => {
  it('orders posts newest-first', () => {
    const { posts } = useBlog()
    expect(posts.map((p) => p.slug)).toEqual(['beta', 'alpha', 'gamma'])
  })

  it('exposes the featured post and the rest (featured excluded)', () => {
    const { featured, rest } = useBlog()
    expect(featured?.slug).toBe('alpha')
    expect(rest.map((p) => p.slug)).toEqual(['beta', 'gamma'])
  })

  it('looks a post up by slug', () => {
    const { getBySlug } = useBlog()
    expect(getBySlug('beta')?.title.en).toBe('Beta')
    expect(getBySlug('nope')).toBeNull()
  })
})

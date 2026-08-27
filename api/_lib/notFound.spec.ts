import { describe, it, expect } from 'vitest'
import { notFound } from './notFound'

describe('notFound', () => {
  it('builds the not_found shape for a slug', () => {
    expect(notFound('missing-slug')).toEqual({ error: 'not_found', slug: 'missing-slug' })
  })
})

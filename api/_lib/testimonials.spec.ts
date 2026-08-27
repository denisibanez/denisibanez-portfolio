import { describe, it, expect } from 'vitest'
import { listTestimonials } from './testimonials'

describe('listTestimonials', () => {
  it('returns every testimonial, localized, with an absolutized photo URL', () => {
    const all = listTestimonials('en')
    expect(all.length).toBeGreaterThan(0)
    const withPhoto = all.find((t) => t.photo)
    expect(withPhoto?.photo).toMatch(/^https:\/\/denisibanez\.dev\/testimonials\//)
  })
})

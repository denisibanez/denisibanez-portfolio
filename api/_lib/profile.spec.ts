import { describe, it, expect } from 'vitest'
import { getProfile } from './profile'

describe('getProfile', () => {
  it('returns the site identity with an absolutized resume URL', () => {
    const profile = getProfile()
    expect(profile.name).toBe('Denis Ibañez')
    expect(profile.resumeUrl).toBe('https://denisibanez.dev/denis-ibanez-cv.pdf')
  })

  it('includes the social links', () => {
    const profile = getProfile()
    expect(profile.socials.some((s) => s.label === 'GitHub')).toBe(true)
  })
})

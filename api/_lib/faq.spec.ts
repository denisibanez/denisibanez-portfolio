import { describe, it, expect } from 'vitest'
import { listFaq } from './faq'

describe('listFaq', () => {
  it('returns every FAQ entry localized', () => {
    const en = listFaq('en')
    const pt = listFaq('pt')
    expect(en.length).toBeGreaterThan(0)
    expect(en.length).toBe(pt.length)
    expect(en[0]!.question).not.toBe(pt[0]!.question)
  })
})

import { describe, it, expect } from 'vitest'
import { localizeText } from './localizeText'

const full = { en: 'Hello', pt: 'Olá', es: 'Hola', de: 'Hallo', fr: 'Bonjour', ja: 'こんにちは' }

describe('localizeText', () => {
  it('returns the value for the active locale', () => {
    expect(localizeText(full, 'pt')).toBe('Olá')
    expect(localizeText(full, 'de')).toBe('Hallo')
  })

  it('falls back to English when the locale is missing', () => {
    expect(localizeText({ en: 'Hello' }, 'ja')).toBe('Hello')
  })

  it('falls back to Portuguese if English is missing at runtime (defensive, malformed data)', () => {
    const malformed = { pt: 'Olá' } as unknown as Partial<typeof full> & { en: string }
    expect(localizeText(malformed, 'ja')).toBe('Olá')
  })

  it('works with list values', () => {
    expect(localizeText({ en: ['a'], pt: ['b'], es: [], de: [], fr: [], ja: [] }, 'pt')).toEqual(['b'])
  })
})

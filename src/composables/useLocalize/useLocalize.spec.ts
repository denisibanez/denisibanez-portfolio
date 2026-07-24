import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { useLocalize } from './useLocalize'

const run = (locale: string) => {
  let localized!: ReturnType<typeof useLocalize>['localized']
  const Host = defineComponent({
    setup() {
      localized = useLocalize().localized
      return () => null
    },
  })
  const i18n = createI18n({ legacy: false, locale, messages: { en: {}, pt: {}, de: {} } })
  mount(Host, { global: { plugins: [i18n] } })
  return localized
}

const map = { en: 'Hello', pt: 'Olá', es: 'Hola', de: 'Hallo', fr: 'Bonjour', ja: 'こんにちは' }

describe('useLocalize', () => {
  it('returns the value for the active locale', () => {
    expect(run('pt')(map)).toBe('Olá')
    expect(run('de')(map)).toBe('Hallo')
  })

  it('falls back to English for an unmapped locale', () => {
    expect(run('xx' as string)({ ...map, en: 'Hello' })).toBe('Hello')
  })

  it('works with list values', () => {
    expect(run('pt')({ en: ['a'], pt: ['b'], es: [], de: [], fr: [], ja: [] })).toEqual(['b'])
  })
})

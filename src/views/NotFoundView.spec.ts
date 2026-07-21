import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import NotFoundView from './NotFoundView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: { notFound: { eyebrow: 'Lost?', message: 'That page does not exist.', cta: 'Back home' } },
  },
})

const factory = () => mount(NotFoundView, { global: { plugins: [i18n] } })

describe('NotFoundView', () => {
  it('shows the 404 heading and message', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('404')
    expect(wrapper.text()).toContain('That page does not exist.')
  })

  it('links back to the home page', () => {
    const wrapper = factory()
    expect(wrapper.get('a').attributes('href')).toBe('/')
  })
})

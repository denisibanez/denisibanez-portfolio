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
  it('renders the back-home button with the CTA label', () => {
    const wrapper = factory()
    const button = wrapper.get('button')
    expect(button.text()).toBe('Back home')
  })

  it('shows the notfound background image', () => {
    const wrapper = factory()
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })
})

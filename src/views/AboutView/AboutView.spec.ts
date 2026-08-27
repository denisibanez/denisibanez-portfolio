import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AboutView from './AboutView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      about: {
        eyebrow: 'Get to know me',
        title: 'About me',
        lead: 'Lead paragraph.',
        body: 'Body paragraph.',
        cta: 'See my work',
        roles: 'Vue • React • Angular',
      },
      faq: {
        eyebrow: 'Common questions',
        title: 'Frequently asked questions',
      },
    },
  },
})

const factory = () => mount(AboutView, { global: { plugins: [i18n] } })

describe('AboutView', () => {
  it('renders the title heading', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('About me')
  })

  it('shows both copy paragraphs and the CTA', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Lead paragraph.')
    expect(wrapper.text()).toContain('Body paragraph.')
    expect(wrapper.text()).toContain('See my work')
  })

  it('renders the background image', () => {
    const wrapper = factory()
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })

  it('renders the FAQ section with its disclosures', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Frequently asked questions')
    expect(wrapper.findAll('details').length).toBeGreaterThan(0)
  })
})

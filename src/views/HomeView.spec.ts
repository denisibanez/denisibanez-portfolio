import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HomeView from './HomeView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      home: {
        eyebrow: 'Portfolio',
        greetingLead: "Hi, I'm",
        role: 'Software Developer',
        description: 'Front-end developer.',
        cta: 'View projects',
        play: 'Play showreel',
      },
    },
  },
})

const factory = () => mount(HomeView, { global: { plugins: [i18n] } })

describe('HomeView', () => {
  it('renders the hero heading with the name and role', () => {
    const wrapper = factory()
    const h1 = wrapper.get('h1')
    expect(h1.text()).toContain('Denis Ibañez')
    expect(h1.text()).toContain('Software Developer')
  })

  it('renders the eyebrow and the primary CTA', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Portfolio')
    expect(wrapper.text()).toContain('View projects')
  })

  it('paints the hero banner and the video layer', () => {
    const wrapper = factory()
    expect(wrapper.find('img').attributes('src')).toBeTruthy()
    expect(wrapper.find('video').exists()).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import FaqSection from './FaqSection.vue'
import type { FaqItem } from '@/types/faq'

const items: FaqItem[] = [
  {
    question: { en: 'Q1', pt: 'Q1', es: 'Q1', fr: 'Q1', de: 'Q1', ja: 'Q1' },
    answer: { en: 'A1', pt: 'A1', es: 'A1', fr: 'A1', de: 'A1', ja: 'A1' },
  },
  {
    question: { en: 'Q2', pt: 'Q2', es: 'Q2', fr: 'Q2', de: 'Q2', ja: 'Q2' },
    answer: { en: 'A2', pt: 'A2', es: 'A2', fr: 'A2', de: 'A2', ja: 'A2' },
  },
]

const mountFaq = () =>
  mount(FaqSection, {
    props: { items, eyebrow: 'Common questions', title: 'FAQ' },
    global: { plugins: [createI18n({ legacy: false, locale: 'en', messages: { en: {} } })] },
  })

describe('FaqSection', () => {
  it('renders every question and answer for the active locale', () => {
    const wrapper = mountFaq()
    expect(wrapper.text()).toContain('Q1')
    expect(wrapper.text()).toContain('A1')
    expect(wrapper.text()).toContain('Q2')
    expect(wrapper.text()).toContain('A2')
  })

  it('renders one native <details> disclosure per item', () => {
    const wrapper = mountFaq()
    expect(wrapper.findAll('details')).toHaveLength(items.length)
  })

  it('renders the eyebrow and title props', () => {
    const wrapper = mountFaq()
    expect(wrapper.text()).toContain('Common questions')
    expect(wrapper.text()).toContain('FAQ')
  })
})

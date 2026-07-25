import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from './BaseBadge.vue'

describe('BaseBadge', () => {
  it('renders the label prop', () => {
    const wrapper = mount(BaseBadge, { props: { label: 'Draft' } })
    expect(wrapper.text()).toBe('Draft')
  })

  it('renders default slot content over the label', () => {
    const wrapper = mount(BaseBadge, { props: { label: 'Ignored' }, slots: { default: 'Case Study' } })
    expect(wrapper.text()).toBe('Case Study')
  })

  it('is plain by default and adds a backdrop when floating', () => {
    const plain = mount(BaseBadge, { props: { label: 'x' } })
    expect(plain.classes()).not.toContain('backdrop-blur-sm')

    const floating = mount(BaseBadge, { props: { label: 'x', floating: true } })
    expect(floating.classes()).toContain('backdrop-blur-sm')
    expect(floating.classes()).toContain('bg-surface/80')
  })
})

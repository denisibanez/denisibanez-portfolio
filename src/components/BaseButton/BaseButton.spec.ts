import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(BaseButton, { slots: { default: 'Ver projetos' } })
    expect(wrapper.text()).toContain('Ver projetos')
  })

  it('applies the primary variant by default', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies the outline variant', () => {
    const wrapper = mount(BaseButton, { props: { variant: 'outline' } })
    expect(wrapper.classes()).toContain('border-outline')
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('is full width on mobile when block is set', () => {
    const wrapper = mount(BaseButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('w-full')
  })
})

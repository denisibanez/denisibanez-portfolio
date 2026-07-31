import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseIconButton from './BaseIconButton.vue'

describe('BaseIconButton', () => {
  it('renders a labelled button with the icon slot', () => {
    const wrapper = mount(BaseIconButton, { props: { label: 'Close' }, slots: { default: '<svg />' } })
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-label')).toBe('Close')
    expect(btn.attributes('type')).toBe('button')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('maps size and variant to classes', () => {
    const lg = mount(BaseIconButton, { props: { label: 'x', size: 'lg', variant: 'glass' } })
    expect(lg.find('button').classes()).toEqual(expect.arrayContaining(['size-11', 'border-white/15']))
    const soft = mount(BaseIconButton, { props: { label: 'x', size: 'sm', variant: 'glass-soft' } })
    expect(soft.find('button').classes()).toEqual(expect.arrayContaining(['size-9', 'border-white/10']))
  })

  it('lets native click listeners fall through (no click emit declared)', async () => {
    let clicked = false
    const wrapper = mount(BaseIconButton, {
      props: { label: 'x' },
      attrs: { onClick: () => (clicked = true) },
    })
    await wrapper.find('button').trigger('click')
    expect(clicked).toBe(true)
  })
})

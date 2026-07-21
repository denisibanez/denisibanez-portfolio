import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingReveal from './LoadingReveal.vue'

describe('LoadingReveal', () => {
  it('renders blurred and sharp banner layers', () => {
    const wrapper = mount(LoadingReveal)
    expect(wrapper.find('.img--blur').exists()).toBe(true)
    expect(wrapper.find('.img--sharp').exists()).toBe(true)
  })

  it('exposes the label to assistive tech', () => {
    const wrapper = mount(LoadingReveal, { props: { label: 'Carregando' } })
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Carregando')
    expect(wrapper.text()).toContain('Carregando')
  })

  it('reveals a rounded-square window while the pointer moves', async () => {
    const wrapper = mount(LoadingReveal)
    await wrapper.trigger('pointermove')
    const style = wrapper.get('.img--sharp').attributes('style') ?? ''
    expect(style).toContain('inset(')
    expect(style).toContain('round 40px')
  })

  it('hides the reveal on pointer leave', async () => {
    const wrapper = mount(LoadingReveal)
    await wrapper.trigger('pointermove')
    await wrapper.trigger('pointerleave')
    expect(wrapper.get('.img--sharp').attributes('style')).toContain('inset(50%')
  })
})

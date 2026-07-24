import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSkeleton from './BaseSkeleton.vue'

describe('BaseSkeleton', () => {
  it('is decorative (aria-hidden) with the shimmer class', () => {
    const wrapper = mount(BaseSkeleton)
    const el = wrapper.get('div')
    expect(el.attributes('aria-hidden')).toBe('true')
    expect(el.classes()).toContain('skeleton')
    expect(el.classes()).toContain('rounded-none')
  })

  it('supports a rounded variant', () => {
    const wrapper = mount(BaseSkeleton, { props: { rounded: true } })
    expect(wrapper.get('div').classes()).toContain('rounded-full')
  })

  it('accepts sizing utility classes from the parent', () => {
    const wrapper = mount(BaseSkeleton, { attrs: { class: 'h-4 w-40' } })
    expect(wrapper.get('div').classes()).toEqual(expect.arrayContaining(['h-4', 'w-40', 'skeleton']))
  })
})

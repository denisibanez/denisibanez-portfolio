import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePagination from './BasePagination.vue'

const factory = (props: { modelValue: number; pageCount: number }) => mount(BasePagination, { props })

describe('BasePagination', () => {
  it('renders nothing when there is a single page', () => {
    expect(factory({ modelValue: 1, pageCount: 1 }).find('nav').exists()).toBe(false)
  })

  it('renders a button per page (small counts) and marks the current one', () => {
    const wrapper = factory({ modelValue: 2, pageCount: 4 })
    const numbers = wrapper.findAll('button').map((b) => b.text()).filter((t) => /^\d+$/.test(t))
    expect(numbers).toEqual(['1', '2', '3', '4'])
    expect(wrapper.get('[aria-current="page"]').text()).toBe('2')
  })

  it('emits the target page on click', async () => {
    const wrapper = factory({ modelValue: 1, pageCount: 4 })
    await wrapper.findAll('button').find((b) => b.text() === '3')!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('disables prev on the first page and next on the last', () => {
    const first = factory({ modelValue: 1, pageCount: 3 })
    expect(first.get('button[aria-label="Previous"]').attributes('disabled')).toBeDefined()
    const last = factory({ modelValue: 3, pageCount: 3 })
    expect(last.get('button[aria-label="Next"]').attributes('disabled')).toBeDefined()
  })

  it('windows large page counts with ellipses', () => {
    const wrapper = factory({ modelValue: 10, pageCount: 20 })
    expect(wrapper.text()).toContain('…')
    const numbers = wrapper.findAll('button').map((b) => b.text()).filter((t) => /^\d+$/.test(t))
    expect(numbers).toContain('1')
    expect(numbers).toContain('20')
    expect(numbers).toContain('10')
    expect(numbers).not.toContain('5')
  })
})

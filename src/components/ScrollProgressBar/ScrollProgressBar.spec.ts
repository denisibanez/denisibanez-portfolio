import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ScrollProgressBar from './ScrollProgressBar.vue'

describe('ScrollProgressBar', () => {
  it('sets the fill height from progress', () => {
    const wrapper = mount(ScrollProgressBar, { props: { progress: 40 } })
    expect(wrapper.find('.w-full').attributes('style')).toContain('height: 40%')
  })

  it('defaults to the primary fill and switches to tertiary', () => {
    expect(mount(ScrollProgressBar, { props: { progress: 10 } }).find('.w-full').classes()).toContain('bg-primary')
    expect(mount(ScrollProgressBar, { props: { progress: 10, variant: 'tertiary' } }).find('.w-full').classes()).toContain('bg-tertiary')
  })
})

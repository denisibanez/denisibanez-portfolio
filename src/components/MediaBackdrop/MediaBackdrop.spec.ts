import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MediaBackdrop from './MediaBackdrop.vue'

const factory = () =>
  mount(MediaBackdrop, {
    props: { src: '/bg.jpg' },
    slots: { default: '<p class="content">Hello</p>', scrim: '<div class="scrim" />' },
  })

describe('MediaBackdrop', () => {
  it('renders the decorative background image', () => {
    const img = factory().get('img')
    expect(img.attributes('src')).toBe('/bg.jpg')
    expect(img.attributes('aria-hidden')).toBe('true')
    expect(img.attributes('alt')).toBe('')
  })

  it('renders the scrim and default slots', () => {
    const wrapper = factory()
    expect(wrapper.find('.scrim').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('Hello')
  })

  it('works without a scrim slot', () => {
    const wrapper = mount(MediaBackdrop, { props: { src: '/x.jpg' }, slots: { default: '<div class="c" />' } })
    expect(wrapper.find('.c').exists()).toBe(true)
  })
})

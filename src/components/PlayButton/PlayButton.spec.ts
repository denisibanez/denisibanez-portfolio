import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayButton from './PlayButton.vue'

describe('PlayButton', () => {
  it('renders with the given label', () => {
    const wrapper = mount(PlayButton, { props: { label: 'Play showreel' } })
    expect(wrapper.get('button').attributes('aria-label')).toBe('Play showreel')
  })

  it('emits click when pressed', async () => {
    const wrapper = mount(PlayButton)
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

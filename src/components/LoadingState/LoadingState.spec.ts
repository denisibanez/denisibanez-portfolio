import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingState from './LoadingState.vue'

describe('LoadingState', () => {
  it('is an accessible live status region', () => {
    const wrapper = mount(LoadingState)
    const status = wrapper.get('[role="status"]')
    expect(status.attributes('aria-live')).toBe('polite')
  })

  it('shows the label when provided', () => {
    const wrapper = mount(LoadingState, { props: { label: 'Loading projects' } })
    expect(wrapper.text()).toBe('Loading projects')
  })

  it('renders only the spinner without a label', () => {
    const wrapper = mount(LoadingState)
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
  })
})

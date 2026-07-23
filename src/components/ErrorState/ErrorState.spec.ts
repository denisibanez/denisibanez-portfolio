import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorState from './ErrorState.vue'

const factory = () =>
  mount(ErrorState, {
    props: { title: 'Something went wrong', message: 'Could not load.', retryLabel: 'Try again' },
  })

describe('ErrorState', () => {
  it('renders as an alert with the title and message', () => {
    const wrapper = factory()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Could not load.')
  })

  it('emits retry when the button is clicked', async () => {
    const wrapper = factory()
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('hides the retry button when no label is given', () => {
    const wrapper = mount(ErrorState, { props: { title: 'Oops', message: 'x' } })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})

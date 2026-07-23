import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToast from './BaseToast.vue'
import type { ToastType } from '@/composables/useToast'

const factory = (type: ToastType = 'info') =>
  mount(BaseToast, { props: { type, message: 'Hello', dismissLabel: 'Dismiss' } })

describe('BaseToast', () => {
  it('renders the message and a dismiss control', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.find('button[aria-label="Dismiss"]').exists()).toBe(true)
  })

  it('emits dismiss when closed', async () => {
    const wrapper = factory()
    await wrapper.get('button[aria-label="Dismiss"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('uses alert role for urgent variants, status otherwise', () => {
    expect(factory('error').find('[role="alert"]').exists()).toBe(true)
    expect(factory('warning').find('[role="alert"]').exists()).toBe(true)
    expect(factory('success').find('[role="status"]').exists()).toBe(true)
    expect(factory('info').find('[role="status"]').exists()).toBe(true)
  })

  it('applies the semantic accent per variant', () => {
    expect(factory('success').find('.bg-success').exists()).toBe(true)
    expect(factory('error').find('.bg-error').exists()).toBe(true)
    expect(factory('warning').find('.bg-warning').exists()).toBe(true)
    expect(factory('info').find('.bg-info').exists()).toBe(true)
  })
})

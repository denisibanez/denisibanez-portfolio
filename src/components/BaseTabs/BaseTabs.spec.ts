import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from './BaseTabs.vue'
import type { Tab } from './BaseTabs.types'

const tabs: Tab[] = [
  { label: 'All', value: 'all' },
  { label: 'Study', value: 'study' },
  { label: 'Client', value: 'client' },
]

const factory = (modelValue = 'all') => mount(BaseTabs, { props: { tabs, modelValue } })

describe('BaseTabs', () => {
  it('renders a tab per item with the active one selected', () => {
    const wrapper = factory('study')
    const buttons = wrapper.findAll('[role="tab"]')
    expect(buttons).toHaveLength(3)
    const active = buttons.find((b) => b.attributes('aria-selected') === 'true')
    expect(active?.text()).toBe('Study')
  })

  it('emits update:modelValue when a tab is clicked', async () => {
    const wrapper = factory('all')
    await wrapper.findAll('[role="tab"]')[2]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['client'])
  })

  it('does not emit when the already-active tab is clicked', async () => {
    const wrapper = factory('all')
    await wrapper.findAll('[role="tab"]')[0]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('moves selection with the arrow keys', async () => {
    const wrapper = factory('all')
    await wrapper.findAll('[role="tab"]')[0]!.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['study'])
  })
})

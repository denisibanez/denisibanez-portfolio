import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSelect from './LanguageSelect.vue'

const options = [
  { label: 'PT', value: 'pt' },
  { label: 'EN', value: 'en' },
]

describe('LanguageSelect', () => {
  it('shows the current option label', () => {
    const wrapper = mount(LanguageSelect, { props: { modelValue: 'pt', options } })
    expect(wrapper.find('button[aria-haspopup]').text()).toContain('PT')
  })

  it('is closed by default', () => {
    const wrapper = mount(LanguageSelect, { props: { modelValue: 'pt', options } })
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('opens the menu on click', async () => {
    const wrapper = mount(LanguageSelect, { props: { modelValue: 'pt', options } })
    await wrapper.find('button[aria-haspopup]').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2)
  })

  it('emits update:modelValue and closes on select', async () => {
    const wrapper = mount(LanguageSelect, { props: { modelValue: 'pt', options } })
    await wrapper.find('button[aria-haspopup]').trigger('click')
    await wrapper.findAll('[role="menuitem"]')[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['en'])
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })
})

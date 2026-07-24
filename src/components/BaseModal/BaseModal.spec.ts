import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import BaseModal from './BaseModal.vue'

const mountModal = (open: boolean) =>
  mount(BaseModal, {
    props: { open, label: 'Details' },
    slots: { default: '<div class="panel">Body</div>' },
  })

describe('BaseModal', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.body.style.overflow = ''
  })

  it('renders nothing when closed', async () => {
    mountModal(false)
    await nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('teleports the dialog + slot to the body when open and locks scroll', async () => {
    mountModal(true)
    await nextTick()
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog?.getAttribute('aria-modal')).toBe('true')
    expect(document.body.textContent).toContain('Body')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('emits close on Escape', async () => {
    const wrapper = mountModal(true)
    await nextTick()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when the backdrop is clicked', async () => {
    const wrapper = mountModal(true)
    await nextTick()
    document.body.querySelector<HTMLElement>('[role="dialog"]')?.click()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

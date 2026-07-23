import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ToastHost from './ToastHost.vue'
import { useToast } from '@/composables/useToast'

const { toasts, notify } = useToast()

describe('ToastHost', () => {
  beforeEach(() => {
    toasts.value = []
    document.body.innerHTML = ''
  })

  it('renders queued toasts teleported to the body', async () => {
    notify('Saved!', 'success', 0)
    mount(ToastHost)
    await nextTick()
    expect(document.body.textContent).toContain('Saved!')
    expect(document.body.querySelector('[role="status"]')).not.toBeNull()
  })

  it('marks error toasts as alerts', async () => {
    notify('Failed', 'error', 0)
    mount(ToastHost)
    await nextTick()
    expect(document.body.querySelector('[role="alert"]')).not.toBeNull()
  })

  it('dismisses a toast when its close button is clicked', async () => {
    notify('Bye', 'info', 0)
    mount(ToastHost, { props: { dismissLabel: 'Dismiss' } })
    await nextTick()
    const close = document.body.querySelector<HTMLButtonElement>('button[aria-label="Dismiss"]')
    close?.click()
    await nextTick()
    expect(document.body.textContent).not.toContain('Bye')
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { useToast } from './useToast'

describe('useToast', () => {
  const { toasts, notify, error, dismiss } = useToast()

  beforeEach(() => {
    toasts.value = []
  })

  it('pushes a toast with a message and type', () => {
    notify('Saved', 'success', 0)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0]).toMatchObject({ message: 'Saved', type: 'success' })
  })

  it('maps the typed helpers to their variant', () => {
    const { warning, success, info } = useToast()
    error('e', 0)
    warning('w', 0)
    success('s', 0)
    info('i', 0)
    expect(toasts.value.map((t) => t.type)).toEqual(['error', 'warning', 'success', 'info'])
  })

  it('dismisses by id and shares one queue', () => {
    const id = notify('One', 'info', 0)
    notify('Two', 'info', 0)
    dismiss(id)
    expect(toasts.value.map((t) => t.message)).toEqual(['Two'])
    // Same singleton queue from a second call site.
    expect(useToast().toasts.value).toHaveLength(1)
  })
})

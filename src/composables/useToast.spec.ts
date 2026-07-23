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

  it('defaults error() to the error type', () => {
    error('Boom', 0)
    expect(toasts.value[0]?.type).toBe('error')
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

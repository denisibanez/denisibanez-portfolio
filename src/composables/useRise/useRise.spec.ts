import { describe, it, expect } from 'vitest'
import { useRise } from './useRise'

describe('useRise', () => {
  it('builds a fade-up motion config with the given delay', () => {
    const { rise } = useRise()
    const config = rise(0.2)
    expect(config.initial).toEqual({ opacity: 0, y: 24 })
    expect(config.animate).toEqual({ opacity: 1, y: 0 })
    expect(config.transition.delay).toBe(0.2)
    expect(config.transition.ease).toBe('easeOut')
  })
})

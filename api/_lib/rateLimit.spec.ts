import { describe, it, expect, beforeEach, vi } from 'vitest'
import { isRateLimited } from './rateLimit'

describe('isRateLimited', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('allows up to `max` calls within the window, then blocks', () => {
    const key = `test-${Math.random()}`
    expect(isRateLimited(key, 3, HOUR)).toBe(false)
    expect(isRateLimited(key, 3, HOUR)).toBe(false)
    expect(isRateLimited(key, 3, HOUR)).toBe(false)
    expect(isRateLimited(key, 3, HOUR)).toBe(true)
  })

  it('tracks each key independently', () => {
    const a = `a-${Math.random()}`
    const b = `b-${Math.random()}`
    isRateLimited(a, 1, HOUR)
    expect(isRateLimited(a, 1, HOUR)).toBe(true)
    expect(isRateLimited(b, 1, HOUR)).toBe(false)
  })

  it('resets once the window elapses', () => {
    vi.useFakeTimers()
    const key = `reset-${Math.random()}`
    expect(isRateLimited(key, 1, 1000)).toBe(false)
    expect(isRateLimited(key, 1, 1000)).toBe(true)
    vi.advanceTimersByTime(1001)
    expect(isRateLimited(key, 1, 1000)).toBe(false)
    vi.useRealTimers()
  })
})

const HOUR = 60 * 60 * 1000

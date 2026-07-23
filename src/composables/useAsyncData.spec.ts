import { describe, it, expect, vi } from 'vitest'
import { useAsyncData } from './useAsyncData'

describe('useAsyncData', () => {
  it('resolves data and toggles pending', async () => {
    const { data, pending, error, retry } = useAsyncData(() => Promise.resolve(42), { immediate: false })
    expect(data.value).toBeNull()
    const p = retry()
    expect(pending.value).toBe(true)
    await p
    expect(pending.value).toBe(false)
    expect(data.value).toBe(42)
    expect(error.value).toBeNull()
  })

  it('captures a rejection as an Error instance', async () => {
    const { data, error, retry } = useAsyncData(() => Promise.reject(new Error('boom')), {
      immediate: false,
    })
    await retry()
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe('boom')
    expect(data.value).toBeNull()
  })

  it('recovers on a successful retry', async () => {
    const fetcher = vi.fn<() => Promise<string>>()
    fetcher.mockRejectedValueOnce(new Error('x')).mockResolvedValueOnce('ok')
    const { data, error, retry } = useAsyncData(fetcher, { immediate: false })
    await retry()
    expect(error.value).toBeInstanceOf(Error)
    await retry()
    expect(error.value).toBeNull()
    expect(data.value).toBe('ok')
  })
})

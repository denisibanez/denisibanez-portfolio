import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useInitialLoad } from './useInitialLoad'

// A controllable Image stub: loads (fires onload) as soon as `src` is set.
class FakeImage {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  complete = false
  set src(_value: string) {
    this.onload?.()
  }
}

const Probe = {
  template: '<div />',
  setup() {
    return useInitialLoad()
  },
}

beforeEach(() => {
  vi.stubGlobal('Image', FakeImage as unknown as typeof Image)
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('useInitialLoad', () => {
  it('starts loading', () => {
    const wrapper = mount(Probe)
    expect((wrapper.vm as unknown as { isLoading: boolean }).isLoading).toBe(true)
  })

  it('stops loading once the banner is loaded and the minimum time has elapsed', async () => {
    const wrapper = mount(Probe)
    const vm = wrapper.vm as unknown as { isLoading: boolean }
    expect(vm.isLoading).toBe(true)
    vi.advanceTimersByTime(700)
    await wrapper.vm.$nextTick()
    expect(vm.isLoading).toBe(false)
  })
})

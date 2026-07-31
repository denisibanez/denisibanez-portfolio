import { describe, it, expect } from 'vitest'
import { useScrollProgress } from './useScrollProgress'

describe('useScrollProgress', () => {
  it('starts at zero', () => {
    const { scrollProgress } = useScrollProgress()
    expect(scrollProgress.value).toBe(0)
  })

  it('computes progress from the element scroll position', () => {
    const { scrollArea, scrollProgress, onScroll } = useScrollProgress()
    scrollArea.value = { scrollTop: 50, scrollHeight: 200, clientHeight: 100 } as HTMLElement
    onScroll()
    // 50 / (200 - 100) = 50%
    expect(scrollProgress.value).toBe(50)
  })

  it('stays at zero when there is nothing to scroll', () => {
    const { scrollArea, scrollProgress, onScroll } = useScrollProgress()
    scrollArea.value = { scrollTop: 0, scrollHeight: 100, clientHeight: 100 } as HTMLElement
    onScroll()
    expect(scrollProgress.value).toBe(0)
  })
})

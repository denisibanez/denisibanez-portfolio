import { describe, it, expect } from 'vitest'
import { monthsBetween, formatMonth, formatRange, yearOf } from './timeline'

describe('timeline utils', () => {
  it('counts inclusive months between two YYYY-MM dates', () => {
    expect(monthsBetween('2024-02', '2024-09')).toBe(8)
    expect(monthsBetween('2023-01', '2023-01')).toBe(1)
    expect(monthsBetween('2023-11', '2024-02')).toBe(4)
  })

  it('formats a single month', () => {
    expect(formatMonth('2024-09')).toBe('Sep 2024')
    expect(formatMonth('2023-01')).toBe('Jan 2023')
  })

  it('formats a range', () => {
    expect(formatRange('2024-02', '2024-09')).toBe('Feb 2024 — Sep 2024')
  })

  it('extracts the year', () => {
    expect(yearOf('2024-09')).toBe('2024')
  })
})

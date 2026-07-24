import { describe, it, expect } from 'vitest'
import { getInitials } from './getInitials'

describe('getInitials', () => {
  it('takes the first two words, uppercased', () => {
    expect(getInitials('Alexandra Vance')).toBe('AV')
    expect(getInitials('Aether Watch Co.')).toBe('AW')
  })

  it('handles a single word', () => {
    expect(getInitials('Denis')).toBe('D')
  })

  it('ignores extra whitespace', () => {
    expect(getInitials('  Marcus   Thorne  ')).toBe('MT')
  })
})

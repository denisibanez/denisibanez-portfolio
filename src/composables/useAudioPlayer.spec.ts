import { describe, it, expect } from 'vitest'
import { useAudioPlayer } from './useAudioPlayer'
import type { Track } from '@/types/track'

const tracks: Track[] = [
  { title: 'A', artist: 'X', src: 'a.mp3' },
  { title: 'B', artist: 'Y', src: 'b.mp3' },
  { title: 'C', artist: 'Z', src: 'c.mp3' },
]

describe('useAudioPlayer', () => {
  it('exposes the current track and playlist flag', () => {
    const p = useAudioPlayer(() => tracks)
    expect(p.track.value.title).toBe('A')
    expect(p.hasPlaylist.value).toBe(true)
    expect(useAudioPlayer(() => [tracks[0]!]).hasPlaylist.value).toBe(false)
  })

  it('cycles tracks with wrap-around', () => {
    const p = useAudioPlayer(() => tracks)
    p.nextTrack()
    expect(p.track.value.title).toBe('B')
    p.prevTrack()
    p.prevTrack()
    expect(p.track.value.title).toBe('C') // wrapped past 0
  })

  it('computes progress from time/duration', () => {
    const p = useAudioPlayer(() => tracks)
    expect(p.progress.value).toBe(0)
    p.duration.value = 200
    p.currentTime.value = 50
    expect(p.progress.value).toBe(25)
  })

  it('formats seconds as m:ss', () => {
    const p = useAudioPlayer(() => tracks)
    expect(p.format(0)).toBe('0:00')
    expect(p.format(65)).toBe('1:05')
    expect(p.format(Number.NaN)).toBe('0:00')
  })

  it('advances on ended when a playlist exists', () => {
    const p = useAudioPlayer(() => tracks)
    p.onEnded()
    expect(p.track.value.title).toBe('B')
  })
})

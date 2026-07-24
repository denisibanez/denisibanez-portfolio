import { ref, computed, nextTick } from 'vue'
import type { Track } from '@/types/track'

/**
 * Audio playback state + transport controls for a playlist. Owns the `<audio>`
 * element ref and playback state; the host component keeps the UI/animation.
 * Bind `audio` to the element and the `on*` handlers to its media events.
 */
export const useAudioPlayer = (tracks: () => Track[]) => {
  const audio = ref<HTMLAudioElement | null>(null)
  const playing = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const trackIndex = ref(0)

  const track = computed<Track>(
    () => tracks()[trackIndex.value] ?? tracks()[0] ?? { title: '', artist: '', src: '' },
  )
  const hasPlaylist = computed(() => tracks().length > 1)
  const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

  const format = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const toggle = () => {
    const el = audio.value
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const playCurrent = async () => {
    await nextTick()
    const el = audio.value
    if (!el) return
    el.currentTime = 0
    currentTime.value = 0
    duration.value = 0
    try {
      await el.play()
    } catch {
      /* autoplay / jsdom may reject */
    }
  }

  const prevTrack = () => {
    if (!hasPlaylist.value) return
    trackIndex.value = (trackIndex.value - 1 + tracks().length) % tracks().length
  }

  const nextTrack = () => {
    if (!hasPlaylist.value) return
    trackIndex.value = (trackIndex.value + 1) % tracks().length
  }

  const scrub = (event: MouseEvent) => {
    const el = audio.value
    if (!el || !duration.value) return
    const bar = event.currentTarget as HTMLElement
    const rect = bar.getBoundingClientRect()
    const fraction = Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1)
    el.currentTime = fraction * duration.value
  }

  const onTimeUpdate = () => (currentTime.value = audio.value?.currentTime ?? 0)
  const onLoaded = () => (duration.value = audio.value?.duration ?? 0)
  const onPlay = () => (playing.value = true)
  const onPause = () => (playing.value = false)
  const onEnded = () => {
    if (hasPlaylist.value) nextTrack()
    else playing.value = false
  }

  return {
    audio,
    playing,
    currentTime,
    duration,
    trackIndex,
    track,
    hasPlaylist,
    progress,
    format,
    toggle,
    playCurrent,
    prevTrack,
    nextTrack,
    scrub,
    onTimeUpdate,
    onLoaded,
    onPlay,
    onPause,
    onEnded,
  }
}

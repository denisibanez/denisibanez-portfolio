import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GlassPlayer from './GlassPlayer.vue'
import type { Track } from '@/types/track'

const tracks: Track[] = [
  { title: 'Denis Ibañez', artist: 'Showreel', src: '' },
  { title: 'Remember The Time', artist: 'Michael Jackson', src: '' },
]

describe('GlassPlayer', () => {
  it('renders as a play button when closed', () => {
    const wrapper = mount(GlassPlayer, {
      props: { open: false, tracks, label: 'Play showreel' },
    })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(wrapper.find('button[aria-label="Play showreel"]').exists()).toBe(true)
  })

  it('emits open when the play button is pressed', async () => {
    const wrapper = mount(GlassPlayer, {
      props: { open: false, tracks, label: 'Play showreel' },
    })
    await wrapper.get('button[aria-label="Play showreel"]').trigger('click')
    expect(wrapper.emitted('open')).toHaveLength(1)
  })

  it('shows the track meta and transport when open', () => {
    const wrapper = mount(GlassPlayer, { props: { open: true, tracks } })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Denis Ibañez')
    expect(wrapper.find('button[aria-label="Play"]').exists()).toBe(true)
  })

  it('switches to the next track', async () => {
    const wrapper = mount(GlassPlayer, { props: { open: true, tracks } })
    await wrapper.find('button[aria-label="Next track"]').trigger('click')
    expect(wrapper.text()).toContain('Remember The Time')
  })

  it('emits close via the close button', async () => {
    const wrapper = mount(GlassPlayer, { props: { open: true, tracks } })
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

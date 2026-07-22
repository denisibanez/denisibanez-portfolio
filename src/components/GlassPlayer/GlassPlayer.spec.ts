import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GlassPlayer, { type Track } from './GlassPlayer.vue'

const track: Track = { title: 'Denis Ibañez', artist: 'Showreel', src: '' }

describe('GlassPlayer', () => {
  it('is hidden when closed', () => {
    const wrapper = mount(GlassPlayer, { props: { open: false, track } })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('shows the track meta and transport when open', () => {
    const wrapper = mount(GlassPlayer, { props: { open: true, track } })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Denis Ibañez')
    expect(wrapper.find('button[aria-label="Play"]').exists()).toBe(true)
  })

  it('emits close via the close button', async () => {
    const wrapper = mount(GlassPlayer, { props: { open: true, track } })
    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

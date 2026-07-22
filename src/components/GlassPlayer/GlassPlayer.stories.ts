import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GlassPlayer from './GlassPlayer.vue'

const meta: Meta<typeof GlassPlayer> = {
  title: 'Components/GlassPlayer',
  component: GlassPlayer,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    track: { title: 'Denis Ibañez', artist: 'Showreel', src: '' },
  },
}

export default meta
type Story = StoryObj<typeof GlassPlayer>

export const Default: Story = {}

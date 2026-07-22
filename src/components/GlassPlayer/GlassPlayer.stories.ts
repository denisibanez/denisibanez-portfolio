import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import GlassPlayer from './GlassPlayer.vue'

const meta: Meta<typeof GlassPlayer> = {
  title: 'Components/GlassPlayer',
  component: GlassPlayer,
  parameters: { layout: 'fullscreen' },
  args: {
    open: false,
    tracks: [
      { title: 'I See Fire', artist: 'Ed Sheeran', src: '' },
      { title: 'Remember The Time', artist: 'Michael Jackson', src: '' },
      { title: 'O Bem', artist: 'Arlindo Cruz', src: '' },
    ],
    label: 'Play showreel',
  },
  decorators: [
    () => ({
      template:
        '<div style="position:relative;min-height:100vh;background:#3a1518;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof GlassPlayer>

export const Closed: Story = {}

export const Open: Story = {
  args: { open: true },
}

export const Morph: Story = {
  render: (args) => ({
    components: { GlassPlayer },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <GlassPlayer
        v-bind="args"
        :open="open"
        @open="open = true"
        @close="open = false"
      />
    `,
  }),
}

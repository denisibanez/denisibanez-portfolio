import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MediaGallery from './MediaGallery.vue'
import type { Media } from './MediaGallery.vue'

const media: Media[] = [
  { type: 'image', src: '/projects/airbnb/home.webp' },
  { type: 'image', src: '/projects/airbnb/reserve.png' },
  { type: 'image', src: '/projects/airbnb/price.png' },
]
const labels = { prev: 'Previous', next: 'Next', expand: 'Expand', close: 'Close' }

const meta: Meta<typeof MediaGallery> = {
  title: 'Components/MediaGallery',
  component: MediaGallery,
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    components: { MediaGallery },
    setup: () => ({ args }),
    template: `<div style="display:flex;justify-content:center;padding:24px"><MediaGallery v-bind="args" @update:active="args.active = $event" /></div>`,
  }),
  args: { media, active: 0, title: 'Airbnb Design System', alt: 'Airbnb', variant: 'inline', labels },
  argTypes: { variant: { control: 'inline-radio', options: ['inline', 'lightbox'] } },
}

export default meta
type Story = StoryObj<typeof MediaGallery>

export const Inline: Story = {}
export const Lightbox: Story = { args: { variant: 'lightbox' } }

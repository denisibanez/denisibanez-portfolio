import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BlogGallery from './BlogGallery.vue'

const labels = { prev: 'Previous', next: 'Next', enlarge: 'Enlarge', close: 'Close' }

const meta: Meta<typeof BlogGallery> = {
  title: 'Components/BlogGallery',
  component: BlogGallery,
  parameters: { layout: 'padded' },
  args: { alt: 'Gallery image', labels },
}

export default meta
type Story = StoryObj<typeof BlogGallery>

export const Multiple: Story = {
  args: {
    images: ['/projects/airbnb/home.png', '/projects/airbnb/reserve.png', '/projects/airbnb/price.png'],
  },
}

export const Single: Story = {
  args: { images: ['/projects/airbnb/home.png'] },
}

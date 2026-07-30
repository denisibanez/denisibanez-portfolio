import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryRings from './StoryRings.vue'
import type { StoryGroup } from '@/types/story'

const groups: StoryGroup[] = [
  { id: 'portfolio', label: 'Portfolio', cover: '/projects/airbnb/cover.png', stories: [{ image: '/projects/airbnb/home.png', title: 'Airbnb' }] },
  { id: 'blog', label: 'Blog', cover: '/blog/ewor.jpeg', stories: [{ image: '/blog/ewor.jpeg', title: 'EWOR' }] },
  { id: 'testimonials', label: 'Testimonials', cover: '/testimonials/eymard-silva.jpg', stories: [{ image: '/testimonials/eymard-silva.jpg', title: 'Eymard Silva' }] },
]

const meta: Meta<typeof StoryRings> = {
  title: 'Components/StoryRings',
  component: StoryRings,
  parameters: { layout: 'padded' },
  args: { groups, openLabel: 'Open stories' },
}

export default meta
type Story = StoryObj<typeof StoryRings>

export const Default: Story = {}

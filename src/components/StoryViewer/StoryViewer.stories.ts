import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryViewer from './StoryViewer.vue'
import type { StoryGroup } from '@/types/story'

const groups: StoryGroup[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    cover: '/projects/airbnb/cover.png',
    stories: [
      { image: '/projects/airbnb/home.png', title: 'Airbnb', subtitle: 'Design System' },
      { image: '/projects/airbnb/reserve.png', title: 'Airbnb', subtitle: 'Reserve flow' },
    ],
  },
]

const meta: Meta<typeof StoryViewer> = {
  title: 'Components/StoryViewer',
  component: StoryViewer,
  parameters: { layout: 'fullscreen' },
  args: {
    groups,
    open: true,
    startGroup: 0,
    labels: { close: 'Close', next: 'Next', prev: 'Previous', view: 'View' },
  },
}

export default meta
type Story = StoryObj<typeof StoryViewer>

export const Open: Story = {}

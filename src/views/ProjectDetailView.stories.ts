import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectDetailView from './ProjectDetailView.vue'

const meta: Meta<typeof ProjectDetailView> = {
  title: 'Views/ProjectDetailView',
  component: ProjectDetailView,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    slug: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProjectDetailView>

export const Default: Story = {
  args: { slug: 'aether-watch' },
}

export const NotFound: Story = {
  args: { slug: 'does-not-exist' },
}

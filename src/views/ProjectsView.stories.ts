import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectsView from './ProjectsView.vue'

const meta: Meta<typeof ProjectsView> = {
  title: 'Views/ProjectsView',
  component: ProjectsView,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ProjectsView>

export const Default: Story = {}

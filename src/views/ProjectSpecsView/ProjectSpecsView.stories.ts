import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectSpecsView from './ProjectSpecsView.vue'

const meta: Meta<typeof ProjectSpecsView> = {
  title: 'Views/ProjectSpecsView',
  component: ProjectSpecsView,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    slug: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProjectSpecsView>

export const Default: Story = {
  args: { slug: 'aether-watch' },
}

export const NotFound: Story = {
  args: { slug: 'does-not-exist' },
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BlogView from './BlogView.vue'

const meta: Meta<typeof BlogView> = {
  title: 'Views/BlogView',
  component: BlogView,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof BlogView>

export const Default: Story = {}

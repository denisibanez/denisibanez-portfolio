import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BlogPostView from './BlogPostView.vue'

const meta: Meta<typeof BlogPostView> = {
  title: 'Views/BlogPostView',
  component: BlogPostView,
  parameters: { layout: 'fullscreen' },
  args: { slug: 'hollow-knight-silksong-lean-teams' },
}

export default meta
type Story = StoryObj<typeof BlogPostView>

export const Default: Story = {}

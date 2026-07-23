import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TestimonialsView from './TestimonialsView.vue'

const meta: Meta<typeof TestimonialsView> = {
  title: 'Views/TestimonialsView',
  component: TestimonialsView,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof TestimonialsView>

export const Default: Story = {}

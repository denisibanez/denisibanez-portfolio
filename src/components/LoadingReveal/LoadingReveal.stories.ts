import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LoadingReveal from './LoadingReveal.vue'

const meta: Meta<typeof LoadingReveal> = {
  title: 'Components/LoadingReveal',
  component: LoadingReveal,
  parameters: { layout: 'fullscreen' },
  args: { label: 'Loading', hint: 'Move your cursor to reveal' },
}

export default meta
type Story = StoryObj<typeof LoadingReveal>

export const Default: Story = {}

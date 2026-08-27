import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ConnectView from './ConnectView.vue'

const meta: Meta<typeof ConnectView> = {
  title: 'Views/ConnectView',
  component: ConnectView,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ConnectView>

export const Default: Story = {}

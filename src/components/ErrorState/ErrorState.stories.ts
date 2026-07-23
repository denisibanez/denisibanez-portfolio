import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ErrorState from './ErrorState.vue'

const meta: Meta<typeof ErrorState> = {
  title: 'Components/ErrorState',
  component: ErrorState,
  args: {
    title: 'Something went wrong',
    message: "We couldn't load this content. Please try again.",
    retryLabel: 'Try again',
  },
}

export default meta
type Story = StoryObj<typeof ErrorState>

export const Default: Story = {}
export const WithoutRetry: Story = { args: { retryLabel: '' } }

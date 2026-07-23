import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LoadingState from './LoadingState.vue'

const meta: Meta<typeof LoadingState> = {
  title: 'Components/LoadingState',
  component: LoadingState,
  args: { label: 'Loading projects' },
}

export default meta
type Story = StoryObj<typeof LoadingState>

export const WithLabel: Story = {}
export const SpinnerOnly: Story = { args: { label: '' } }

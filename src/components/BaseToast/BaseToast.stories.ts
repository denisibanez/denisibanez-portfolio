import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseToast from './BaseToast.vue'

const meta: Meta<typeof BaseToast> = {
  title: 'Components/BaseToast',
  component: BaseToast,
  parameters: { layout: 'padded' },
  args: { message: 'Your changes have been saved.', dismissLabel: 'Dismiss' },
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
  render: (args) => ({
    components: { BaseToast },
    setup: () => ({ args }),
    template: `<div class="max-w-sm"><BaseToast v-bind="args" /></div>`,
  }),
}

export default meta
type Story = StoryObj<typeof BaseToast>

export const Info: Story = { args: { type: 'info', message: 'Just so you know…' } }
export const Success: Story = { args: { type: 'success', message: 'Saved successfully.' } }
export const Warning: Story = { args: { type: 'warning', message: 'Heads up — check your input.' } }
export const Error: Story = { args: { type: 'error', message: 'Something went wrong.' } }

export const AllVariants: Story = {
  render: () => ({
    components: { BaseToast },
    template: `
      <div class="flex max-w-sm flex-col gap-3">
        <BaseToast type="info" message="Just so you know…" />
        <BaseToast type="success" message="Saved successfully." />
        <BaseToast type="warning" message="Heads up — check your input." />
        <BaseToast type="error" message="Something went wrong." />
      </div>
    `,
  }),
}

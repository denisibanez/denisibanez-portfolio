import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  args: { variant: 'primary', disabled: false, block: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline'] },
  },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: '<BaseButton v-bind="args">Ver projetos</BaseButton>',
  }),
}

export default meta
type Story = StoryObj<typeof BaseButton>

export const Primary: Story = {}
export const Outline: Story = { args: { variant: 'outline' } }
export const Disabled: Story = { args: { disabled: true } }

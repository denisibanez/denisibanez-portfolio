import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseIconButton from './BaseIconButton.vue'

const closeIcon =
  '<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" /></svg>'

const meta: Meta<typeof BaseIconButton> = {
  title: 'Components/BaseIconButton',
  component: BaseIconButton,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  render: (args) => ({
    components: { BaseIconButton },
    setup: () => ({ args, closeIcon }),
    template: `<BaseIconButton v-bind="args"><span v-html="closeIcon" /></BaseIconButton>`,
  }),
  args: { label: 'Close', size: 'lg', variant: 'glass' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['glass', 'glass-soft'] },
  },
}

export default meta
type Story = StoryObj<typeof BaseIconButton>

export const Glass: Story = {}
export const GlassSoft: Story = { args: { variant: 'glass-soft' } }

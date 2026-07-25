import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseBadge from './BaseBadge.vue'

const meta: Meta<typeof BaseBadge> = {
  title: 'Components/BaseBadge',
  component: BaseBadge,
  args: { label: 'Case Study', floating: false },
  render: (args) => ({
    components: { BaseBadge },
    setup: () => ({ args }),
    template: '<BaseBadge v-bind="args" />',
  }),
}

export default meta
type Story = StoryObj<typeof BaseBadge>

export const CaseStudy: Story = {}
export const Draft: Story = { args: { label: 'Draft' } }
// Over imagery — the surface/backdrop keeps it legible on a busy card.
export const Floating: Story = {
  args: { label: 'Case Study', floating: true },
  render: (args) => ({
    components: { BaseBadge },
    setup: () => ({ args }),
    template:
      '<div class="relative h-40 w-64 bg-linear-to-br from-primary via-tertiary to-surface"><BaseBadge v-bind="args" class="absolute left-3 top-3" /></div>',
  }),
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FaqSection from './FaqSection.vue'
import { faq } from '@/data/faq'

const meta: Meta<typeof FaqSection> = {
  title: 'Components/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
  args: { items: faq, eyebrow: 'Common questions', title: 'Frequently asked questions' },
  render: (args) => ({
    components: { FaqSection },
    setup: () => ({ args }),
    template: '<FaqSection v-bind="args" />',
  }),
}

export default meta
type Story = StoryObj<typeof FaqSection>

export const Default: Story = {}

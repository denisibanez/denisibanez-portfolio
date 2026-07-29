import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BasePagination from './BasePagination.vue'

const meta: Meta<typeof BasePagination> = {
  title: 'Components/BasePagination',
  component: BasePagination,
  args: { modelValue: 2, pageCount: 5 },
  render: (args) => ({
    components: { BasePagination },
    setup: () => {
      const page = ref(args.modelValue)
      return { args, page }
    },
    template: '<BasePagination v-bind="args" v-model="page" />',
  }),
}

export default meta
type Story = StoryObj<typeof BasePagination>

export const Default: Story = {}
export const TwoPages: Story = { args: { modelValue: 1, pageCount: 2 } }
// Windowed with ellipses when there are many pages.
export const Many: Story = { args: { modelValue: 6, pageCount: 20 } }

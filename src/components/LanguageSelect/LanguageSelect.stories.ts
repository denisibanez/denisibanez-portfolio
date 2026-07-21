import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import LanguageSelect from './LanguageSelect.vue'

const meta: Meta<typeof LanguageSelect> = {
  title: 'Components/LanguageSelect',
  component: LanguageSelect,
  args: {
    modelValue: 'pt',
    options: [
      { label: 'PT', value: 'pt' },
      { label: 'EN', value: 'en' },
    ],
  },
  render: (args) => ({
    components: { LanguageSelect },
    setup: () => {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<LanguageSelect v-bind="args" v-model="value" />',
  }),
}

export default meta
type Story = StoryObj<typeof LanguageSelect>

export const Default: Story = {}

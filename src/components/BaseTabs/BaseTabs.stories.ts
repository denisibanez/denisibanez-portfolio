import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseTabs from './BaseTabs.vue'

const meta: Meta<typeof BaseTabs> = {
  title: 'Components/BaseTabs',
  component: BaseTabs,
}

export default meta
type Story = StoryObj<typeof BaseTabs>

export const Default: Story = {
  render: () => ({
    components: { BaseTabs },
    setup: () => {
      const active = ref('all')
      const tabs = [
        { label: 'All', value: 'all' },
        { label: 'Study', value: 'study' },
        { label: 'Client', value: 'client' },
      ]
      return { active, tabs }
    },
    template: `
      <div class="p-[5vw]">
        <BaseTabs v-model="active" :tabs="tabs" />
        <p class="mt-6 text-body-lg text-on-surface-variant">Active: {{ active }}</p>
      </div>
    `,
  }),
}

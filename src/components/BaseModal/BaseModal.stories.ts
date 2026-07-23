import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseModal from './BaseModal.vue'

const meta: Meta<typeof BaseModal> = {
  title: 'Components/BaseModal',
  component: BaseModal,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof BaseModal>

export const Default: Story = {
  render: () => ({
    components: { BaseModal },
    setup: () => {
      const open = ref(false)
      return { open }
    },
    template: `
      <div class="min-h-screen bg-surface p-[5vw]">
        <button class="border border-outline px-4 py-2 text-label-lg uppercase text-on-surface" @click="open = true">
          Open modal
        </button>
        <BaseModal :open="open" label="Example" @close="open = false">
          <div class="relative max-w-lg border border-white/15 bg-surface-container/80 p-8 backdrop-blur-2xl">
            <h2 class="text-headline-md text-on-surface">Modal title</h2>
            <p class="mt-4 text-body-lg text-on-surface-variant">Press Escape or click the backdrop to close.</p>
            <button class="mt-6 border border-outline px-4 py-2 text-label-lg uppercase text-on-surface" @click="open = false">Close</button>
          </div>
        </BaseModal>
      </div>
    `,
  }),
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ToastHost from './ToastHost.vue'
import { useToast } from '@/composables/useToast'

const meta: Meta<typeof ToastHost> = {
  title: 'Components/ToastHost',
  component: ToastHost,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ToastHost>

export const Playground: Story = {
  render: () => ({
    components: { ToastHost },
    setup: () => {
      const { notify, error, success } = useToast()
      return { notify, error, success }
    },
    template: `
      <div class="min-h-screen bg-surface p-[5vw]">
        <div class="flex flex-wrap gap-3">
          <button class="border border-outline px-4 py-2 text-label-lg uppercase text-on-surface" @click="notify('Just so you know…')">Info</button>
          <button class="border border-outline px-4 py-2 text-label-lg uppercase text-on-surface" @click="success('Saved successfully')">Success</button>
          <button class="border border-outline px-4 py-2 text-label-lg uppercase text-on-surface" @click="error('Something went wrong')">Error</button>
        </div>
        <ToastHost dismiss-label="Dismiss" />
      </div>
    `,
  }),
}

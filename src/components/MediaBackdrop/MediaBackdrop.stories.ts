import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MediaBackdrop from './MediaBackdrop.vue'

const meta: Meta<typeof MediaBackdrop> = {
  title: 'Components/MediaBackdrop',
  component: MediaBackdrop,
  parameters: { layout: 'fullscreen' },
  args: { src: 'https://picsum.photos/1600/900' },
}

export default meta
type Story = StoryObj<typeof MediaBackdrop>

export const Default: Story = {
  render: (args) => ({
    components: { MediaBackdrop },
    setup: () => ({ args }),
    template: `
      <MediaBackdrop v-bind="args">
        <template #scrim>
          <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/80 to-transparent" />
        </template>
        <div class="relative z-10 flex min-h-screen items-center px-[5vw]">
          <h1 class="text-headline-md md:text-headline-lg">Backdrop content</h1>
        </div>
      </MediaBackdrop>
    `,
  }),
}

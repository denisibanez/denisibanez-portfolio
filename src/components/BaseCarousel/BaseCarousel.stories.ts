import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseCarousel from './BaseCarousel.vue'

type Slide = { id: number; label: string }

const slides: Slide[] = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, label: `Slide ${i + 1}` }))

const meta: Meta = {
  title: 'Components/BaseCarousel',
  // BaseCarousel is a generic SFC; cast the component field so Meta accepts it.
  component: BaseCarousel as unknown as Meta['component'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { BaseCarousel },
    setup: () => ({
      slides,
      labels: { prev: 'Previous', next: 'Next', goTo: 'Go to slide' },
      posterClass: 'aspect-[2/3] w-[20vw] min-w-[280px] bg-surface-container-low shadow-2xl',
      itemKey: (s: Slide) => s.id,
    }),
    template: `
      <div class="p-[5vw]">
        <BaseCarousel
          :items="slides"
          title="Selected Works"
          subtitle="A reusable, Netflix-style horizontal carousel."
          :labels="labels"
          :card-class="posterClass"
          :item-key="itemKey"
        >
          <template #card="{ item }">
            <div class="flex h-full w-full items-center justify-center text-label-lg uppercase tracking-widest text-on-surface-variant/60">
              {{ item.label }}
            </div>
          </template>
        </BaseCarousel>
      </div>
    `,
  }),
}

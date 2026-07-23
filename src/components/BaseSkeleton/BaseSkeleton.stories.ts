import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseSkeleton from './BaseSkeleton.vue'

const meta: Meta<typeof BaseSkeleton> = {
  title: 'Components/BaseSkeleton',
  component: BaseSkeleton,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof BaseSkeleton>

export const Block: Story = {
  render: () => ({
    components: { BaseSkeleton },
    template: `<BaseSkeleton class="h-6 w-64" />`,
  }),
}

// Skeletons mirror the real UI — here, a project poster card + meta lines.
export const ProjectCard: Story = {
  render: () => ({
    components: { BaseSkeleton },
    template: `
      <div class="flex gap-6" aria-busy="true">
        <div v-for="n in 3" :key="n" class="w-[220px]">
          <BaseSkeleton class="aspect-[2/3] w-full" />
          <BaseSkeleton class="mt-4 h-3 w-1/2" />
          <BaseSkeleton class="mt-2 h-4 w-3/4" />
        </div>
      </div>
    `,
  }),
}

export const TextLines: Story = {
  render: () => ({
    components: { BaseSkeleton },
    template: `
      <div class="max-w-md space-y-3" aria-busy="true">
        <BaseSkeleton class="h-4 w-full" />
        <BaseSkeleton class="h-4 w-11/12" />
        <BaseSkeleton class="h-4 w-2/3" />
      </div>
    `,
  }),
}

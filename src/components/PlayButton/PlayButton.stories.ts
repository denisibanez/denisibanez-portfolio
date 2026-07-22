import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PlayButton from './PlayButton.vue'

const meta: Meta<typeof PlayButton> = {
  title: 'Components/PlayButton',
  component: PlayButton,
  args: { label: 'Play showreel' },
  decorators: [() => ({ template: '<div class="flex items-center justify-center p-16"><story /></div>' })],
}

export default meta
type Story = StoryObj<typeof PlayButton>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollProgressBar from './ScrollProgressBar.vue'

const meta: Meta<typeof ScrollProgressBar> = {
  title: 'Components/ScrollProgressBar',
  component: ScrollProgressBar,
  parameters: { layout: 'centered' },
  decorators: [() => ({ template: '<div style="height:200px"><story /></div>' })],
  args: { progress: 40, variant: 'primary' },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'tertiary'] } },
}

export default meta
type Story = StoryObj<typeof ScrollProgressBar>

export const Primary: Story = {}
export const Tertiary: Story = { args: { progress: 65, variant: 'tertiary' } }

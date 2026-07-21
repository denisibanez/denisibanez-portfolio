import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppNav from './AppNav.vue'

const meta: Meta<typeof AppNav> = {
  title: 'Components/AppNav',
  component: AppNav,
  args: {
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About Me', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof AppNav>

export const Default: Story = {}

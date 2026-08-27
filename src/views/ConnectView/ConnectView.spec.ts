import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ConnectView from './ConnectView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      connect: {
        eyebrow: 'For AI Agents',
        title: 'Connect',
        lead: 'Lead copy.',
        endpointLabel: 'Endpoint',
        endpointNote: 'Streamable HTTP',
        setupLabel: 'Setup',
        setupHint: 'Paste into:',
        toolsLabel: 'Available tools',
        footerNote: 'Prefer plain text?',
      },
    },
  },
})

const factory = () => mount(ConnectView, { global: { plugins: [i18n] } })

describe('ConnectView', () => {
  it('renders the title heading', () => {
    const wrapper = factory()
    expect(wrapper.get('h1').text()).toBe('Connect')
  })

  it('shows the MCP endpoint URL', () => {
    const wrapper = factory()
    expect(wrapper.get('code').text()).toBe('https://denisibanez.dev/api/mcp')
  })

  it('lists every tool by name', () => {
    const wrapper = factory()
    ;['get_profile', 'get_projects', 'get_project', 'get_blog_posts', 'get_blog_post', 'get_testimonials', 'get_faq', 'contact_denis'].forEach(
      (name) => expect(wrapper.text()).toContain(name),
    )
  })

  it('lists setup instructions for each client', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Claude')
    expect(wrapper.text()).toContain('ChatGPT')
    expect(wrapper.text()).toContain('Cursor')
  })

  it('links to llms.txt', () => {
    const wrapper = factory()
    expect(wrapper.get('a').attributes('href')).toBe('https://denisibanez.dev/llms.txt')
  })
})

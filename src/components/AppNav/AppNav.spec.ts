import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import AppNav from './AppNav.vue'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Projects', href: '#projects' },
]

describe('AppNav', () => {
  it('renders every link (desktop list present in the DOM)', () => {
    const wrapper = mount(AppNav, { props: { links } })
    const anchors = wrapper.findAll('ul.md\\:flex a')
    expect(anchors).toHaveLength(links.length)
    expect(anchors[1]!.text()).toBe('About Me')
  })

  it('keeps the mobile drawer closed by default', () => {
    const wrapper = mount(AppNav, { props: { links } })
    expect(wrapper.find('button[aria-label="Menu"]').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('opens the mobile drawer on hamburger click', async () => {
    const wrapper = mount(AppNav, { props: { links } })
    await wrapper.find('button[aria-label="Menu"]').trigger('click')
    expect(wrapper.find('button[aria-label="Menu"]').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
  })

  it('closes the drawer when navigation changes the active route', async () => {
    const wrapper = mount(AppNav, { props: { links, active: '/' } })
    await wrapper.find('button[aria-label="Menu"]').trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(true)
    // The link tap itself must NOT close the drawer (that races the router);
    // the drawer closes once the route lands.
    await wrapper.setProps({ active: '/about' })
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('closes the drawer when the backdrop is tapped', async () => {
    const wrapper = mount(AppNav, { props: { links } })
    await wrapper.find('button[aria-label="Menu"]').trigger('click')
    await wrapper.find('.fixed.inset-0 > div[aria-hidden="true"]').trigger('click')
    expect(wrapper.find('.fixed.inset-0').exists()).toBe(false)
  })

  it('renders internal paths as router links', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/about', component: { template: '<div />' } },
      ],
    })
    const wrapper = mount(AppNav, {
      props: { links: [{ label: 'About Me', href: '/about' }] },
      global: { plugins: [router] },
    })
    await router.isReady()
    expect(wrapper.find('ul.md\\:flex a').attributes('href')).toBe('/about')
  })
})

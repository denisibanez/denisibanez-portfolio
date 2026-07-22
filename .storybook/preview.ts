import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { createMemoryHistory, createRouter } from 'vue-router'
import i18n from '../src/i18n'
import '../src/assets/main.css'

const storyRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div />' } },
    { path: '/about', name: 'about', component: { template: '<div />' } },
    { path: '/testimonials', name: 'testimonials', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.use(i18n)
  app.use(storyRouter)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview

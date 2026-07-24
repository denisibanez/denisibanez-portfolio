import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { createMemoryHistory, createRouter } from 'vue-router'
import i18n from '../src/i18n'
import { routes } from '../src/router'
import '../src/assets/main.css'

// Reuse the app's real routes so every named target a story links to
// (projects, project-detail, project-specs, …) resolves in <RouterLink>.
const storyRouter = createRouter({
  history: createMemoryHistory(),
  routes,
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

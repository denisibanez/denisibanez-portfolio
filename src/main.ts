import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { inject as injectAnalytics } from '@vercel/analytics'

import App from './App.vue'
import { routes } from './router'
import i18n from './i18n'

// ViteSSG owns the app/router/head (head is installed by vite-ssg itself, so we
// don't add unhead here). Plugins that carry state go in the setup callback.
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, ({ app, isClient }) => {
  app.use(createPinia())
  app.use(i18n)

  // Browser only — `inject()` touches `document`/`window`, which don't exist
  // during the Node-side SSG prerender pass.
  if (isClient) injectAnalytics()
})

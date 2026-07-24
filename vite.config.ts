import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// Static routes + published-project paths to prerender. Project detail/specs
// pages aren't reachable via crawlable <a> links (carousel cards are buttons),
// so list them explicitly. Keep in sync with published projects (see sitemap.xml).
const PROJECT_SLUGS = ['aether-watch', 'brutalist-villa', 'metallic-forms', 'drive-dashboard', 'nexus-system']
const prerenderRoutes = [
  '/',
  '/about',
  '/projects',
  '/testimonials',
  ...PROJECT_SLUGS.flatMap((slug) => [`/projects/${slug}`, `/projects/${slug}/specs`]),
]

// vite-ssg reads `ssgOptions` off the Vite config (augments UserConfig at runtime).
const config: UserConfig & { ssgOptions?: Record<string, unknown> } = {
  plugins: [
    vue(),
    // DevTools crashes Storybook/Vitest browser runs:
    // `@vue/devtools-kit` reads `.app` on an undefined active app.
    ...(process.env.VITEST ? [] : [vueDevTools()]),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: 'minify',
    includedRoutes: () => prerenderRoutes,
  },
}

// https://vite.dev/config/
export default defineConfig(config)

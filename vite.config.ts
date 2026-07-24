import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import { projects } from './src/data/projects'
import { site } from './src/config/site'

// Single source of truth: prerendered routes AND the sitemap are derived from
// the published projects, so they can never drift. Project detail/specs pages
// aren't reachable via crawlable <a> links (carousel cards are buttons), so
// they must be listed explicitly here — vite-ssg won't discover them.
const publishedSlugs = projects.filter((p) => p.status !== 'draft').map((p) => p.slug)
const prerenderRoutes = [
  '/',
  '/about',
  '/projects',
  '/testimonials',
  ...publishedSlugs.flatMap((slug) => [`/projects/${slug}`, `/projects/${slug}/specs`]),
]

const sitemapPriority = (path: string) => {
  if (path === '/') return '1.0'
  if (path.endsWith('/specs')) return '0.5'
  if (path.startsWith('/projects/')) return '0.6'
  if (path === '/projects') return '0.9'
  return '0.8'
}

const writeSitemap = () => {
  const urls = prerenderRoutes
    .map(
      (path) =>
        `  <url>\n    <loc>${site.url}${path === '/' ? '/' : path}</loc>\n    <priority>${sitemapPriority(path)}</priority>\n  </url>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url)), xml)
}

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
    // Runs once after all pages are rendered (dist exists) — emit the sitemap.
    onFinished: writeSitemap,
  },
}

// https://vite.dev/config/
export default defineConfig(config)

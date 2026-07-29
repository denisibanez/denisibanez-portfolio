import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import { projects } from './src/data/projects'
import { posts } from './src/data/blog'
import { site } from './src/config/site'

// Single source of truth: prerendered routes AND the sitemap are derived from
// the published projects and blog posts, so they can never drift. Detail pages
// aren't reachable via crawlable <a> links from the index in all cases, so they
// must be listed explicitly here — vite-ssg won't discover them.
const publishedSlugs = projects.filter((p) => p.status !== 'draft').map((p) => p.slug)
const prerenderRoutes = [
  '/',
  '/about',
  '/projects',
  '/testimonials',
  '/blog',
  ...publishedSlugs.flatMap((slug) => [`/projects/${slug}`, `/projects/${slug}/specs`]),
  ...posts.filter((p) => p.status !== 'draft').map((p) => `/blog/${p.slug}`),
]

const sitemapPriority = (path: string) => {
  if (path === '/') return '1.0'
  if (path.endsWith('/specs')) return '0.5'
  if (path.startsWith('/projects/')) return '0.6'
  if (path === '/projects') return '0.9'
  if (path === '/blog') return '0.8'
  if (path.startsWith('/blog/')) return '0.6'
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
    // Prerender the content routes, plus `/404` → `dist/404.html` which Vercel
    // serves (with a real 404 status) for any unmatched path. `/404` is kept out
    // of the sitemap (writeSitemap only walks prerenderRoutes).
    includedRoutes: () => [...prerenderRoutes, '/404'],
    // Runs once after all pages are rendered (dist exists) — emit the sitemap.
    onFinished: writeSitemap,
  },
}

// https://vite.dev/config/
export default defineConfig(config)

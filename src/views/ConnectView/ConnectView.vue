<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import { useRise } from '@/composables/useRise/useRise'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { site } from '@/config/site'
import connectBg from '@/assets/images/banner-blog.webp'

const { t } = useI18n()
const { rise } = useRise()

const endpoint = `${site.url}/api/mcp`
const llmsTxtUrl = `${site.url}/llms.txt`

// Literal UI paths in the client's own product — not translated, same
// treatment as cert titles/roles elsewhere in the site.
const clients = [
  { name: 'Claude', steps: 'Settings → Connectors → Add custom connector → paste the URL above.' },
  { name: 'ChatGPT', steps: 'Settings → Apps & Connectors → Advanced → Developer mode → Create → paste the URL above.' },
  { name: 'Cursor / other MCP clients', steps: 'Add as a Streamable HTTP MCP server, using the URL above.' },
]

const tools = [
  { name: 'get_profile', description: "Denis Ibañez's name, role, summary, résumé link and social profiles." },
  { name: 'get_projects', description: 'List published portfolio projects, newest first.' },
  { name: 'get_project', description: 'Full detail for one published project, by slug.' },
  { name: 'get_blog_posts', description: 'List published blog posts, newest first.' },
  { name: 'get_blog_post', description: 'Full content of one published blog post, by slug.' },
  { name: 'get_testimonials', description: "Testimonials from Denis's clients and colleagues." },
  { name: 'get_faq', description: 'Frequently asked questions about Denis and how he works.' },
  { name: 'contact_denis', description: 'Send a project brief or message directly to Denis — delivered immediately.' },
]
</script>

<template>
  <MediaBackdrop :src="connectBg" alt="Connect an AI agent to Denis Ibañez's portfolio via MCP">
    <template #scrim>
      <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/85 via-surface/50 to-surface/20" />
    </template>

    <div class="relative z-10 flex min-h-dvh flex-col justify-center px-[5vw] pt-28 pb-16 lg:pt-24">
      <!-- Intro -->
      <Motion
        as="p"
        v-bind="rise(0)"
        class="mb-4 flex items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface-variant"
      >
        <span class="h-px w-10 bg-on-surface-variant" />
        {{ t('connect.eyebrow') }}
      </Motion>
      <Motion as="h1" v-bind="rise(0.1)" class="text-headline-md leading-none md:text-headline-lg">
        {{ t('connect.title') }}
      </Motion>
      <Motion as="p" v-bind="rise(0.2)" class="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
        {{ t('connect.lead') }}
      </Motion>

      <!-- Two columns: how to connect (left) · what's available (right) -->
      <div class="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <div class="flex flex-col gap-6">
          <Motion as="section" v-bind="rise(0.3)" class="border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 class="text-label-lg uppercase tracking-widest text-on-surface-variant">
              {{ t('connect.endpointLabel') }}
            </h2>
            <code class="mt-3 block break-all bg-surface/40 px-4 py-3 text-body-lg text-on-surface">
              {{ endpoint }}
            </code>
            <p class="mt-3 text-label-lg uppercase tracking-widest text-on-surface-variant/70">
              {{ t('connect.endpointNote') }}
            </p>
          </Motion>

          <Motion as="section" v-bind="rise(0.35)" class="border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ t('connect.setupLabel') }}</h2>
            <p class="mt-2 text-body-lg text-on-surface-variant">{{ t('connect.setupHint') }}</p>
            <ul class="mt-3 divide-y divide-white/10 border-t border-white/10">
              <li v-for="client in clients" :key="client.name" class="py-3">
                <p class="text-body-lg font-medium text-on-surface">{{ client.name }}</p>
                <p class="mt-1 line-clamp-2 text-body-lg text-on-surface-variant">{{ client.steps }}</p>
              </li>
            </ul>
          </Motion>
        </div>

        <Motion as="section" v-bind="rise(0.4)" class="border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ t('connect.toolsLabel') }}</h2>
          <dl class="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-white/10 pt-3 sm:grid-cols-2">
            <div v-for="tool in tools" :key="tool.name">
              <dt class="text-body-lg font-medium text-on-surface">{{ tool.name }}</dt>
              <dd class="mt-1 line-clamp-2 text-body-lg text-on-surface-variant">{{ tool.description }}</dd>
            </div>
          </dl>
        </Motion>
      </div>

      <Motion as="p" v-bind="rise(0.45)" class="mt-6 text-body-lg text-on-surface-variant">
        {{ t('connect.footerNote') }}
        <a :href="llmsTxtUrl" target="_blank" rel="noopener" class="text-on-surface underline underline-offset-4 hover:text-primary">
          llms.txt
        </a>
      </Motion>
    </div>
  </MediaBackdrop>
</template>

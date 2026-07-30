<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BlogGallery from '@/components/BlogGallery/BlogGallery.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { useBlog } from '@/composables/useBlog/useBlog'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import type { BlogText } from '@/types/blog'
import type { Locale } from '@/i18n'
import blogBg from '@/assets/images/banner-blog.png'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t, locale } = useI18n()
const route = useRoute()
const { getBySlug } = useBlog()
const { localized } = useLocalize()
const { rise } = useRise()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const post = computed(() => getBySlug(slug.value))
const paragraphs = computed(() => (post.value?.body ? localized(post.value.body) : []))

// Rich blocks (long-form imported posts). Text resolves to a plain string here
// (English fallback) so the template stays free of union narrowing.
const pickText = (text: BlogText) => text[locale.value as Locale] ?? text.en ?? text.pt ?? ''
const blocks = computed(() =>
  (post.value?.blocks ?? []).map((block) => {
    if (block.type === 'code') return { type: 'code', code: block.code, text: '', src: '' }
    if (block.type === 'img') return { type: 'img', src: block.src, text: block.alt ? pickText(block.alt) : '', code: '' }
    return { type: block.type, text: pickText(block.text), code: '', src: '' }
  }),
)

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })

// Custom scroll indicator for the article panel (same pattern as ProjectSpecs):
// native scrollbar hidden, a thin track + fill tracks progress.
const scrollArea = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const onScroll = () => {
  const el = scrollArea.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  scrollProgress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
}
</script>

<template>
  <MediaBackdrop :src="blogBg">
    <div v-if="post" class="relative z-10 flex min-h-dvh items-center justify-center px-[5vw] pt-28 pb-24">
      <Motion
        as="article"
        v-bind="rise(0)"
        class="flex w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-surface/40 shadow-2xl backdrop-blur-2xl md:flex-row lg:h-[calc(100dvh-13rem)]"
      >
        <!-- Meta panel -->
        <div class="flex flex-col justify-between border-b border-white/10 p-10 md:w-1/3 md:border-b-0 md:border-r md:p-12">
          <div>
            <RouterLink
              :to="{ name: 'blog' }"
              class="inline-flex items-center gap-2 text-label-lg uppercase tracking-widest text-tertiary transition-all hover:gap-4"
            >
              <span aria-hidden="true">&larr;</span>
              {{ t('blog.back') }}
            </RouterLink>

            <div class="mt-14">
              <span class="block text-label-lg uppercase tracking-widest text-tertiary">{{ localized(post.category) }}</span>
              <h1 class="mt-4 text-headline-md leading-tight">{{ localized(post.title) }}</h1>

              <div class="mt-6 flex flex-col gap-2 text-sm text-on-surface-variant">
                <span class="inline-flex items-center gap-2">
                  <svg class="size-4 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                    <rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 2.5v4M16 2.5v4" stroke-linecap="round" />
                  </svg>
                  {{ formatDate(post.date) }}
                </span>
                <span class="inline-flex items-center gap-2">
                  <svg class="size-4 text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  {{ t('blog.readTime', { min: post.readingMinutes }) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Pull-quote pinned to the bottom (desktop) -->
          <figure v-if="post.quote" class="mt-10 hidden md:block">
            <div class="mb-5 h-px w-12 bg-tertiary" aria-hidden="true" />
            <blockquote class="text-body-lg italic text-on-surface-variant/70">“{{ localized(post.quote) }}”</blockquote>
          </figure>
        </div>

        <!-- Article panel — native scrollbar hidden, custom progress bar alongside -->
        <div class="flex min-h-0 bg-surface-container-lowest/20 md:w-2/3">
          <div ref="scrollArea" class="no-scrollbar flex-1 overflow-y-auto p-8 md:p-14" @scroll="onScroll">
            <div v-if="post.youtube" class="mb-10 aspect-video w-full overflow-hidden border border-white/10 bg-black">
              <iframe
                :src="`https://www.youtube-nocookie.com/embed/${post.youtube}`"
                :title="localized(post.title)"
                class="size-full"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
            <video
              v-else-if="post.video"
              :src="post.video"
              :poster="post.image"
              controls
              playsinline
              preload="metadata"
              class="mb-10 max-h-[70vh] w-full border border-white/10 bg-black object-contain"
            />
            <BlogGallery
              v-else-if="post.images?.length"
              :images="post.images"
              :alt="localized(post.title)"
              :labels="{ prev: t('blog.prev'), next: t('blog.next'), enlarge: t('blog.enlarge'), close: t('blog.close') }"
              class="mb-10"
            />
            <img
              v-else-if="post.image"
              :src="post.image"
              :alt="localized(post.title)"
              class="mb-10 max-h-[420px] w-full border border-white/10 object-contain"
            />
            <!-- Rich blocks (long-form imported posts) -->
            <template v-for="(block, i) in blocks" :key="`block-${i}`">
              <h2 v-if="block.type === 'h2'" class="mb-3 mt-10 text-body-lg font-semibold text-on-surface">{{ block.text }}</h2>
              <h3 v-else-if="block.type === 'h3'" class="mb-2 mt-8 text-body-lg font-semibold text-on-surface">{{ block.text }}</h3>
              <pre
                v-else-if="block.type === 'code'"
                class="mb-6 overflow-x-auto rounded-sm border border-white/10 bg-black/40 p-4"
              ><code class="whitespace-pre font-mono text-sm leading-relaxed text-on-surface-variant">{{ block.code }}</code></pre>
              <img
                v-else-if="block.type === 'img'"
                :src="block.src"
                :alt="block.text"
                loading="lazy"
                class="mb-8 w-full rounded-sm border border-white/10 object-contain"
              />
              <p v-else class="mb-6 text-body-lg leading-relaxed text-on-surface-variant">{{ block.text }}</p>
            </template>

            <!-- Simple paragraph body -->
            <template v-if="!blocks.length">
              <p
                v-for="(paragraph, i) in paragraphs"
                :key="i"
                class="mb-6 text-body-lg leading-relaxed text-on-surface-variant"
                :class="i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-semibold first-letter:leading-none first-letter:text-tertiary' : ''"
              >
                {{ paragraph }}
              </p>
            </template>

            <div class="mt-10 flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="border border-outline-variant/40 px-3 py-1.5 text-xs uppercase tracking-wider text-on-surface-variant"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-12 md:hidden">
              <BaseButton variant="outline" class="w-full text-center" :to="{ name: 'blog' }">{{ t('blog.back') }}</BaseButton>
            </div>
          </div>

          <!-- Scroll progress (desktop, where the panel scrolls internally) -->
          <div class="my-8 hidden w-0.5 shrink-0 bg-on-surface/20 lg:block" aria-hidden="true">
            <div class="w-full bg-tertiary transition-[height] duration-150" :style="{ height: `${scrollProgress}%` }" />
          </div>
        </div>
      </Motion>
    </div>
  </MediaBackdrop>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

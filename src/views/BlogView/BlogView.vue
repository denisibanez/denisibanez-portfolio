<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import BasePagination from '@/components/BasePagination/BasePagination.vue'
import BaseBadge from '@/components/BaseBadge/BaseBadge.vue'
import { useBlog } from '@/composables/useBlog/useBlog'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import type { BlogPost } from '@/types/blog'
import blogBg from '@/assets/images/banner-blog.webp'

const { t, locale } = useI18n()
const { posts } = useBlog()
const { localized } = useLocalize()
const { rise } = useRise()

// One row of cards per page (3 columns from lg → 3 per page) so the list fits the fold.
const PER_PAGE = 3
const page = ref(1)
const pageCount = computed(() => Math.max(1, Math.ceil(posts.length / PER_PAGE)))
const pagePosts = computed(() => posts.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))

const gridTop = useTemplateRef<HTMLElement>('gridTop')
const onPage = (next: number) => {
  page.value = next
  gridTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })

const linkTo = (post: BlogPost) => ({ name: 'blog-post', params: { slug: post.slug } })
</script>

<template>
  <MediaBackdrop :src="blogBg">
    <div class="relative z-10 flex min-h-dvh flex-col justify-center px-[5vw] pt-32 pb-20">
      <!-- Header -->
      <header class="max-w-3xl">
        <Motion as="p" v-bind="rise(0)" class="flex items-center gap-4 text-label-lg uppercase tracking-widest text-tertiary">
          <span class="h-px w-10 bg-tertiary" aria-hidden="true" />
          {{ t('blog.eyebrow') }}
        </Motion>
        <Motion as="h1" v-bind="rise(0.1)" class="mt-6 text-headline-md md:text-headline-lg">
          {{ t('blog.title') }}
        </Motion>
        <Motion as="p" v-bind="rise(0.2)" class="mt-4 max-w-xl text-body-lg text-on-surface-variant">
          {{ t('blog.subtitle') }}
        </Motion>
      </header>

      <div ref="gridTop" class="scroll-mt-32" />

      <!-- Grid: uniform cards, one row per page (fits the fold) -->
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="(post, i) in pagePosts"
          :key="post.slug"
          as="article"
          v-bind="rise(0.15 + i * 0.06)"
          class="group relative border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-tertiary/40"
        >
          <BaseBadge v-if="post.status === 'draft'" floating class="absolute right-3 top-3 z-10">
            {{ t('projects.draft') }}
          </BaseBadge>
          <RouterLink :to="linkTo(post)" class="flex h-full flex-col">
            <div v-if="post.image" class="relative aspect-video overflow-hidden border-b border-white/10 lg:aspect-[16/8]">
              <img
                :src="post.image"
                :alt="localized(post.title)"
                loading="lazy"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                v-if="post.video"
                class="absolute inset-0 grid place-items-center text-on-surface/90"
                aria-hidden="true"
              >
                <span class="grid size-12 place-items-center rounded-full bg-surface/60 backdrop-blur-sm">
                  <svg class="size-5 translate-x-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </div>
            <div class="flex flex-1 flex-col p-6">
            <div class="flex items-center justify-between text-label-lg uppercase tracking-widest">
              <span class="text-on-surface-variant/70">{{ localized(post.category) }}</span>
              <span class="text-on-surface-variant/50">{{ t('blog.readTime', { min: post.readingMinutes }) }}</span>
            </div>
            <h2 class="mt-4 line-clamp-2 text-body-lg font-semibold leading-snug text-on-surface transition-colors group-hover:text-tertiary">
              {{ localized(post.title) }}
            </h2>
            <p class="mt-3 line-clamp-3 flex-1 text-body-lg text-on-surface-variant">{{ localized(post.excerpt) }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-outline-variant/20 pt-4">
              <span class="text-sm text-on-surface-variant">{{ formatDate(post.date) }}</span>
              <span class="text-tertiary transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </div>
            </div>
          </RouterLink>
        </Motion>
      </div>

      <!-- Pagination -->
      <div class="mt-14">
        <BasePagination
          :model-value="page"
          :page-count="pageCount"
          :labels="{ prev: t('blog.prev'), next: t('blog.next'), nav: t('blog.pagination'), page: t('blog.page') }"
          @update:model-value="onPage"
        />
      </div>
    </div>
  </MediaBackdrop>
</template>

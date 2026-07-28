<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import { useBlog } from '@/composables/useBlog/useBlog'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import type { BlogPost } from '@/types/blog'

const { t, locale } = useI18n()
const { featured, rest } = useBlog()
const { localized } = useLocalize()
const { rise } = useRise()

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })

const linkTo = (post: BlogPost) => ({ name: 'blog-post', params: { slug: post.slug } })
</script>

<template>
  <section class="relative min-h-dvh overflow-hidden bg-surface">
    <!-- Ambient glow — keeps the dark canvas from feeling flat (decorative) -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-tertiary/10 blur-[140px]"
      aria-hidden="true"
    />

    <div class="relative z-10 flex min-h-dvh flex-col px-[5vw] pt-32 pb-32">
      <!-- Header -->
      <header class="max-w-3xl">
        <Motion as="p" v-bind="rise(0)" class="flex items-center gap-4 text-label-lg uppercase tracking-widest text-tertiary">
          <span class="h-px w-10 bg-tertiary" aria-hidden="true" />
          {{ t('blog.eyebrow') }}
        </Motion>
        <Motion as="h1" v-bind="rise(0.1)" class="mt-6 font-serif text-headline-md md:text-headline-lg">
          {{ t('blog.title') }}
        </Motion>
        <Motion as="p" v-bind="rise(0.2)" class="mt-5 max-w-xl text-body-lg text-on-surface-variant">
          {{ t('blog.subtitle') }}
        </Motion>
      </header>

      <!-- Featured post -->
      <Motion
        v-if="featured"
        as="article"
        v-bind="rise(0.3)"
        class="group mt-14 border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-tertiary/40"
      >
        <RouterLink :to="linkTo(featured)" class="flex flex-col gap-8 p-8 md:flex-row md:items-center md:p-12">
          <div class="md:w-1/3">
            <span class="text-label-lg uppercase tracking-widest text-tertiary">{{ t('blog.featured') }}</span>
            <p class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-on-surface-variant">
              <span>{{ formatDate(featured.date) }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ t('blog.readTime', { min: featured.readingMinutes }) }}</span>
            </p>
          </div>
          <div class="md:w-2/3">
            <span class="text-label-lg uppercase tracking-widest text-on-surface-variant/70">{{ localized(featured.category) }}</span>
            <h2 class="mt-3 font-serif text-headline-md leading-tight transition-colors group-hover:text-tertiary">
              {{ localized(featured.title) }}
            </h2>
            <p class="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{{ localized(featured.excerpt) }}</p>
            <span class="mt-6 inline-flex items-center gap-2 text-label-lg uppercase tracking-widest text-tertiary transition-all group-hover:gap-4">
              {{ t('blog.readMore') }}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </RouterLink>
      </Motion>

      <!-- Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="(post, i) in rest"
          :key="post.slug"
          as="article"
          v-bind="rise(0.4 + i * 0.08)"
          class="group border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-tertiary/40"
        >
          <RouterLink :to="linkTo(post)" class="flex h-full flex-col p-8">
            <div class="flex items-center justify-between text-label-lg uppercase tracking-widest">
              <span class="text-on-surface-variant/70">{{ localized(post.category) }}</span>
              <span class="text-on-surface-variant/50">{{ t('blog.readTime', { min: post.readingMinutes }) }}</span>
            </div>
            <h3 class="mt-5 font-serif text-[26px] leading-snug transition-colors group-hover:text-tertiary">
              {{ localized(post.title) }}
            </h3>
            <p class="mt-4 flex-1 text-body-lg text-on-surface-variant">{{ localized(post.excerpt) }}</p>
            <div class="mt-6 flex items-center justify-between border-t border-outline-variant/20 pt-4">
              <span class="text-body-sm text-on-surface-variant">{{ formatDate(post.date) }}</span>
              <span class="text-tertiary transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </div>
          </RouterLink>
        </Motion>
      </div>
    </div>
  </section>
</template>

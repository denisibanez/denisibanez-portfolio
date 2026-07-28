<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { useBlog } from '@/composables/useBlog/useBlog'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'

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
const paragraphs = computed(() => (post.value ? localized(post.value.body) : []))

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<template>
  <section class="relative min-h-dvh overflow-hidden bg-surface">
    <div
      class="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-tertiary/10 blur-[140px]"
      aria-hidden="true"
    />

    <div v-if="post" class="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-12 px-[5vw] pt-32 pb-32 lg:flex-row lg:gap-16">
      <!-- Meta -->
      <Motion as="aside" v-bind="rise(0)" class="lg:sticky lg:top-32 lg:h-fit lg:w-1/3 lg:shrink-0">
        <RouterLink
          :to="{ name: 'blog' }"
          class="inline-flex items-center gap-2 text-label-lg uppercase tracking-widest text-tertiary transition-all hover:gap-4"
        >
          <span aria-hidden="true">&larr;</span>
          {{ t('blog.back') }}
        </RouterLink>

        <span class="mt-14 block text-label-lg uppercase tracking-widest text-tertiary">{{ localized(post.category) }}</span>
        <h1 class="mt-4 font-serif text-headline-md leading-tight">{{ localized(post.title) }}</h1>

        <div class="mt-6 flex flex-col gap-2 text-body-sm text-on-surface-variant">
          <span>{{ formatDate(post.date) }}</span>
          <span>{{ t('blog.readTime', { min: post.readingMinutes }) }}</span>
        </div>

        <div class="mt-8 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="border border-outline-variant/30 px-3 py-1 text-label-lg uppercase tracking-widest text-on-surface-variant"
          >
            {{ tag }}
          </span>
        </div>
      </Motion>

      <!-- Article -->
      <Motion as="article" v-bind="rise(0.15)" class="lg:w-2/3">
        <p
          v-for="(paragraph, i) in paragraphs"
          :key="i"
          class="mb-6 text-body-lg leading-relaxed text-on-surface-variant"
          :class="i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-tertiary' : ''"
        >
          {{ paragraph }}
        </p>

        <div class="mt-12 lg:hidden">
          <BaseButton variant="outline" :to="{ name: 'blog' }">{{ t('blog.back') }}</BaseButton>
        </div>
      </Motion>
    </div>
  </section>
</template>

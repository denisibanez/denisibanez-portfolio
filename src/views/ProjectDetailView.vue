<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { useProjects, type Project } from '@/composables/useProjects'
import detailBg from '@/assets/images/banner-portfolio.png'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { getBySlug, getAdjacent } = useProjects()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const project = computed<Project | null>(() => getBySlug(slug.value))
const adjacent = computed(() => getAdjacent(slug.value))

const goToProjects = () => router.push({ name: 'projects' })
const goToProject = (target: Project | null) => {
  if (!target) return
  router.push({ name: 'project-detail', params: { slug: target.slug } })
}
const openLive = () => {
  const url = project.value?.url
  if (!url) return
  window.open(url, '_blank', 'noopener')
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <img
      :src="detailBg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
    <div class="pointer-events-none absolute inset-0 bg-surface/70" />

    <div class="relative z-10 flex min-h-screen flex-col justify-center px-[5vw] pt-28 pb-20 lg:pt-24">
      <!-- Project -->
      <div v-if="project" class="grid grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <!-- Media -->
        <Motion as="div" v-bind="rise(0.1)" class="relative h-[38vh] overflow-hidden bg-surface-container-low md:h-[62vh]">
          <img v-if="project.image" :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
            aria-hidden="true"
          >
            <span class="text-label-lg uppercase tracking-widest text-on-surface-variant/50">{{ project.category }}</span>
          </div>
          <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />
        </Motion>

        <!-- Content -->
        <div class="flex flex-col justify-center gap-6 md:gap-8">
          <div class="space-y-3">
            <Motion as="span" v-bind="rise(0)" class="block text-label-lg uppercase tracking-widest text-on-surface-variant">
              {{ t('projectDetail.caseStudy') }} — {{ project.year }}
            </Motion>
            <Motion as="h1" v-bind="rise(0.1)" class="text-headline-md md:text-headline-lg">
              {{ project.title }}
            </Motion>
          </div>

          <Motion as="p" v-bind="rise(0.2)" class="max-w-lg text-body-lg text-on-surface-variant">
            {{ project.summary }}
          </Motion>

          <Motion as="div" v-bind="rise(0.3)" class="flex flex-wrap gap-4">
            <BaseButton variant="primary" :disabled="!project.url" @click="openLive">
              {{ t('projectDetail.viewLive') }}
            </BaseButton>
            <BaseButton variant="outline" @click="goToProjects">
              {{ t('projectDetail.back') }}
            </BaseButton>
          </Motion>

          <!-- Prev / next project -->
          <Motion as="div" v-bind="rise(0.4)" class="mt-2 flex items-center justify-between gap-4 border-t border-outline-variant/40 pt-6">
            <button
              type="button"
              class="group inline-flex max-w-[45%] cursor-pointer items-center gap-3 text-left text-on-surface-variant transition-colors hover:text-on-surface"
              :aria-label="t('projectDetail.prev')"
              @click="goToProject(adjacent.prev)"
            >
              <span aria-hidden="true" class="transition-transform group-hover:-translate-x-1">&larr;</span>
              <span class="truncate text-label-lg uppercase tracking-widest">{{ adjacent.prev?.title }}</span>
            </button>
            <button
              type="button"
              class="group inline-flex max-w-[45%] cursor-pointer items-center justify-end gap-3 text-right text-on-surface-variant transition-colors hover:text-on-surface"
              :aria-label="t('projectDetail.next')"
              @click="goToProject(adjacent.next)"
            >
              <span class="truncate text-label-lg uppercase tracking-widest">{{ adjacent.next?.title }}</span>
              <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </button>
          </Motion>
        </div>
      </div>

      <!-- Unknown slug -->
      <div v-else class="flex flex-col items-start gap-6">
        <h1 class="text-headline-md md:text-headline-lg">{{ t('projectDetail.notFound') }}</h1>
        <BaseButton variant="outline" @click="goToProjects">{{ t('projectDetail.back') }}</BaseButton>
      </div>
    </div>
  </section>
</template>

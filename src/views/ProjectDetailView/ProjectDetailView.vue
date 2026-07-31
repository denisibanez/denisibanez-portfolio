<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import BaseModal from '@/components/BaseModal/BaseModal.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge/BaseBadge.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import MediaGallery from '@/components/MediaGallery/MediaGallery.vue'
import { useProjects } from '@/composables/useProjects/useProjects'
import { useProjectRoute } from '@/composables/useProjectRoute/useProjectRoute'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import { yearOf } from '@/utils/timeline/timeline'
import type { Project } from '@/types/project'
import detailBg from '@/assets/images/testimonials-bg.jpg'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t } = useI18n()
const router = useRouter()
const { projects, getAdjacent } = useProjects()
const { slug, project } = useProjectRoute(() => props.slug)
const { localized } = useLocalize()
const adjacent = computed(() => getAdjacent(slug.value))
const currentIndex = computed(() => projects.findIndex((p) => p.slug === slug.value))

// Position of this project within the collection (drives the progress bar).
const progress = computed(() => {
  if (projects.length <= 1 || currentIndex.value < 0) return 0
  return ((currentIndex.value + 1) / projects.length) * 100
})

// Gallery media — an optional lead video (poster = cover image) followed by the
// image gallery (`images`, else the single cover). A gallery entry ending in a
// video extension renders as an inline video; its poster is the sibling `.jpg`
// generated alongside it. Empty until real shots land.
type Media = { type: 'image'; src: string } | { type: 'video'; src: string; poster?: string }
const VIDEO_RE = /\.(mp4|webm|mov)$/i
const toMedia = (src: string): Media =>
  VIDEO_RE.test(src) ? { type: 'video', src, poster: src.replace(VIDEO_RE, '.jpg') } : { type: 'image', src }
const gallery = computed<Media[]>(() => {
  const p = project.value
  if (!p) return []
  const items = (p.images ?? (p.image ? [p.image] : [])).map(toMedia)
  return p.video ? [{ type: 'video', src: p.video, poster: p.image }, ...items] : items
})
const activeImage = ref(0)

// Lightbox (Escape / backdrop close handled by BaseModal)
const lightboxOpen = ref(false)
const openLightbox = () => {
  lightboxOpen.value = true
}
const closeLightbox = () => {
  lightboxOpen.value = false
}

// Reset gallery/lightbox when navigating between projects.
watch(slug, () => {
  activeImage.value = 0
  lightboxOpen.value = false
})

const goToProject = (target: Project | null) => {
  if (!target) return
  router.push({ name: 'project-detail', params: { slug: target.slug } })
}

const { rise } = useRise()
</script>

<template>
  <MediaBackdrop :src="detailBg">
    <!-- Mobile-only scrim — content spans the full height here, so keep it legible -->
    <template #scrim>
      <div class="pointer-events-none absolute inset-0 bg-linear-to-b from-surface/65 via-surface/45 to-surface/85 lg:hidden" />
    </template>

    <div class="relative z-10 flex min-h-dvh flex-col justify-start px-[5vw] pt-28 pb-36 lg:justify-center lg:pt-24 lg:pb-20">
      <!-- Project -->
      <div v-if="project" class="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-10">
        <!-- Vertical prev/next controls (desktop) -->
        <div class="hidden shrink-0 flex-col items-center gap-4 lg:flex">
          <button
            type="button"
            class="inline-flex size-14 cursor-pointer items-center justify-center border border-outline text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
            :aria-label="t('projectDetail.prev')"
            @click="goToProject(adjacent.prev)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div class="h-20 w-0.5 bg-on-surface/20">
            <div class="w-full bg-primary transition-[height] duration-500" :style="{ height: `${progress}%` }" />
          </div>
          <button
            type="button"
            class="inline-flex size-14 cursor-pointer items-center justify-center border border-outline text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
            :aria-label="t('projectDetail.next')"
            @click="goToProject(adjacent.next)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Media -->
        <MediaGallery
          variant="inline"
          :media="gallery"
          v-model:active="activeImage"
          :title="project.title"
          :alt="project.title"
          :labels="{
            prev: t('projectDetail.prev'),
            next: t('projectDetail.next'),
            expand: t('projectDetail.expand'),
            close: t('projectDetail.close'),
          }"
          @maximize="openLightbox"
        />

        <!-- Content -->
        <div class="flex flex-1 flex-col justify-center gap-6 md:gap-8">
          <div class="space-y-3">
            <BaseBadge v-if="project.status === 'draft'">{{ t('projects.draft') }}</BaseBadge>
            <BaseBadge v-else-if="project.kind === 'study'">{{ t('projects.caseStudy') }}</BaseBadge>
            <Motion as="span" v-bind="rise(0)" class="block text-label-lg uppercase tracking-widest text-tertiary">
              {{ localized(project.category) }} — {{ yearOf(project.endDate) }}
            </Motion>
            <Motion as="h1" v-bind="rise(0.1)" class="text-headline-md md:text-headline-lg">
              {{ project.title }}
            </Motion>
          </div>

          <Motion as="p" v-bind="rise(0.2)" class="max-w-xl text-body-lg text-on-surface-variant">
            {{ localized(project.summary) }}
          </Motion>

          <Motion as="div" v-bind="rise(0.3)" class="flex flex-wrap gap-3 sm:gap-4">
            <BaseButton
              variant="primary"
              class="min-w-[45%] flex-1 text-center sm:min-w-0 sm:flex-none"
              :to="{ name: 'project-specs', params: { slug: project.slug } }"
            >
              {{ t('projectDetail.viewLive') }}
            </BaseButton>
            <BaseButton
              v-if="project.kind === 'study' && project.repoUrl"
              variant="outline"
              class="min-w-[45%] flex-1 text-center sm:min-w-0 sm:flex-none"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
            >
              {{ t('projectDetail.viewGithub') }}
            </BaseButton>
            <BaseButton
              variant="outline"
              class="min-w-[45%] flex-1 text-center sm:min-w-0 sm:flex-none"
              :to="{ name: 'projects' }"
            >
              {{ t('projectDetail.back') }}
            </BaseButton>
          </Motion>

          <!-- Prev / next (mobile) — square controls matching desktop -->
          <Motion as="div" v-bind="rise(0.4)" class="mt-2 flex items-center gap-4 lg:hidden">
            <button
              type="button"
              class="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center border border-outline text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
              :aria-label="t('projectDetail.prev')"
              @click="goToProject(adjacent.prev)"
            >
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="h-0.5 flex-1 bg-on-surface/20">
              <div class="h-full bg-primary transition-[width] duration-500" :style="{ width: `${progress}%` }" />
            </div>
            <button
              type="button"
              class="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center border border-outline text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
              :aria-label="t('projectDetail.next')"
              @click="goToProject(adjacent.next)"
            >
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </Motion>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <BaseModal :open="lightboxOpen && !!project" :label="project?.title" @close="closeLightbox">
      <MediaGallery
        v-if="project"
        variant="lightbox"
        :media="gallery"
        v-model:active="activeImage"
        :title="project.title"
        :alt="project.title"
        :labels="{
          prev: t('projectDetail.prev'),
          next: t('projectDetail.next'),
          expand: t('projectDetail.expand'),
          close: t('projectDetail.close'),
        }"
        @close="closeLightbox"
      />
    </BaseModal>
  </MediaBackdrop>
</template>

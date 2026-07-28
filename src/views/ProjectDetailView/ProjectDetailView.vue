<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import BaseModal from '@/components/BaseModal/BaseModal.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge/BaseBadge.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { useProjects } from '@/composables/useProjects/useProjects'
import { useProjectRoute } from '@/composables/useProjectRoute/useProjectRoute'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import { getInitials } from '@/utils/getInitials/getInitials'
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
const slideCount = computed(() => (gallery.value.length > 0 ? gallery.value.length : 3))
const activeImage = ref(0)
const activeMedia = computed(() => gallery.value[activeImage.value])
const activeIsVideo = computed(() => activeMedia.value?.type === 'video')
// Still shown in the small media box — video slides show their poster there.
const activePoster = computed(() => {
  const m = activeMedia.value
  if (!m) return undefined
  return m.type === 'video' ? m.poster : m.src
})

const initials = computed(() => (project.value ? getInitials(project.value.title) : ''))
const heroCode = computed(() => `${initials.value} — ${String(activeImage.value + 1).padStart(2, '0')}`)

const setImage = (index: number) => {
  activeImage.value = index
}

const cycleImage = (direction: number) => {
  const count = slideCount.value
  activeImage.value = (activeImage.value + direction + count) % count
}

// Swipe the media panel sideways to change image; a plain tap/click opens the
// lightbox. `dragMoved` lets us tell a swipe apart from a click.
let dragStartX: number | null = null
const dragMoved = ref(false)
const onDragStart = (event: PointerEvent) => {
  dragStartX = event.clientX
  dragMoved.value = false
}
const onDragEnd = (event: PointerEvent) => {
  if (dragStartX === null) return
  const deltaX = event.clientX - dragStartX
  dragStartX = null
  if (Math.abs(deltaX) < 40) return
  dragMoved.value = true
  cycleImage(deltaX < 0 ? 1 : -1)
}
const onMediaClick = () => {
  if (dragMoved.value) {
    dragMoved.value = false
    return
  }
  openLightbox()
}

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
        <Motion
          as="div"
          v-bind="rise(0.1)"
          role="button"
          tabindex="0"
          :aria-label="t('projectDetail.expand')"
          class="group relative h-[46vh] w-full shrink-0 cursor-zoom-in touch-pan-y select-none overflow-hidden bg-surface-container-low shadow-2xl lg:h-[64vh] lg:w-[34%]"
          @pointerdown="onDragStart"
          @pointerup="onDragEnd"
          @click="onMediaClick"
          @keydown.enter="openLightbox"
          @keydown.space.prevent="openLightbox"
        >
          <!-- Video slides play inline (own controls); stop propagation so the
               container's drag/tap-to-zoom doesn't hijack playback. -->
          <video
            v-if="activeIsVideo"
            :src="activeMedia?.src"
            :poster="activePoster"
            controls
            playsinline
            preload="metadata"
            class="h-full w-full bg-surface-container-low object-contain"
            @click.stop
            @pointerdown.stop
            @pointerup.stop
          />
          <img
            v-else-if="activePoster"
            :src="activePoster"
            :alt="project.title"
            draggable="false"
            class="pointer-events-none h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
            aria-hidden="true"
          >
            <svg class="size-16 text-on-surface/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 3v6m0 0l-4.5 9m4.5-9l4.5 9M12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-label-lg uppercase tracking-widest text-on-surface/30">{{ heroCode }}</span>
          </div>

          <!-- Legibility gradient — kept off video so it never dims the controls -->
          <div v-if="!activeIsVideo" class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />

          <!-- Maximize -->
          <button
            type="button"
            class="absolute right-4 top-4 z-20 inline-flex size-11 cursor-pointer items-center justify-center border border-white/10 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-white/20"
            :aria-label="t('projectDetail.expand')"
            @click.stop="openLightbox"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Prev / next — reliable gallery nav even over a video's own controls -->
          <template v-if="slideCount > 1">
            <button
              type="button"
              class="absolute left-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface opacity-0 backdrop-blur-md transition-all hover:bg-on-surface hover:text-surface focus-visible:opacity-100 group-hover:opacity-100"
              :aria-label="t('projectDetail.prev')"
              @click.stop="cycleImage(-1)"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              class="absolute right-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface opacity-0 backdrop-blur-md transition-all hover:bg-on-surface hover:text-surface focus-visible:opacity-100 group-hover:opacity-100"
              :aria-label="t('projectDetail.next')"
              @click.stop="cycleImage(1)"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </template>

          <!-- Gallery indicators — lifted above a video's control bar so both stay tappable -->
          <div class="absolute left-1/2 z-20 flex -translate-x-1/2 gap-2" :class="activeIsVideo ? 'bottom-16' : 'bottom-6'">
            <button
              v-for="i in slideCount"
              :key="i"
              type="button"
              class="h-0.5 w-8 cursor-pointer transition-all duration-300"
              :class="i - 1 === activeImage ? 'bg-on-surface' : 'bg-on-surface/30 hover:bg-on-surface/60'"
              :aria-label="`${project.title} — ${i}`"
              @click.stop="setImage(i - 1)"
            />
          </div>
        </Motion>

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
      <div
        v-if="project"
        class="relative h-[80vh] w-full max-w-5xl select-none overflow-hidden bg-surface-container-low"
        @pointerdown="onDragStart"
        @pointerup="onDragEnd"
      >
          <video
            v-if="activeIsVideo"
            :src="activeMedia?.src"
            :poster="activePoster"
            controls
            playsinline
            class="h-full w-full object-contain"
            @click.stop
            @pointerdown.stop
            @pointerup.stop
          />
          <img
            v-else-if="activePoster"
            :src="activePoster"
            :alt="project.title"
            draggable="false"
            class="pointer-events-none h-full w-full object-contain"
          />
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
            aria-hidden="true"
          >
            <svg class="size-24 text-on-surface/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 3v6m0 0l-4.5 9m4.5-9l4.5 9M12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-headline-md uppercase tracking-widest text-on-surface/30">{{ heroCode }}</span>
          </div>

          <!-- Prev / next + indicators — same gallery as the page -->
          <template v-if="slideCount > 1">
            <button
              type="button"
              class="absolute left-4 top-1/2 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-on-surface hover:text-surface"
              :aria-label="t('projectDetail.prev')"
              @click.stop="cycleImage(-1)"
            >
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              class="absolute right-4 top-1/2 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-on-surface hover:text-surface"
              :aria-label="t('projectDetail.next')"
              @click.stop="cycleImage(1)"
            >
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              <button
                v-for="i in slideCount"
                :key="i"
                type="button"
                class="h-0.5 w-8 cursor-pointer transition-all duration-300"
                :class="i - 1 === activeImage ? 'bg-on-surface' : 'bg-on-surface/30 hover:bg-on-surface/60'"
                :aria-label="`${project.title} — ${i}`"
                @click.stop="setImage(i - 1)"
              />
            </div>
          </template>

          <button
            type="button"
            class="absolute right-4 top-4 inline-flex size-11 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-on-surface hover:text-surface"
            :aria-label="t('projectDetail.close')"
            @click.stop="closeLightbox"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
      </div>
    </BaseModal>
  </MediaBackdrop>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { useProjects, type Project } from '@/composables/useProjects'
import { site } from '@/config/site'
import detailBg from '@/assets/images/testimonials-bg.jpg'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { projects, getBySlug, getAdjacent } = useProjects()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const project = computed<Project | null>(() => getBySlug(slug.value))
const adjacent = computed(() => getAdjacent(slug.value))
const currentIndex = computed(() => projects.findIndex((p) => p.slug === slug.value))

// Position of this project within the collection (drives the progress bar).
const progress = computed(() => {
  if (projects.length <= 1 || currentIndex.value < 0) return 0
  return ((currentIndex.value + 1) / projects.length) * 100
})

// Image gallery — falls back to a few placeholder frames until real shots land.
const gallery = computed(() => project.value?.image ? [project.value.image] : [])
const slideCount = computed(() => Math.max(gallery.value.length, 3))
const activeImage = ref(0)
const activeSrc = computed(() => gallery.value[activeImage.value])

const initials = computed(() => {
  const current = project.value
  if (!current) return ''
  return current.title
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})
const heroCode = computed(() => `${initials.value} — ${String(activeImage.value + 1).padStart(2, '0')}`)

const setImage = (index: number) => {
  activeImage.value = index
}

const cycleImage = (direction: number) => {
  const count = slideCount.value
  activeImage.value = (activeImage.value + direction + count) % count
}

// Drag/swipe the media panel sideways to change image.
let dragStartX: number | null = null
const onDragStart = (event: PointerEvent) => {
  dragStartX = event.clientX
}
const onDragEnd = (event: PointerEvent) => {
  if (dragStartX === null) return
  const deltaX = event.clientX - dragStartX
  dragStartX = null
  if (Math.abs(deltaX) < 40) return
  cycleImage(deltaX < 0 ? 1 : -1)
}

// Lightbox
const lightboxOpen = ref(false)
const openLightbox = () => {
  lightboxOpen.value = true
}
const closeLightbox = () => {
  lightboxOpen.value = false
}
const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeLightbox()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// Reset gallery/lightbox when navigating between projects.
watch(slug, () => {
  activeImage.value = 0
  lightboxOpen.value = false
})

const goToProjects = () => router.push({ name: 'projects' })
const goToProject = (target: Project | null) => {
  if (!target) return
  router.push({ name: 'project-detail', params: { slug: target.slug } })
}
const openLive = () => {
  // Falls back to the portfolio site until projects carry real live URLs.
  window.open(project.value?.url ?? site.url, '_blank', 'noopener')
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

    <div class="relative z-10 flex min-h-screen flex-col justify-center px-[5vw] pt-28 pb-20 lg:pt-24">
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
          class="group relative h-[46vh] w-full shrink-0 cursor-grab touch-pan-y select-none overflow-hidden bg-surface-container-low shadow-2xl active:cursor-grabbing lg:h-[64vh] lg:w-[34%]"
          @pointerdown="onDragStart"
          @pointerup="onDragEnd"
        >
          <img
            v-if="activeSrc"
            :src="activeSrc"
            :alt="project.title"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

          <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />

          <!-- Maximize -->
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex size-11 cursor-pointer items-center justify-center border border-white/10 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-white/20"
            :aria-label="t('projectDetail.expand')"
            @click="openLightbox"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Gallery indicators -->
          <div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            <button
              v-for="i in slideCount"
              :key="i"
              type="button"
              class="h-0.5 w-8 cursor-pointer transition-all duration-300"
              :class="i - 1 === activeImage ? 'bg-on-surface' : 'bg-on-surface/30 hover:bg-on-surface/60'"
              :aria-label="`${project.title} — ${i}`"
              @click="setImage(i - 1)"
            />
          </div>
        </Motion>

        <!-- Content -->
        <div class="flex flex-1 flex-col justify-center gap-6 md:gap-8">
          <div class="space-y-3">
            <Motion as="span" v-bind="rise(0)" class="block text-label-lg uppercase tracking-widest text-tertiary">
              {{ t('projectDetail.caseStudy') }} — {{ project.year }}
            </Motion>
            <Motion as="h1" v-bind="rise(0.1)" class="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              {{ project.title }}
            </Motion>
          </div>

          <Motion as="p" v-bind="rise(0.2)" class="max-w-xl text-body-lg text-on-surface-variant">
            {{ project.summary }}
          </Motion>

          <Motion as="div" v-bind="rise(0.3)" class="flex flex-wrap gap-4">
            <BaseButton variant="primary" @click="openLive">
              {{ t('projectDetail.viewLive') }}
            </BaseButton>
            <BaseButton variant="outline" @click="goToProjects">
              {{ t('projectDetail.back') }}
            </BaseButton>
          </Motion>

          <!-- Prev / next (mobile) -->
          <Motion
            as="div"
            v-bind="rise(0.4)"
            class="mt-2 flex items-center justify-between gap-4 border-t border-outline/40 pt-6 lg:hidden"
          >
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

    <!-- Lightbox -->
    <Transition name="fade">
      <div
        v-if="lightboxOpen && project"
        class="fixed inset-0 z-50 flex items-center justify-center bg-surface/85 p-[5vw] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click.self="closeLightbox"
      >
        <div class="relative h-[80vh] w-full max-w-5xl overflow-hidden bg-surface-container-low">
          <img v-if="activeSrc" :src="activeSrc" :alt="project.title" class="h-full w-full object-contain" />
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

          <button
            type="button"
            class="absolute right-4 top-4 inline-flex size-11 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface backdrop-blur-md transition-colors hover:bg-on-surface hover:text-surface"
            :aria-label="t('projectDetail.close')"
            @click="closeLightbox"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

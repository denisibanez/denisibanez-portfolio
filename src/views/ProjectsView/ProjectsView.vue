<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel.vue'
import BaseTabs from '@/components/BaseTabs/BaseTabs.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { useProjects } from '@/composables/useProjects/useProjects'
import type { Project } from '@/types/project'
import projectsBg from '@/assets/images/testimonials-bg.jpg'

const { t } = useI18n()
const router = useRouter()
const { projects } = useProjects()

// Filter tabs — projects stay ordered newest-first within each kind.
const activeTab = ref('all')
const tabs = computed(() => [
  { label: t('projects.all'), value: 'all' },
  { label: t('projects.study'), value: 'study' },
  { label: t('projects.client'), value: 'client' },
])
const visibleProjects = computed(() =>
  activeTab.value === 'all' ? projects : projects.filter((p) => p.kind === activeTab.value),
)

// First-visit discovery hint. Touch devices only (no hover cue like desktop),
// shown once (localStorage), auto-dismissed on interaction or after a few seconds.
const HINT_KEY = 'di:projects-hint'
const showHint = ref(false)
let hintTimer: ReturnType<typeof setTimeout> | null = null

const dismissHint = () => {
  if (!showHint.value) return
  showHint.value = false
  if (hintTimer) clearTimeout(hintTimer)
  hintTimer = null
  try {
    localStorage.setItem(HINT_KEY, '1')
  } catch {
    /* storage may be unavailable (private mode) — the hint just shows again */
  }
}

onMounted(() => {
  const noHover = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: none)').matches
  if (!noHover) return
  try {
    if (localStorage.getItem(HINT_KEY)) return
  } catch {
    return
  }
  showHint.value = true
  hintTimer = setTimeout(dismissHint, 6000)
})

onBeforeUnmount(() => {
  if (hintTimer) clearTimeout(hintTimer)
})

const openProject = (project: Project) => {
  dismissHint()
  router.push({ name: 'project-detail', params: { slug: project.slug } })
}

const posterClass =
  'h-[48vh] w-[60vw] bg-surface-container-low sm:aspect-[2/3] sm:h-auto sm:w-[20vw] sm:min-w-[280px] sm:shadow-2xl'
</script>

<template>
  <MediaBackdrop :src="projectsBg">
    <div class="relative z-10 flex min-h-screen flex-col justify-start px-[5vw] pt-28 pb-28 sm:justify-center sm:pt-20 sm:pb-20">
      <BaseTabs v-model="activeTab" :tabs="tabs" class="mb-8 self-start" />
      <BaseCarousel
        :items="visibleProjects"
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
        :labels="{ prev: t('projects.prev'), next: t('projects.next'), goTo: t('projects.title') }"
        :card-class="posterClass"
        :item-key="(project) => project.slug"
        @select="openProject"
        @pointerdown="dismissHint"
      >
        <template #card="{ item }">
          <!-- Media, or a gradient placeholder until real shots land -->
          <img v-if="item.image" :src="item.image" :alt="item.title" class="h-full w-full object-cover" />
          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
            aria-hidden="true"
          >
            <span class="text-label-lg uppercase tracking-widest text-on-surface-variant/50">
              {{ item.category }}
            </span>
          </div>

          <!-- Hover overlay -->
          <div
            class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-surface/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <p class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ item.category }}</p>
            <h3 class="mt-1 text-body-lg text-on-surface">{{ item.title }}</h3>
            <span class="mt-3 inline-flex items-center gap-2 text-label-lg uppercase tracking-widest text-on-surface">
              {{ t('projects.view') }}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </template>
      </BaseCarousel>

      <!-- First-visit nudge (touch only) — fades out on interaction/timeout -->
      <Transition name="hint">
        <p
          v-if="showHint"
          role="status"
          class="pointer-events-none mt-5 flex items-center justify-center gap-2 text-label-lg uppercase tracking-widest text-on-surface-variant/70"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M7 12h10M7 12l3-3M7 12l3 3M17 12l-3-3M17 12l-3 3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ t('projects.hint') }}
        </p>
      </Transition>
    </div>
  </MediaBackdrop>
</template>

<style scoped>
.hint-enter-active,
.hint-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.hint-enter-from,
.hint-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

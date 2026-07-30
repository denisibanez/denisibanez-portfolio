<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { StoryGroup } from '@/types/story'

type Labels = { close: string; next: string; prev: string; view: string }
type Props = { groups: StoryGroup[]; open: boolean; startGroup?: number; labels: Labels }
const props = withDefaults(defineProps<Props>(), { startGroup: 0 })
const emit = defineEmits<{ close: [] }>()

const router = useRouter()

const DURATION = 5000
const TICK = 50

const activeGroup = ref(props.startGroup)
const index = ref(0)
const progress = ref(0)
const paused = ref(false)

const group = computed(() => props.groups[activeGroup.value])
const story = computed(() => group.value?.stories[index.value])

let timer: ReturnType<typeof setInterval> | null = null

const stop = () => {
  if (timer) clearInterval(timer)
  timer = null
}
const resetProgress = () => (progress.value = 0)

const close = () => {
  stop()
  emit('close')
}

const next = () => {
  const stories = group.value?.stories ?? []
  if (index.value < stories.length - 1) {
    index.value += 1
  } else if (activeGroup.value < props.groups.length - 1) {
    activeGroup.value += 1
    index.value = 0
  } else {
    close()
    return
  }
  resetProgress()
}

const prev = () => {
  if (index.value > 0) {
    index.value -= 1
  } else if (activeGroup.value > 0) {
    activeGroup.value -= 1
    index.value = 0
  }
  resetProgress()
}

const start = () => {
  stop()
  timer = setInterval(() => {
    if (paused.value || !props.open) return
    progress.value += (TICK / DURATION) * 100
    if (progress.value >= 100) next()
  }, TICK)
}

const goView = () => {
  const to = story.value?.to
  close()
  if (to) router.push(to)
}

const onKey = (event: KeyboardEvent) => {
  const handlers: Record<string, () => void> = { ArrowRight: next, ArrowLeft: prev, Escape: close }
  handlers[event.key]?.()
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      activeGroup.value = props.startGroup
      index.value = 0
      resetProgress()
      paused.value = false
      window.addEventListener('keydown', onKey)
      start()
    } else {
      stop()
      window.removeEventListener('keydown', onKey)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  stop()
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="story">
      <div
        v-if="open && group && story"
        class="fixed inset-0 z-50 flex flex-col bg-black"
        role="dialog"
        aria-modal="true"
        :aria-label="group.label"
      >
        <!-- Segmented progress bars -->
        <div class="flex gap-1 px-3 pt-3">
          <span v-for="(s, i) in group.stories" :key="i" class="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
            <span
              class="block h-full bg-white"
              :style="{ width: i < index ? '100%' : i === index ? `${progress}%` : '0%' }"
            />
          </span>
        </div>

        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3">
          <span class="text-label-lg uppercase tracking-widest text-white">{{ group.label }}</span>
          <button
            type="button"
            class="grid size-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10"
            :aria-label="labels.close"
            @click="close"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <!-- Media (letterboxed on black) -->
        <div
          class="relative flex min-h-0 flex-1 items-center justify-center"
          @pointerdown="paused = true"
          @pointerup="paused = false"
          @pointerleave="paused = false"
        >
          <img :src="story.image" :alt="story.title" class="max-h-full max-w-full object-contain" />

          <!-- Tap zones -->
          <button type="button" class="absolute inset-y-0 left-0 w-1/3 cursor-default focus:outline-none" :aria-label="labels.prev" @click="prev" />
          <button type="button" class="absolute inset-y-0 right-0 w-1/3 cursor-default focus:outline-none" :aria-label="labels.next" @click="next" />
        </div>

        <!-- Caption -->
        <div class="flex items-end justify-between gap-4 px-5 pb-8 pt-4">
          <div class="min-w-0">
            <p class="truncate text-body-lg font-semibold text-white">{{ story.title }}</p>
            <p v-if="story.subtitle" class="truncate text-sm uppercase tracking-wider text-white/60">{{ story.subtitle }}</p>
          </div>
          <button
            v-if="story.to"
            type="button"
            class="shrink-0 rounded-full border border-white/40 px-5 py-2 text-label-lg uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            @click="goView"
          >
            {{ labels.view }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.story-enter-active,
.story-leave-active {
  transition: opacity 0.25s ease;
}
.story-enter-from,
.story-leave-to {
  opacity: 0;
}
</style>

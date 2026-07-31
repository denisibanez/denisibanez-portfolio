<script setup lang="ts">
import { ref, computed } from 'vue'
import { Motion } from 'motion-v'
import BaseIconButton from '@/components/BaseIconButton/BaseIconButton.vue'
import { useRise } from '@/composables/useRise/useRise'
import { getInitials } from '@/utils/getInitials/getInitials'

export type Media = { type: 'image'; src: string } | { type: 'video'; src: string; poster?: string }
type Variant = 'inline' | 'lightbox'
type Labels = { prev: string; next: string; expand: string; close: string }
type Props = { media: Media[]; active: number; title: string; alt: string; variant?: Variant; labels: Labels }

const props = withDefaults(defineProps<Props>(), { variant: 'inline' })
const emit = defineEmits<{ 'update:active': [number]; maximize: []; close: [] }>()

const { rise } = useRise()

const inline = computed(() => props.variant === 'inline')
// Placeholder shows a 3-dot gallery even before real shots land.
const slideCount = computed(() => (props.media.length > 0 ? props.media.length : 3))
const activeMedia = computed(() => props.media[props.active])
const activeIsVideo = computed(() => activeMedia.value?.type === 'video')
// Video slides show their poster in the small box; images show themselves.
const activePoster = computed(() => {
  const m = activeMedia.value
  if (!m) return undefined
  return m.type === 'video' ? m.poster : m.src
})
const heroCode = computed(() => `${getInitials(props.title)} — ${String(props.active + 1).padStart(2, '0')}`)

const setImage = (index: number) => emit('update:active', index)
const cycleImage = (direction: number) => {
  const count = slideCount.value
  emit('update:active', (props.active + direction + count) % count)
}

// Swipe sideways to change image; a plain tap (inline) opens the lightbox.
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
const onContainerClick = () => {
  if (!inline.value) return
  if (dragMoved.value) {
    dragMoved.value = false
    return
  }
  emit('maximize')
}
const onActivate = () => {
  if (inline.value) emit('maximize')
}

const rootClass = computed(() =>
  inline.value
    ? 'group relative h-[46vh] w-full shrink-0 cursor-zoom-in touch-pan-y select-none overflow-hidden bg-surface-container-low shadow-2xl lg:h-[64vh] lg:w-[34%]'
    : 'relative h-[80vh] w-full max-w-5xl select-none overflow-hidden bg-surface-container-low',
)
const navReveal = 'absolute z-20 -translate-y-1/2 opacity-0 transition-all focus-visible:opacity-100 group-hover:opacity-100'
</script>

<template>
  <Motion
    as="div"
    v-bind="inline ? rise(0.1) : {}"
    :class="rootClass"
    :role="inline ? 'button' : undefined"
    :tabindex="inline ? 0 : undefined"
    :aria-label="inline ? labels.expand : undefined"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @click="onContainerClick"
    @keydown.enter="onActivate"
    @keydown.space.prevent="onActivate"
  >
    <!-- Video slides play inline; stop propagation so drag/tap-to-zoom doesn't hijack playback -->
    <video
      v-if="activeIsVideo"
      :src="activeMedia?.src"
      :poster="activePoster"
      controls
      playsinline
      preload="metadata"
      class="h-full w-full object-contain"
      :class="inline ? 'bg-surface-container-low' : ''"
      @click.stop
      @pointerdown.stop
      @pointerup.stop
    />
    <img
      v-else-if="activePoster"
      :src="activePoster"
      :alt="alt"
      draggable="false"
      class="pointer-events-none h-full w-full object-contain"
      :class="inline ? 'transition-transform duration-700 group-hover:scale-105' : ''"
    />
    <div
      v-else
      class="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
      aria-hidden="true"
    >
      <svg class="text-on-surface/25" :class="inline ? 'size-16' : 'size-24'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <path d="M12 3v6m0 0l-4.5 9m4.5-9l4.5 9M12 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="uppercase tracking-widest text-on-surface/30" :class="inline ? 'text-label-lg' : 'text-headline-md'">{{ heroCode }}</span>
    </div>

    <!-- Legibility gradient — inline only, kept off video so it never dims the controls -->
    <div v-if="inline && !activeIsVideo" class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/50 to-transparent" />

    <!-- Maximize (inline only) -->
    <BaseIconButton
      v-if="inline"
      variant="glass-soft"
      size="lg"
      class="absolute right-4 top-4 z-20 transition-colors"
      :label="labels.expand"
      @click.stop="emit('maximize')"
    >
      <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </BaseIconButton>

    <!-- Prev / next -->
    <template v-if="slideCount > 1">
      <BaseIconButton
        :size="inline ? 'md' : 'lg'"
        :class="inline ? `left-3 top-1/2 ${navReveal}` : 'absolute left-4 top-1/2 -translate-y-1/2 transition-colors'"
        :label="labels.prev"
        @click.stop="cycleImage(-1)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" :class="inline ? 'size-4' : 'size-5'" :stroke-width="inline ? 1.8 : 1.6">
          <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </BaseIconButton>
      <BaseIconButton
        :size="inline ? 'md' : 'lg'"
        :class="inline ? `right-3 top-1/2 ${navReveal}` : 'absolute right-4 top-1/2 -translate-y-1/2 transition-colors'"
        :label="labels.next"
        @click.stop="cycleImage(1)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" :class="inline ? 'size-4' : 'size-5'" :stroke-width="inline ? 1.8 : 1.6">
          <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </BaseIconButton>
    </template>

    <!-- Gallery indicators — inline always; lightbox only when there's more than one -->
    <div
      v-if="inline || slideCount > 1"
      class="absolute left-1/2 z-20 flex -translate-x-1/2 gap-2"
      :class="inline && activeIsVideo ? 'bottom-16' : 'bottom-6'"
    >
      <button
        v-for="i in slideCount"
        :key="i"
        type="button"
        class="h-0.5 w-8 cursor-pointer transition-all duration-300"
        :class="i - 1 === active ? 'bg-on-surface' : 'bg-on-surface/30 hover:bg-on-surface/60'"
        :aria-label="`${title} — ${i}`"
        @click.stop="setImage(i - 1)"
      />
    </div>

    <!-- Close (lightbox only) -->
    <BaseIconButton
      v-if="!inline"
      size="lg"
      class="absolute right-4 top-4 transition-colors"
      :label="labels.close"
      @click.stop="emit('close')"
    >
      <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
      </svg>
    </BaseIconButton>
  </Motion>
</template>

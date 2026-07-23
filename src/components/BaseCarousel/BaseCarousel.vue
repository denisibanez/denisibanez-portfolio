<script setup lang="ts" generic="T">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { Motion } from 'motion-v'
import { useRise } from '@/composables/useRise'

type Labels = { prev: string; next: string; goTo: string }

type Props = {
  items: T[]
  title: string
  subtitle?: string
  labels: Labels
  /** Per-card size/look classes; the wrapper owns snap/hover/dim behaviour. */
  cardClass?: string
  /** Netflix-style cue: dim/desaturate the other cards while one is hovered. */
  dim?: boolean
  itemKey: (item: T, index: number) => string | number
}

const props = withDefaults(defineProps<Props>(), { subtitle: undefined, cardClass: '', dim: true })
const emit = defineEmits<{ select: [item: T] }>()

const track = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
// Controls only make sense when the cards overflow the track's width.
const overflowing = ref(false)

const GAP = 24

let resizeObserver: ResizeObserver | null = null

const measure = () => {
  const el = track.value
  if (!el) return
  overflowing.value = el.scrollWidth - el.clientWidth > 1
}

onMounted(() => {
  measure()
  if (typeof ResizeObserver === 'undefined' || !track.value) return
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(track.value)
})

onUnmounted(() => resizeObserver?.disconnect())

watch(
  () => props.items,
  () => nextTick(measure),
)

const step = () => {
  const el = track.value
  if (!el) return 1
  const card = el.querySelector<HTMLElement>('[data-carousel-card]')
  return card ? card.clientWidth + GAP : el.clientWidth
}

const scrollByCards = (direction: number) => {
  track.value?.scrollBy({ left: direction * step(), behavior: 'smooth' })
}

const scrollToCard = (index: number) => {
  track.value?.scrollTo({ left: index * step(), behavior: 'smooth' })
}

const onScroll = () => {
  const el = track.value
  if (!el) return
  activeIndex.value = Math.round(el.scrollLeft / step())
}

const onSelect = (item: T) => emit('select', item)

const { rise } = useRise()
</script>

<template>
  <div class="flex flex-col">
    <!-- Header -->
    <div class="mb-6 flex flex-col items-start justify-between gap-6 sm:mb-10 md:flex-row md:items-end">
      <div>
        <Motion as="h1" v-bind="rise(0)" class="text-headline-md md:text-headline-lg">
          {{ title }}
        </Motion>
        <Motion
          v-if="subtitle"
          as="p"
          v-bind="rise(0.1)"
          class="mt-3 max-w-2xl text-body-lg text-on-surface-variant"
        >
          {{ subtitle }}
        </Motion>
      </div>

      <Motion v-show="overflowing" as="div" v-bind="rise(0.2)" class="hidden gap-3 sm:flex">
        <button
          type="button"
          class="inline-flex size-12 cursor-pointer items-center justify-center border border-outline text-on-surface transition-colors hover:bg-on-surface hover:text-surface"
          :aria-label="labels.prev"
          @click="scrollByCards(-1)"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          class="inline-flex size-12 cursor-pointer items-center justify-center border border-outline text-on-surface transition-colors hover:bg-on-surface hover:text-surface"
          :aria-label="labels.next"
          @click="scrollByCards(1)"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </Motion>
    </div>

    <!-- Track (Netflix-style: siblings dim while one card is focused) -->
    <Motion as="div" v-bind="rise(0.3)">
      <div
        ref="track"
        class="carousel no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto py-6"
        :class="{ 'carousel-dim': dim }"
        @scroll="onScroll"
      >
        <article
          v-for="(item, i) in items"
          :key="itemKey(item, i)"
          data-carousel-card
          role="button"
          tabindex="0"
          class="carousel-card group relative shrink-0 cursor-pointer snap-start overflow-hidden"
          :class="cardClass"
          @click="onSelect(item)"
          @keydown.enter="onSelect(item)"
          @keydown.space.prevent="onSelect(item)"
        >
          <slot name="card" :item="item" :index="i" />
        </article>
      </div>
    </Motion>

    <!-- Dash indicators — mobile only (desktop uses the prev/next arrows) -->
    <div v-show="overflowing" class="mt-4 flex justify-center gap-2 sm:hidden">
      <button
        v-for="(item, i) in items"
        :key="itemKey(item, i)"
        type="button"
        class="h-0.5 rounded-full transition-all duration-300"
        :class="i === activeIndex ? 'w-8 bg-on-surface' : 'w-4 bg-on-surface-variant/40 hover:bg-on-surface-variant'"
        :aria-label="`${labels.goTo} ${i + 1}`"
        @click="scrollToCard(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.carousel-card {
  transition:
    transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
    filter 0.4s ease;
}

@media (hover: hover) {
  /* The hovered card always pops forward. */
  .carousel-card:hover {
    transform: scale(1.05);
    z-index: 10;
  }
  /* Netflix cue: dim/desaturate the OTHER cards — opt-in via `dim`. */
  .carousel-dim:hover .carousel-card:not(:hover) {
    filter: brightness(0.4) grayscale(0.5);
    transform: scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-card,
  .carousel-card:hover,
  .carousel-dim:hover .carousel-card:not(:hover) {
    transition: none;
    transform: none;
    filter: none;
  }
}
</style>

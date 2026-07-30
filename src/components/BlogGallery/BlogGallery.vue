<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '@/components/BaseModal/BaseModal.vue'

type Labels = { prev: string; next: string; enlarge: string; close: string }
type Props = { images: string[]; alt: string; labels: Labels }

const props = defineProps<Props>()

const active = ref(0)
const zoomed = ref(false)

const multiple = computed(() => props.images.length > 1)
const current = computed(() => props.images[active.value] ?? props.images[0] ?? '')

const go = (index: number) => {
  const total = props.images.length
  if (total === 0) return
  active.value = (index + total) % total
}
const prev = () => go(active.value - 1)
const next = () => go(active.value + 1)

const onKey = (event: KeyboardEvent) => {
  const handlers: Record<string, () => void> = { ArrowLeft: prev, ArrowRight: next }
  handlers[event.key]?.()
}

const arrowBtn =
  'grid size-10 place-items-center rounded-full bg-surface/70 text-on-surface backdrop-blur-sm transition-colors hover:bg-surface/90'
</script>

<template>
  <div class="w-full" @keydown="onKey">
    <figure class="group relative">
      <img
        :src="current"
        :alt="alt"
        loading="lazy"
        class="max-h-[420px] w-full border border-white/10 bg-black object-contain"
      />

      <!-- Maximize (lightbox) — mirrors the portfolio gallery -->
      <button type="button" :class="[arrowBtn, 'absolute right-3 top-3 size-9']" :aria-label="labels.enlarge" @click="zoomed = true">
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <template v-if="multiple">
        <button type="button" :class="[arrowBtn, 'absolute left-3 top-1/2 -translate-y-1/2']" :aria-label="labels.prev" @click="prev">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" :class="[arrowBtn, 'absolute right-3 top-1/2 -translate-y-1/2']" :aria-label="labels.next" @click="next">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </template>
    </figure>

    <!-- Dots -->
    <div v-if="multiple" class="mt-4 flex items-center justify-center gap-2">
      <button
        v-for="(image, i) in images"
        :key="image"
        type="button"
        :aria-label="`${i + 1}`"
        :aria-current="i === active ? 'true' : undefined"
        class="h-1.5 rounded-full transition-all"
        :class="i === active ? 'w-6 bg-tertiary' : 'w-1.5 bg-on-surface/30 hover:bg-on-surface/60'"
        @click="go(i)"
      />
    </div>

    <!-- Lightbox -->
    <BaseModal :open="zoomed" :label="alt" @close="zoomed = false">
      <div class="relative flex max-h-full w-full items-center justify-center" @keydown="onKey">
        <img :src="current" :alt="alt" class="max-h-[85vh] max-w-full object-contain" />

        <button
          type="button"
          :class="[arrowBtn, 'absolute right-0 top-0']"
          :aria-label="labels.close"
          @click="zoomed = false"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>

        <template v-if="multiple">
          <button type="button" :class="[arrowBtn, 'absolute left-0 top-1/2 -translate-y-1/2']" :aria-label="labels.prev" @click="prev">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" :class="[arrowBtn, 'absolute right-0 bottom-0 sm:right-0 sm:top-1/2 sm:-translate-y-1/2']" :aria-label="labels.next" @click="next">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </template>
      </div>
    </BaseModal>
  </div>
</template>

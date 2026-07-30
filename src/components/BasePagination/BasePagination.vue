<script setup lang="ts">
import { computed } from 'vue'

type Labels = { prev?: string; next?: string; nav?: string; page?: string }
type Props = { modelValue: number; pageCount: number; labels?: Labels }

const props = withDefaults(defineProps<Props>(), { labels: () => ({}) })
const emit = defineEmits<{ 'update:modelValue': [page: number] }>()

const go = (page: number) => {
  if (page < 1 || page > props.pageCount || page === props.modelValue) return
  emit('update:modelValue', page)
}

// Windowed page list: first, last, current ± 1, with ellipses between gaps.
type Item = number | 'ellipsis'
const items = computed<Item[]>(() => {
  const { pageCount, modelValue } = props
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1)
  const wanted = [1, pageCount, modelValue, modelValue - 1, modelValue + 1]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b)
  const out: Item[] = []
  let prev = 0
  for (const p of new Set(wanted)) {
    if (p - prev > 1) out.push('ellipsis')
    out.push(p)
    prev = p
  }
  return out
})

const box = 'inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border px-3 text-label-lg uppercase transition-colors'
const idle = 'border-outline/40 text-on-surface-variant hover:border-on-surface hover:text-on-surface'
const arrow = `${box} ${idle} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-outline/40 disabled:hover:text-on-surface-variant`
</script>

<template>
  <nav v-if="pageCount > 1" class="flex items-center justify-center gap-2" :aria-label="labels.nav ?? 'Pagination'">
    <button type="button" :class="arrow" :disabled="modelValue === 1" :aria-label="labels.prev ?? 'Previous'" @click="go(modelValue - 1)">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <template v-for="(item, i) in items" :key="i">
      <span v-if="item === 'ellipsis'" class="px-1 text-label-lg text-on-surface-variant/50" aria-hidden="true">…</span>
      <button
        v-else
        type="button"
        :class="[box, item === modelValue ? 'border-tertiary text-tertiary' : idle]"
        :aria-current="item === modelValue ? 'page' : undefined"
        :aria-label="`${labels.page ?? 'Page'} ${item}`"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button type="button" :class="arrow" :disabled="modelValue === pageCount" :aria-label="labels.next ?? 'Next'" @click="go(modelValue + 1)">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { Tab } from './BaseTabs.types'

type Props = { tabs: Tab[]; modelValue: string }

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const select = (value: string) => {
  if (value !== props.modelValue) emit('update:modelValue', value)
}

// Roving arrow-key navigation across the tabs.
const onKey = (event: KeyboardEvent, index: number) => {
  const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
  if (!direction) return
  event.preventDefault()
  const next = (index + direction + props.tabs.length) % props.tabs.length
  select(props.tabs[next]!.value)
}
</script>

<template>
  <div role="tablist" class="flex flex-wrap gap-6 border-b border-outline-variant/30">
    <button
      v-for="(tab, i) in tabs"
      :key="tab.value"
      type="button"
      role="tab"
      :aria-selected="tab.value === modelValue"
      :tabindex="tab.value === modelValue ? 0 : -1"
      class="relative -mb-px inline-flex min-h-11 cursor-pointer items-center pb-3 text-label-lg uppercase tracking-widest transition-colors"
      :class="tab.value === modelValue ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'"
      @click="select(tab.value)"
      @keydown="onKey($event, i)"
    >
      {{ tab.label }}
      <span
        v-if="tab.value === modelValue"
        class="absolute inset-x-0 bottom-0 h-0.5 bg-tertiary"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

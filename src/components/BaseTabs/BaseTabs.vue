<script setup lang="ts">
import { ref } from 'vue'
import type { Tab } from './BaseTabs.types'

type Props = { tabs: Tab[]; modelValue: string }

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const tablistEl = ref<HTMLElement | null>(null)

const select = (value: string) => {
  if (value !== props.modelValue) emit('update:modelValue', value)
}

// Roving keyboard navigation: arrows + Home/End select AND move focus so the
// focused tab is always the selected one (WAI-ARIA automatic-activation pattern).
const onKey = (event: KeyboardEvent, index: number) => {
  const last = props.tabs.length - 1
  const targets: Record<string, number> = {
    ArrowRight: (index + 1) % props.tabs.length,
    ArrowLeft: (index - 1 + props.tabs.length) % props.tabs.length,
    Home: 0,
    End: last,
  }
  const next = targets[event.key]
  if (next === undefined) return
  event.preventDefault()
  select(props.tabs[next]!.value)
  tablistEl.value?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
}
</script>

<template>
  <div ref="tablistEl" role="tablist" class="flex flex-wrap gap-6 border-b border-outline-variant/30">
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

<script setup lang="ts">
import { computed } from 'vue'
import type { ToastType } from '@/composables/useToast'

// A single elegant toast: glass panel + a semantic accent bar and icon.
type Props = { type?: ToastType; message: string; dismissLabel?: string }
const props = withDefaults(defineProps<Props>(), { type: 'info', dismissLabel: 'Dismiss' })
const emit = defineEmits<{ dismiss: [] }>()

const accent: Record<ToastType, string> = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
}
const bar: Record<ToastType, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
}
// Per-variant icon (inside a 24 viewBox, stroked).
const iconPath: Record<ToastType, string> = {
  success: 'M20 7L10 17l-5-5',
  warning: 'M12 9v4m0 4h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L14 3.9a2 2 0 00-3.4 0z',
  error: 'M12 8v5m0 3h.01M12 3a9 9 0 100 18 9 9 0 000-18z',
  info: 'M12 11v5m0-8h.01M12 3a9 9 0 100 18 9 9 0 000-18z',
}
const isUrgent = computed(() => props.type === 'error' || props.type === 'warning')
</script>

<template>
  <div
    class="relative flex items-start gap-3 overflow-hidden border border-white/10 bg-surface-container/85 py-3 pl-5 pr-3 shadow-2xl backdrop-blur-xl"
    :role="isUrgent ? 'alert' : 'status'"
  >
    <span class="absolute inset-y-0 left-0 w-1" :class="bar[type]" aria-hidden="true" />
    <svg
      class="mt-0.5 size-5 shrink-0"
      :class="accent[type]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      aria-hidden="true"
    >
      <path :d="iconPath[type]" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <p class="flex-1 pt-px text-body-lg text-on-surface">{{ message }}</p>
    <button
      type="button"
      class="shrink-0 cursor-pointer text-on-surface-variant transition-colors hover:text-on-surface"
      :aria-label="dismissLabel"
      @click="emit('dismiss')"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

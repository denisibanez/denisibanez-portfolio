<script setup lang="ts">
// Minimal, on-brand inline loader for async content. Pass an i18n'd `label`.
type Props = { label?: string }
withDefaults(defineProps<Props>(), { label: '' })
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 text-on-surface-variant"
    role="status"
    aria-live="polite"
  >
    <span
      class="size-8 animate-spin rounded-full border-2 border-outline/30 border-t-primary"
      aria-hidden="true"
    />
    <span v-if="label" class="text-label-lg uppercase tracking-widest">{{ label }}</span>
  </div>
</template>

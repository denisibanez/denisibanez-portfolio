<script setup lang="ts">
type Props = { label?: string }

withDefaults(defineProps<Props>(), { label: 'Play' })

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    class="group relative inline-flex size-16 cursor-pointer items-center justify-center rounded-full border border-outline text-on-surface transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
    @click="emit('click')"
  >
    <!-- Fill sweep on hover -->
    <span
      class="absolute inset-0 scale-0 rounded-full bg-on-surface transition-transform duration-300 ease-out group-hover:scale-100"
    />
    <!-- Rotating dashed ring on hover -->
    <span
      class="absolute -inset-1.5 rounded-full border border-dashed border-on-surface/25 opacity-0 transition-opacity duration-300 group-hover:animate-[spin_7s_linear_infinite] group-hover:opacity-100"
    />
    <!-- Play glyph (nudges + inverts colour on hover) -->
    <svg
      class="relative size-6 translate-x-0.5 text-on-surface transition-all duration-300 group-hover:translate-x-1 group-hover:text-surface"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  </button>
</template>

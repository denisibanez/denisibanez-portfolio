<script setup lang="ts">
// Shimmering placeholder block. Size it with utility classes (h-/w-/aspect-);
// `rounded` for pills/avatars. Decorative — wrap groups in an aria-busy region.
type Props = { rounded?: boolean }
withDefaults(defineProps<Props>(), { rounded: false })
</script>

<template>
  <div
    class="skeleton bg-surface-container"
    :class="rounded ? 'rounded-full' : 'rounded-none'"
    aria-hidden="true"
  />
</template>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.4s ease-in-out infinite;
}
@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }
}
</style>

<script setup lang="ts">
// Full-bleed backdrop section: a fixed decorative background image with an
// optional `#scrim` overlay, and the page content in the default slot.
type Props = { src: string }
defineProps<Props>()
</script>

<template>
  <section class="relative min-h-dvh w-full overflow-hidden">
    <img
      :src="src"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
    <!-- Subtle mobile-only dimming for legibility over busy photos -->
    <div class="pointer-events-none absolute inset-0 bg-black/10 sm:hidden" aria-hidden="true" />
    <slot name="scrim" />
    <slot />
  </section>
</template>

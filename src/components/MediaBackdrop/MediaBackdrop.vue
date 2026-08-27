<script setup lang="ts">
// Full-bleed backdrop section: a fixed decorative background image with an
// optional `#scrim` overlay, and the page content in the default slot.
// `alt` is decorative (aria-hidden hides it from AT regardless) but kept
// descriptive so crawlers that read the DOM directly can still parse it.
type Props = { src: string; alt?: string }
withDefaults(defineProps<Props>(), { alt: '' })
</script>

<template>
  <section class="relative min-h-dvh w-full overflow-hidden">
    <img
      :src="src"
      :alt="alt"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
    <!-- Subtle dimming for legibility over busy photos (all viewports) -->
    <div class="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />
    <slot name="scrim" />
    <slot />
  </section>
</template>

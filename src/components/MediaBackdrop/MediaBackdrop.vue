<script setup lang="ts">
// Full-bleed backdrop section: a fixed decorative background image with an
// optional `#scrim` overlay, and the page content in the default slot.
type Props = { src: string }
defineProps<Props>()
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <img
      :src="src"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
    <slot name="scrim" />
    <slot />
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInitialLoad } from '@/composables/useInitialLoad/useInitialLoad'
import { useSeo } from '@/composables/useSeo/useSeo'
import LoadingReveal from '@/components/LoadingReveal/LoadingReveal.vue'

const { isLoading } = useInitialLoad()

// Per-route title/description/canonical/social tags.
useSeo()

// Keep <html lang> in sync with the active locale so screen readers pick the
// right pronunciation engine (and translation/SEO tools read the right language).
const { locale } = useI18n()
watch(
  locale,
  (value) => {
    if (typeof document !== 'undefined') document.documentElement.lang = value
  },
  { immediate: true },
)
</script>

<template>
  <RouterView />

  <Transition name="loader-fade">
    <LoadingReveal v-if="isLoading" />
  </Transition>
</template>

<style>
.loader-fade-leave-active {
  transition: opacity 0.5s ease;
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>

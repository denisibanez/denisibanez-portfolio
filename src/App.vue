<script setup lang="ts">
import { useInitialLoad } from '@/composables/useInitialLoad'
import LoadingReveal from '@/components/LoadingReveal/LoadingReveal.vue'

const { isLoading } = useInitialLoad()
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

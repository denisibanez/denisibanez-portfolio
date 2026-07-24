<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import notFoundBg from '@/assets/images/not-found.jpg'

const { t } = useI18n()
</script>

<template>
  <MediaBackdrop :src="notFoundBg">
    <!-- The backdrop already reads "404 — Page not found", so the overlay is a
         single action; the heading stays sr-only for accessibility/SEO. -->
    <div class="relative z-10 flex min-h-dvh flex-col items-start justify-end px-[5vw] pt-28 pb-24">
      <h1 class="sr-only">{{ t('notFound.title') }}</h1>
      <BaseButton variant="outline" :to="{ name: 'home' }">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </MediaBackdrop>
</template>

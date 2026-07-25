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
    <h1 class="sr-only">{{ t('notFound.title') }}</h1>
    <!-- Centered, in the gap between the mug and the "404" text on the hoodie. -->
    <BaseButton
      variant="outline"
      :to="{ name: 'home' }"
      class="absolute left-1/2 top-[70%] z-10 -translate-x-1/2"
    >
      {{ t('notFound.cta') }}
    </BaseButton>
  </MediaBackdrop>
</template>

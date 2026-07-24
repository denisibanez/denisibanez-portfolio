<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import router from '@/router'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import notFoundBg from '@/assets/images/not-found.jpg'

const { t } = useI18n()

const goHome = () => router.push('/')
</script>

<template>
  <MediaBackdrop :src="notFoundBg" class="flex items-center justify-center">
    <div class="relative z-10 mt-[290px] flex flex-col items-start gap-5 px-[5vw]">
      <p class="flex items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface-variant">
        <span class="h-px w-10 bg-on-surface-variant" aria-hidden="true" />
        {{ t('notFound.eyebrow') }}
      </p>
      <h1 class="text-headline-md md:text-headline-lg">{{ t('notFound.title') }}</h1>
      <p class="max-w-md text-body-lg text-on-surface-variant">{{ t('notFound.message') }}</p>
      <BaseButton variant="outline" class="mt-2" @click="goHome">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </MediaBackdrop>
</template>

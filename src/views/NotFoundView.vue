<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import notFoundBg from '@/assets/images/notfound.jpg'

const { t } = useI18n()
</script>

<template>
  <section class="relative flex min-h-screen items-end justify-center overflow-hidden">
    <img
      :src="notFoundBg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Scrim for text legibility over the busy photo -->
    <div class="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent"></div>

    <div class="relative z-10 flex w-full max-w-2xl flex-col items-center gap-3 px-[5vw] pb-[18vh] text-center">
      <p class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ t('notFound.eyebrow') }}</p>
      <h1 class="text-headline-lg">404</h1>
      <p class="max-w-md text-body-lg text-on-surface-variant">{{ t('notFound.message') }}</p>
      <a
        href="/"
        class="mt-2 text-label-lg uppercase text-on-surface underline underline-offset-4 transition-colors hover:text-primary"
      >
        {{ t('notFound.cta') }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="flex min-h-screen flex-col items-center justify-center gap-4 px-[5vw] text-center">
    <p class="text-label-lg uppercase text-on-surface-variant">{{ t('notFound.eyebrow') }}</p>
    <h1 class="text-headline-lg">404</h1>
    <p class="max-w-md text-body-lg text-on-surface-variant">{{ t('notFound.message') }}</p>
    <a
      href="/"
      class="text-label-lg uppercase text-on-surface underline underline-offset-4 transition-colors hover:text-primary"
    >
      {{ t('notFound.cta') }}
    </a>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import router from '@/router'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import notFoundBg from '@/assets/images/notfound.jpg'

const { t } = useI18n()

const goHome = () => router.push('/')
</script>

<template>
  <section class="relative flex min-h-screen items-end justify-center overflow-hidden">
    <img
      :src="notFoundBg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Scrim so the button stays legible over the busy photo -->
    <div class="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"></div>

    <div class="relative z-10 px-[5vw] pb-[16vh]">
      <BaseButton variant="outline" @click="goHome">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </section>
</template>

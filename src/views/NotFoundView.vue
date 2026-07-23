<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import router from '@/router'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import notFoundBg from '@/assets/images/not-found.jpg'

const { t } = useI18n()

const goHome = () => router.push('/')
</script>

<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden">
    <img
      :src="notFoundBg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div class="relative z-10 mt-[290px] px-[5vw]">
      <BaseButton variant="outline" @click="goHome">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </section>
</template>

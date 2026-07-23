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
    <div class="relative z-10 mt-[290px] px-[5vw]">
      <BaseButton variant="outline" @click="goHome">{{ t('notFound.cta') }}</BaseButton>
    </div>
  </MediaBackdrop>
</template>

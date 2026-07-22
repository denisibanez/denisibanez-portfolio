<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppNav from '@/components/AppNav/AppNav.vue'
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { site } from '@/config/site'

const { t, locale } = useI18n()
const route = useRoute()

const navLinks = computed(() => [
  { label: t('nav.home'), href: '/' },
  { label: t('nav.about'), href: '/about' },
  { label: t('nav.projects'), href: '/projects' },
  { label: t('nav.testimonials'), href: '/testimonials' },
])

const languages = [
  { label: 'EN', value: 'en', flag: '🇬🇧' },
  { label: 'PT', value: 'pt', flag: '🇧🇷' },
  { label: 'ES', value: 'es', flag: '🇪🇸' },
  { label: 'DE', value: 'de', flag: '🇩🇪' },
  { label: 'FR', value: 'fr', flag: '🇫🇷' },
  { label: 'JA', value: 'ja', flag: '🇯🇵' },
]

const socials = site.socials
const year = new Date().getFullYear()

const onLocaleChange = (value: string) => {
  locale.value = value
}
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-surface text-on-surface">
    <!-- Chrome overlays the hero (transparent header/footer) -->
    <header class="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-[5vw] py-6">
      <div class="flex-1">
        <AppNav :links="navLinks" :active="route.path" />
      </div>
      <div class="flex items-center gap-3 sm:gap-4">
        <LanguageSelect :model-value="locale" :options="languages" @update:model-value="onLocaleChange" />
        <BaseButton variant="outline">{{ t('actions.resume') }}</BaseButton>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer
      class="absolute inset-x-0 bottom-0 z-20 flex flex-col items-start justify-between gap-4 px-[5vw] py-6 text-label-lg uppercase text-on-surface-variant sm:flex-row sm:items-center"
    >
      <span class="shrink-0">© {{ year }} Denis Ibañez</span>
      <!-- Socials scroll horizontally on mobile (they overflow once the list grows); inline on desktop -->
      <div class="no-scrollbar flex w-full max-w-full gap-6 overflow-x-auto sm:w-auto sm:overflow-visible">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="shrink-0 whitespace-nowrap transition-colors hover:text-primary"
          >{{ s.label }}</a
        >
      </div>
    </footer>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

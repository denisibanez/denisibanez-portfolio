<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel.vue'
import BaseModal from '@/components/BaseModal/BaseModal.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { getInitials } from '@/utils/getInitials/getInitials'
import { testimonials } from '@/data/testimonials'
import type { Testimonial, LocalizedText } from '@/types/testimonial'
import type { Locale } from '@/i18n'
import testimonialsBg from '@/assets/images/banner-portfolio.webp'

const { t, locale } = useI18n()

// Pick the quote/full in the active locale (fall back to English, then Portuguese).
const localized = (text: LocalizedText) =>
  text[locale.value as Locale] ?? text.en ?? text.pt

// Photos degrade to initials if the file is missing/broken (keyed by name).
const photoError = reactive<Record<string, boolean>>({})
const hasPhoto = (item: Testimonial) => Boolean(item.photo) && !photoError[item.name]

const testimonialCardClass =
  'flex w-[82vw] flex-col border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-white/20 sm:w-[360px]'

// Detail modal
const selected = ref<Testimonial | null>(null)
const openDetail = (item: Testimonial) => {
  selected.value = item
}
const closeDetail = () => {
  selected.value = null
}
</script>

<template>
  <MediaBackdrop :src="testimonialsBg">
    <div class="relative z-10 flex min-h-dvh flex-col justify-start px-[5vw] pt-28 pb-28 sm:justify-center sm:pt-20 sm:pb-20">
      <BaseCarousel
        :items="testimonials"
        :title="t('testimonials.title')"
        :subtitle="t('testimonials.subtitle')"
        :labels="{ prev: t('testimonials.prev'), next: t('testimonials.next'), goTo: t('testimonials.goTo') }"
        :card-class="testimonialCardClass"
        :dim="false"
        :item-key="(item) => item.name"
        @select="openDetail"
      >
        <template #card="{ item }">
          <!-- Media: portrait, or an initials placeholder (also the fallback if the photo fails) -->
          <div class="aspect-square w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-[22vh]">
            <img
              v-if="hasPhoto(item)"
              :src="item.photo"
              :alt="item.name"
              class="h-full w-full object-cover"
              @error="photoError[item.name] = true"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/10 to-transparent"
              aria-hidden="true"
            >
              <span class="text-headline-md uppercase text-on-surface-variant/60">{{ getInitials(item.name) }}</span>
            </div>
          </div>
          <!-- Copy -->
          <div class="flex flex-1 flex-col justify-between p-6 sm:p-8">
            <p class="line-clamp-3 text-body-lg italic text-on-surface">&ldquo;{{ localized(item.quote) }}&rdquo;</p>
            <div class="mt-6">
              <h3 class="text-body-lg text-on-surface">{{ item.name }}</h3>
              <p class="mt-1 text-label-lg uppercase tracking-widest text-on-surface-variant">{{ item.role }}</p>
              <span class="mt-4 hidden items-center gap-2 text-label-lg uppercase tracking-widest text-on-surface-variant sm:inline-flex">
                {{ t('testimonials.readMore') }}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </div>
        </template>
      </BaseCarousel>
    </div>

    <!-- Detail modal -->
    <BaseModal :open="!!selected" :label="selected?.name" @close="closeDetail">
      <div
        v-if="selected"
        class="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden border border-white/15 bg-white/8 backdrop-blur-2xl sm:flex-row"
      >
          <!-- Media -->
          <div class="h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
            <img
              v-if="hasPhoto(selected)"
              :src="selected.photo"
              :alt="selected.name"
              class="h-full w-full object-cover"
              @error="photoError[selected.name] = true"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/12 to-transparent"
              aria-hidden="true"
            >
              <span class="text-headline-lg uppercase text-on-surface-variant/60">{{ getInitials(selected.name) }}</span>
            </div>
          </div>

          <!-- Copy -->
          <div class="flex flex-col overflow-y-auto p-8 sm:p-10">
            <span class="block text-6xl leading-none text-on-surface-variant/30" aria-hidden="true">&ldquo;</span>
            <p class="mt-2 whitespace-pre-line text-body-lg italic text-on-surface">{{ localized(selected.full) }}</p>
            <div class="mt-8">
              <h3 class="text-body-lg text-on-surface">
                <a
                  v-if="selected.link"
                  :href="selected.link"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  {{ selected.name }}
                  <svg class="size-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
                <template v-else>{{ selected.name }}</template>
              </h3>
              <p class="mt-1 text-label-lg uppercase tracking-widest text-on-surface-variant">{{ selected.role }}</p>
            </div>
          </div>

          <!-- Close -->
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex size-10 cursor-pointer items-center justify-center border border-white/15 bg-surface/40 text-on-surface transition-colors hover:bg-on-surface hover:text-surface"
            :aria-label="t('testimonials.close')"
            @click="closeDetail"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
      </div>
    </BaseModal>
  </MediaBackdrop>
</template>

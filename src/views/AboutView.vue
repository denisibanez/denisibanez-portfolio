<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import router from '@/router'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { useRise } from '@/composables/useRise'
import aboutBg from '@/assets/images/about-bg.jpg'

const { t } = useI18n()
const { rise } = useRise()

const goToWork = () => router.push('/')
</script>

<template>
  <MediaBackdrop :src="aboutBg">
    <!-- Mobile-only scrim — subtle, just enough to keep the stacked copy legible -->
    <template #scrim>
      <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/75 via-surface/35 to-transparent lg:hidden" />
    </template>

    <div class="relative z-10 min-h-screen px-[5vw] pt-28 pb-28">
      <!-- Desktop / tablet: two text columns flanking the centred portrait -->
      <div class="hidden min-h-[calc(100vh-14rem)] grid-cols-12 items-center gap-8 lg:grid">
        <div class="col-span-4">
          <Motion
            as="p"
            v-bind="rise(0)"
            class="mb-6 flex items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface-variant"
          >
            <span class="h-px w-10 bg-on-surface-variant" />
            {{ t('about.eyebrow') }}
          </Motion>
          <Motion as="h1" v-bind="rise(0.1)" class="text-headline-lg leading-none">
            {{ t('about.title') }}
          </Motion>
          <Motion as="p" v-bind="rise(0.2)" class="mt-8 max-w-sm text-body-lg text-on-surface-variant">
            {{ t('about.lead') }}
          </Motion>
        </div>

        <div class="col-span-4" aria-hidden="true" />

        <div class="col-span-4">
          <Motion as="p" v-bind="rise(0.3)" class="max-w-xs text-body-lg text-on-surface-variant">
            {{ t('about.body') }}
          </Motion>
          <Motion as="div" v-bind="rise(0.45)" class="mt-10">
            <button
              type="button"
              class="group inline-flex cursor-pointer items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface transition-colors hover:text-primary"
              @click="goToWork"
            >
              <span class="h-px w-12 bg-on-surface transition-all group-hover:w-16" />
              {{ t('about.cta') }}
              <span class="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </button>
          </Motion>
        </div>
      </div>

      <!-- Rotated role strip pinned to the right edge (xl+ only, to clear the copy column) -->
      <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[6vw] items-center justify-center xl:flex">
        <span class="rotate-90 whitespace-nowrap text-label-lg uppercase tracking-[0.5em] text-on-surface-variant/40">
          {{ t('about.roles') }}
        </span>
      </div>

      <!-- Mobile: single column anchored to the bottom over the portrait -->
      <div class="flex min-h-[calc(100vh-14rem)] flex-col justify-end gap-5 lg:hidden">
        <Motion
          as="p"
          v-bind="rise(0)"
          class="flex items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface-variant"
        >
          <span class="h-px w-10 bg-on-surface-variant" />
          {{ t('about.eyebrow') }}
        </Motion>
        <Motion as="h1" v-bind="rise(0.1)" class="text-headline-md leading-none">
          {{ t('about.title') }}
        </Motion>
        <Motion as="p" v-bind="rise(0.2)" class="text-body-lg text-on-surface-variant">
          {{ t('about.lead') }}
        </Motion>
        <Motion as="p" v-bind="rise(0.3)" class="text-body-lg text-on-surface-variant">
          {{ t('about.body') }}
        </Motion>
        <Motion as="div" v-bind="rise(0.45)" class="mt-2">
          <button
            type="button"
            class="group inline-flex cursor-pointer items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface transition-colors hover:text-primary"
            @click="goToWork"
          >
            <span class="h-px w-12 bg-on-surface" />
            {{ t('about.cta') }}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </Motion>
      </div>
    </div>
  </MediaBackdrop>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import MediaBackdrop from '@/components/MediaBackdrop/MediaBackdrop.vue'
import { useProjectRoute } from '@/composables/useProjectRoute/useProjectRoute'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import { monthsBetween, formatRange } from '@/utils/timeline/timeline'
import { site } from '@/config/site'
import detailBg from '@/assets/images/testimonials-bg.jpg'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t } = useI18n()
const { project } = useProjectRoute(() => props.slug)
const { localized } = useLocalize()

const paragraphs = computed(() => (project.value ? localized(project.value.overview) : []))

// Custom scroll-progress indicator for the narrative box.
const scrollArea = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const onScroll = () => {
  const el = scrollArea.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  scrollProgress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
}

// Shared panel/label styles.
const glass = 'border border-white/10 bg-surface-container/70 backdrop-blur-xl'
const metaLabel = 'text-label-lg uppercase tracking-widest text-on-surface-variant/70'

const { rise } = useRise()
</script>

<template>
  <MediaBackdrop :src="detailBg">
    <!-- Mobile-only scrim — content spans the full height here, keep it legible -->
    <template #scrim>
      <div class="pointer-events-none absolute inset-0 bg-linear-to-b from-surface/70 via-surface/50 to-surface/85 lg:hidden" />
    </template>

    <div class="relative z-10 flex min-h-dvh items-start px-[5vw] pt-28 pb-28 lg:items-center lg:pt-24">
      <!-- Project -->
      <div v-if="project" class="grid w-full grid-cols-1 gap-10 lg:h-[78vh] lg:grid-cols-2 lg:gap-16">
        <!-- Narrative — no card, sits directly on the background -->
        <Motion as="div" v-bind="rise(0)" class="flex flex-col lg:overflow-hidden">
          <div class="shrink-0">
            <span class="mb-3 block text-label-lg uppercase tracking-widest text-on-surface-variant">
              {{ t('projectSpecs.specifications') }}
            </span>
            <h1 class="text-headline-md md:text-headline-lg">
              {{ project.title }}
            </h1>
          </div>

          <div class="mt-6 flex flex-1 gap-4 lg:min-h-0">
            <div
              ref="scrollArea"
              class="no-scrollbar max-h-[42vh] flex-1 space-y-6 overflow-y-auto pr-2 text-on-surface-variant lg:max-h-none"
              @scroll="onScroll"
            >
              <p v-for="(paragraph, i) in paragraphs" :key="i" class="text-body-lg leading-relaxed">
                {{ paragraph }}
              </p>

              <div class="pt-2">
                <span class="mb-4 block border-b border-outline-variant/30 pb-3 text-label-lg uppercase tracking-widest text-on-surface">
                  {{ t('projectSpecs.keyFeatures') }}
                </span>
                <ul class="space-y-3">
                  <li v-for="(feature, i) in localized(project.features)" :key="i" class="flex items-start gap-3 text-body-lg">
                    <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Scroll progress -->
            <div class="w-0.5 shrink-0 bg-on-surface/20">
              <div class="w-full bg-primary" :style="{ height: `${scrollProgress}%` }" />
            </div>
          </div>

          <div class="mt-8 flex shrink-0 flex-wrap gap-3 sm:gap-4">
            <BaseButton
              variant="primary"
              class="min-w-[45%] flex-1 text-center sm:min-w-0"
              :href="project.url ?? site.url"
              target="_blank"
              rel="noopener"
            >
              {{ t('projectSpecs.viewLive') }}
            </BaseButton>
            <BaseButton
              v-if="project.kind === 'study' && project.repoUrl"
              variant="outline"
              class="min-w-[45%] flex-1 text-center sm:min-w-0"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener"
            >
              {{ t('projectSpecs.viewGithub') }}
            </BaseButton>
            <BaseButton variant="outline" class="min-w-[45%] flex-1 text-center sm:min-w-0" :to="{ name: 'projects' }">
              {{ t('projectSpecs.back') }}
            </BaseButton>
          </div>
        </Motion>

        <!-- Specifications grid -->
        <Motion as="div" v-bind="rise(0.15)" class="no-scrollbar grid grid-cols-2 gap-4 lg:content-start lg:overflow-y-auto">
          <!-- Industry -->
          <div :class="glass" class="col-span-1 flex aspect-square flex-col justify-between p-6">
            <span :class="metaLabel">{{ t('projectSpecs.industry') }}</span>
            <p class="font-serif text-3xl leading-tight md:text-4xl">{{ localized(project.industry) }}</p>
          </div>

          <!-- Timeline -->
          <div :class="glass" class="col-span-1 flex aspect-square flex-col justify-between p-6">
            <span :class="metaLabel">{{ t('projectSpecs.timeline') }}</span>
            <div class="flex items-baseline gap-2">
              <span class="font-serif text-5xl leading-none">{{ monthsBetween(project.startDate, project.endDate) }}</span>
              <span class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ t('projectSpecs.months') }}</span>
            </div>
            <p class="text-sm text-on-surface-variant">{{ formatRange(project.startDate, project.endDate) }}</p>
          </div>

          <!-- Tech stack -->
          <div :class="glass" class="col-span-2 p-6">
            <span :class="metaLabel" class="mb-5 block">{{ t('projectSpecs.techStack') }}</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="border border-outline-variant px-3 py-1.5 text-xs uppercase tracking-wider text-on-surface"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Role & collaborators -->
          <div :class="glass" class="col-span-2 grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            <div>
              <span :class="metaLabel" class="mb-2 block">{{ t('projectSpecs.myRole') }}</span>
              <p class="text-body-lg text-on-surface">{{ project.role }}</p>
            </div>
            <div>
              <span :class="metaLabel" class="mb-2 block">{{ t('projectSpecs.collaborators') }}</span>
              <p class="text-body-lg text-on-surface">{{ project.collaborators }}</p>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </MediaBackdrop>
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

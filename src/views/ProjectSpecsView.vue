<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { useProjects, type Project } from '@/composables/useProjects'
import { site } from '@/config/site'
import detailBg from '@/assets/images/testimonials-bg.jpg'

// `slug` prop overrides the route param (handy for stories/tests).
type Props = { slug?: string }
const props = defineProps<Props>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { getBySlug } = useProjects()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const project = computed<Project | null>(() => getBySlug(slug.value))

const goToProjects = () => router.push({ name: 'projects' })
const openLive = () => {
  // Falls back to the portfolio site until projects carry real live URLs.
  window.open(project.value?.url ?? site.url, '_blank', 'noopener')
}

// Shared panel/label styles.
const glass = 'border border-white/10 bg-surface-container/70 backdrop-blur-xl'
const metaLabel = 'text-label-lg uppercase tracking-widest text-on-surface-variant/70'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <img
      :src="detailBg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />
    <!-- Mobile-only scrim — content spans the full height here, keep it legible -->
    <div class="pointer-events-none absolute inset-0 bg-linear-to-b from-surface/70 via-surface/50 to-surface/85 lg:hidden" />

    <div class="relative z-10 flex min-h-screen items-start px-[5vw] pt-28 pb-28 lg:items-center lg:pt-24">
      <!-- Project -->
      <div v-if="project" class="grid w-full grid-cols-1 gap-10 lg:h-[78vh] lg:grid-cols-2 lg:gap-16">
        <!-- Narrative — no card, sits directly on the background -->
        <Motion as="div" v-bind="rise(0)" class="flex flex-col lg:overflow-hidden">
          <div class="shrink-0">
            <span class="block text-label-lg uppercase tracking-widest text-tertiary">
              {{ t('projectSpecs.specifications') }}
            </span>
            <h1 class="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              {{ project.title }}
            </h1>
          </div>

          <div class="no-scrollbar mt-6 flex-1 space-y-6 text-on-surface-variant lg:overflow-y-auto lg:pr-4">
            <p v-for="(paragraph, i) in project.overview" :key="i" class="text-body-lg">{{ paragraph }}</p>

            <div>
              <span class="mb-4 block border-b border-outline-variant/30 pb-2 text-label-lg uppercase tracking-widest text-on-surface">
                {{ t('projectSpecs.keyFeatures') }}
              </span>
              <ul class="space-y-3">
                <li v-for="(feature, i) in project.features" :key="i" class="flex items-start gap-3 text-body-lg">
                  <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-tertiary" aria-hidden="true" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 flex shrink-0 gap-3 sm:gap-4">
            <BaseButton variant="primary" class="flex-1 text-center" @click="openLive">
              {{ t('projectSpecs.viewLive') }}
            </BaseButton>
            <BaseButton variant="outline" class="flex-1 text-center" @click="goToProjects">
              {{ t('projectSpecs.back') }}
            </BaseButton>
          </div>
        </Motion>

        <!-- Specifications grid -->
        <Motion as="div" v-bind="rise(0.15)" class="no-scrollbar grid grid-cols-2 gap-4 lg:content-start lg:overflow-y-auto">
          <!-- Industry -->
          <div :class="glass" class="col-span-1 flex aspect-square flex-col justify-between p-6">
            <span :class="metaLabel">{{ t('projectSpecs.industry') }}</span>
            <p class="font-serif text-3xl leading-tight md:text-4xl">{{ project.industry }}</p>
          </div>

          <!-- Timeline -->
          <div :class="glass" class="col-span-1 flex aspect-square flex-col justify-between p-6">
            <span :class="metaLabel">{{ t('projectSpecs.timeline') }}</span>
            <div class="flex items-baseline gap-2">
              <span class="font-serif text-5xl leading-none">{{ project.timelineMonths }}</span>
              <span class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ t('projectSpecs.months') }}</span>
            </div>
            <p class="text-sm text-on-surface-variant">{{ project.timelineRange }}</p>
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

      <!-- Unknown slug -->
      <div v-else class="flex flex-col items-start gap-6">
        <h1 class="font-serif text-4xl md:text-5xl">{{ t('projectSpecs.notFound') }}</h1>
        <BaseButton variant="outline" @click="goToProjects">{{ t('projectSpecs.back') }}</BaseButton>
      </div>
    </div>
  </section>
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

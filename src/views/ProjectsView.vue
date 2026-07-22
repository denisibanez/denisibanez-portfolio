<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel.vue'
import { useProjects, type Project } from '@/composables/useProjects'
import projectsBg from '@/assets/images/testimonials-bg.jpg'

const { t } = useI18n()
const router = useRouter()
const { projects } = useProjects()

const openProject = (project: Project) => {
  router.push({ name: 'project-detail', params: { slug: project.slug } })
}

const posterClass =
  'h-[48vh] w-[60vw] bg-surface-container-low sm:aspect-[2/3] sm:h-auto sm:w-[20vw] sm:min-w-[280px] sm:shadow-2xl'
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <img
      :src="projectsBg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />

    <div class="relative z-10 flex h-screen flex-col justify-start px-[5vw] pt-28 pb-16 sm:justify-center sm:pt-20">
      <BaseCarousel
        :items="projects"
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
        :labels="{ prev: t('projects.prev'), next: t('projects.next'), goTo: t('projects.title') }"
        :card-class="posterClass"
        :item-key="(project) => project.slug"
        @select="openProject"
      >
        <template #card="{ item }">
          <!-- Media, or a gradient placeholder until real shots land -->
          <img v-if="item.image" :src="item.image" :alt="item.title" class="h-full w-full object-cover" />
          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-linear-to-br from-surface-bright/40 via-surface-container to-surface-container-lowest"
            aria-hidden="true"
          >
            <span class="text-label-lg uppercase tracking-widest text-on-surface-variant/50">
              {{ item.category }}
            </span>
          </div>

          <!-- Hover overlay -->
          <div
            class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-surface/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <p class="text-label-lg uppercase tracking-widest text-on-surface-variant">{{ item.category }}</p>
            <h3 class="mt-1 text-body-lg text-on-surface">{{ item.title }}</h3>
            <span class="mt-3 inline-flex items-center gap-2 text-label-lg uppercase tracking-widest text-on-surface">
              {{ t('projects.view') }}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>

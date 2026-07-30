<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import GlassPlayer from '@/components/GlassPlayer/GlassPlayer.vue'
import StoryRings from '@/components/StoryRings/StoryRings.vue'
import StoryViewer from '@/components/StoryViewer/StoryViewer.vue'
import { useStories } from '@/composables/useStories/useStories'
import { useRise } from '@/composables/useRise/useRise'
import type { Track } from '@/types/track'
import bannerHome from '@/assets/images/banner-home-full.webp'
import videoHome from '@/assets/video/video-home.mp4'
import iSeeFireAudio from '@/assets/mp3/ed-sheeran-i-see-fire.mp3'
import iSeeFireCover from '@/assets/mp3/ed-sheeran-i-see-fire.jpeg'
import rememberAudio from '@/assets/mp3/michael-jackson-remember-the-time.mp3'
import rememberCover from '@/assets/mp3/michael-jackson-remember-the-time.jpeg'
import oBemAudio from '@/assets/mp3/arlindo-cruz-o-bem.mp3'
import oBemCover from '@/assets/mp3/arlindo-cruz-o-bem.avif'

const { t } = useI18n()

// Users who prefer reduced motion get the still banner only — no autoplaying video.
const prefersReducedMotion =
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const videoReady = ref(false)
const videoEnded = ref(false)

const playerOpen = ref(false)
const tracks: Track[] = [
  {
    title: 'I See Fire',
    artist: 'Ed Sheeran',
    src: iSeeFireAudio,
    cover: iSeeFireCover,
  },
  {
    title: 'Remember The Time',
    artist: 'Michael Jackson',
    src: rememberAudio,
    cover: rememberCover,
  },
  {
    title: 'O Bem',
    artist: 'Arlindo Cruz',
    src: oBemAudio,
    cover: oBemCover,
  },
]

// Show the video only once it can play and until it finishes — the banner stays
// painted underneath, so the swap cross-fades with no black frame or flicker.
const showVideo = computed(() => videoReady.value && !videoEnded.value)

const onCanPlay = () => {
  videoReady.value = true
}
const onEnded = () => {
  videoEnded.value = true
}

// Staggered rise-in — reused per element with an increasing delay.
const { rise } = useRise()

// Instagram-style stories built from the site's own portfolio/blog/testimonials.
const { groups: storyGroups } = useStories()
const storyOpen = ref(false)
const storyStart = ref(0)
const openStory = (index: number) => {
  storyStart.value = index
  storyOpen.value = true
}
</script>

<template>
  <section class="relative min-h-dvh w-full overflow-hidden">
    <!-- Banner is always painted underneath so the video→image swap never flickers -->
    <img :src="bannerHome" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
    <video
      v-if="!prefersReducedMotion"
      :src="videoHome"
      autoplay
      muted
      playsinline
      preload="auto"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
      :class="showVideo ? 'opacity-100' : 'opacity-0'"
      @canplay="onCanPlay"
      @ended="onEnded"
    />

    <!-- Subtle dimming for legibility over the hero media (all viewports) -->
    <div class="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />

    <div class="relative z-10 flex min-h-dvh flex-col justify-center px-[5vw] pt-28 pb-28">
      <Motion v-if="storyGroups.length" as="div" v-bind="rise(0)" class="mb-10">
        <StoryRings :groups="storyGroups" :open-label="t('stories.open')" @open="openStory" />
      </Motion>

      <div class="max-w-xl">
        <Motion
          as="p"
          v-bind="rise(0)"
          class="mb-6 flex items-center gap-4 text-label-lg uppercase text-on-surface-variant"
        >
          <span class="h-px w-10 bg-on-surface-variant" />
          {{ t('home.eyebrow') }}
        </Motion>

        <Motion as="h1" v-bind="rise(0.1)" class="text-headline-md md:text-headline-lg">
          <span class="block italic">{{ t('home.greetingLead') }}</span>
          <span class="block italic">Denis Ibañez</span>
          <span class="mt-2 block uppercase">{{ t('home.role') }}</span>
        </Motion>

        <Motion as="p" v-bind="rise(0.2)" class="mt-8 max-w-md text-body-lg text-on-surface-variant">
          {{ t('home.description') }}
        </Motion>

        <Motion as="div" v-bind="rise(0.3)" class="mt-10 flex items-center gap-6">
          <BaseButton block :to="{ name: 'projects' }">{{ t('home.cta') }}</BaseButton>
          <span class="text-2xl text-on-surface" aria-hidden="true">&rarr;</span>
        </Motion>
      </div>
    </div>

    <!-- Morphing play button ↔ player (single glass element) -->
    <GlassPlayer
      :open="playerOpen"
      :tracks="tracks"
      :label="t('home.play')"
      :labels="{
        dialog: t('player.dialog'),
        play: t('player.play'),
        pause: t('player.pause'),
        previous: t('player.previous'),
        next: t('player.next'),
        close: t('player.close'),
      }"
      @open="playerOpen = true"
      @close="playerOpen = false"
    />

    <!-- Full-screen Instagram-style story viewer -->
    <StoryViewer
      :groups="storyGroups"
      :open="storyOpen"
      :start-group="storyStart"
      :labels="{ close: t('blog.close'), next: t('blog.next'), prev: t('blog.prev'), view: t('stories.view') }"
      @close="storyOpen = false"
    />
  </section>
</template>

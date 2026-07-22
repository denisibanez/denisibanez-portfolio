<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import GlassPlayer, { type Track } from '@/components/GlassPlayer/GlassPlayer.vue'
import bannerHome from '@/assets/images/banner-home-full.png'
import videoHome from '@/assets/video/video-home.mp4'
import iSeeFireAudio from '@/assets/mp3/ed-sheeran-i-see-fire.mp3'
import iSeeFireCover from '@/assets/mp3/ed-sheeran-i-see-fire.jpeg'
import rememberAudio from '@/assets/mp3/michael-jackson-remember-the-time.mp3'
import rememberCover from '@/assets/mp3/michael-jackson-remember-the-time.jpeg'
import oBemAudio from '@/assets/mp3/arlindo-cruz-o-bem.mp3'
import oBemCover from '@/assets/mp3/arlindo-cruz-o-bem.avif'

const { t } = useI18n()

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
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <!-- Banner is always painted underneath so the video→image swap never flickers -->
    <img :src="bannerHome" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
    <video
      :src="videoHome"
      autoplay
      muted
      playsinline
      preload="auto"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out"
      :class="showVideo ? 'opacity-100' : 'opacity-0'"
      @canplay="onCanPlay"
      @ended="onEnded"
    />

    <div class="relative z-10 flex min-h-screen flex-col justify-center px-[5vw] pt-28 pb-28">
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
          <BaseButton block>{{ t('home.cta') }}</BaseButton>
          <span class="text-2xl text-on-surface" aria-hidden="true">&rarr;</span>
        </Motion>
      </div>
    </div>

    <!-- Morphing play button ↔ player (single glass element) -->
    <GlassPlayer
      :open="playerOpen"
      :tracks="tracks"
      :label="t('home.play')"
      @open="playerOpen = true"
      @close="playerOpen = false"
    />
  </section>
</template>

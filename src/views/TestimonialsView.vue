<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import testimonialsBg from '@/assets/images/testimonials-bg.jpg'

const { t } = useI18n()

type Testimonial = { quote: string; name: string; role: string; photo?: string }

// Sample testimonials — replace with real quotes when available.
const testimonials: Testimonial[] = [
  {
    quote: 'Denis bridges complex logic and elegant UI better than anyone I have worked with. Our design system finally felt effortless.',
    name: 'Alexandra Vance',
    role: 'Head of Design, Nexus Labs',
  },
  {
    quote: 'He turned a tangled legacy front-end into a fast, maintainable Vue app — on time and without drama.',
    name: 'Marcus Thorne',
    role: 'Senior Product Manager, Aether',
  },
  {
    quote: 'A rare combination of engineering depth and design sensibility. Denis treats the front-end like a craft.',
    name: 'Elena Rosier',
    role: 'Engineering Manager, Studio Void',
  },
  {
    quote: 'A true partner in the creative process — he prototypes fast and ships polished, accessible interfaces.',
    name: 'Julian Kael',
    role: 'Creative Director, Kael Ventures',
  },
  {
    quote: 'Denis mentored our team and raised the bar for code quality across the board.',
    name: 'Priya Nandakumar',
    role: 'CTO, Northwind',
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

const track = ref<HTMLElement | null>(null)

const scrollByCards = (direction: number) => {
  const el = track.value
  if (!el) return
  const card = el.querySelector('article')
  const amount = card ? card.clientWidth + 24 : el.clientWidth * 0.8
  el.scrollBy({ left: direction * amount, behavior: 'smooth' })
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})
</script>

<template>
  <section class="relative min-h-screen w-full overflow-hidden">
    <img
      :src="testimonialsBg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />

    <div class="relative z-10 flex min-h-screen flex-col justify-center px-[5vw] pt-28 pb-28">
      <!-- Header -->
      <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Motion as="h1" v-bind="rise(0)" class="text-headline-md md:text-headline-lg">
            {{ t('testimonials.title') }}
          </Motion>
          <Motion as="p" v-bind="rise(0.1)" class="mt-3 max-w-lg text-body-lg text-on-surface-variant">
            {{ t('testimonials.subtitle') }}
          </Motion>
        </div>

        <Motion as="div" v-bind="rise(0.2)" class="flex gap-3">
          <button
            type="button"
            class="inline-flex size-12 cursor-pointer items-center justify-center border border-outline text-on-surface transition-colors hover:bg-on-surface hover:text-surface"
            :aria-label="t('testimonials.prev')"
            @click="scrollByCards(-1)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-12 cursor-pointer items-center justify-center border border-outline text-on-surface transition-colors hover:bg-on-surface hover:text-surface"
            :aria-label="t('testimonials.next')"
            @click="scrollByCards(1)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </Motion>
      </div>

      <!-- Carousel -->
      <div ref="track" class="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/8 sm:w-[360px]"
        >
          <!-- Media: portrait, or an initials placeholder until real photos are added -->
          <div class="h-72 w-full shrink-0 overflow-hidden">
            <img v-if="item.photo" :src="item.photo" :alt="item.name" class="h-full w-full object-cover" />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/10 to-transparent"
              aria-hidden="true"
            >
              <span class="text-headline-md uppercase text-on-surface-variant/60">{{ initials(item.name) }}</span>
            </div>
          </div>
          <!-- Copy -->
          <div class="flex flex-1 flex-col justify-between p-8">
            <p class="text-body-lg italic text-on-surface">&ldquo;{{ item.quote }}&rdquo;</p>
            <div class="mt-6">
              <h3 class="text-body-lg text-on-surface">{{ item.name }}</h3>
              <p class="mt-1 text-label-lg uppercase tracking-widest text-on-surface-variant">{{ item.role }}</p>
            </div>
          </div>
        </article>
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

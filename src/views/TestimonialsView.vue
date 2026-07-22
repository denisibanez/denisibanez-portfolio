<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import testimonialsBg from '@/assets/images/testimonials-bg.jpg'

const { t } = useI18n()

type Testimonial = { quote: string; full: string; name: string; role: string; photo?: string }

// Sample testimonials — replace with real quotes when available.
const testimonials: Testimonial[] = [
  {
    quote: 'Denis bridges complex logic and elegant UI better than anyone I have worked with. Our design system finally felt effortless.',
    full: 'Denis bridges complex logic and elegant UI better than anyone I have worked with. He took our fragmented component library and turned it into a coherent design system the whole team could build on. What impressed me most was how he balanced pixel-level craft with real engineering discipline — everything he shipped was accessible, documented and a genuine pleasure to extend.',
    name: 'Alexandra Vance',
    role: 'Head of Design, Nexus Labs',
  },
  {
    quote: 'He turned a tangled legacy front-end into a fast, maintainable Vue app — on time and without drama.',
    full: 'He turned a tangled legacy front-end into a fast, maintainable Vue app — on time and without drama. Denis mapped out the migration in clear phases, kept the product shipping the entire way, and left us with a codebase our team actually enjoys working in. Load times dropped dramatically and our release cadence doubled.',
    name: 'Marcus Thorne',
    role: 'Senior Product Manager, Aether',
  },
  {
    quote: 'A rare combination of engineering depth and design sensibility. Denis treats the front-end like a craft.',
    full: 'A rare combination of engineering depth and design sensibility. Denis treats the front-end like a craft — he sweats the transitions, the empty states, the details most engineers skip. Working alongside him raised the standard for everyone on the team, and the polish showed up directly in our user feedback.',
    name: 'Elena Rosier',
    role: 'Engineering Manager, Studio Void',
  },
  {
    quote: 'A true partner in the creative process — he prototypes fast and ships polished, accessible interfaces.',
    full: 'A true partner in the creative process — he prototypes fast and ships polished, accessible interfaces. Denis turns rough ideas into working, testable prototypes in days, which completely changed how quickly we could validate directions. He is as comfortable in a design critique as in a code review, and that range is rare.',
    name: 'Julian Kael',
    role: 'Creative Director, Kael Ventures',
  },
  {
    quote: 'Denis mentored our team and raised the bar for code quality across the board.',
    full: 'Denis mentored our team and raised the bar for code quality across the board. He introduced patterns, reviews and tooling that outlasted his engagement, and he did it generously — always teaching, never gatekeeping. Months later the team still points to practices he established as the reason our front-end stays healthy.',
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
const activeIndex = ref(0)

const step = () => {
  const el = track.value
  if (!el) return 1
  const card = el.querySelector('article')
  return card ? card.clientWidth + 24 : el.clientWidth
}

const scrollByCards = (direction: number) => {
  track.value?.scrollBy({ left: direction * step(), behavior: 'smooth' })
}

const scrollToCard = (index: number) => {
  track.value?.scrollTo({ left: index * step(), behavior: 'smooth' })
}

const onScroll = () => {
  const el = track.value
  if (!el) return
  activeIndex.value = Math.round(el.scrollLeft / step())
}

// Detail modal
const selected = ref<Testimonial | null>(null)
const openDetail = (item: Testimonial) => {
  selected.value = item
}
const closeDetail = () => {
  selected.value = null
}
const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeDetail()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

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
    <!-- Mobile-only scrim — subtle, keeps the header copy legible over the portrait -->
    <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface/75 via-surface/35 to-transparent lg:hidden" />

    <div class="relative z-10 flex h-screen flex-col justify-end px-[5vw] pt-24 pb-20 sm:justify-center sm:pt-20 sm:pb-16">
      <!-- Header -->
      <div class="mb-6 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
        <div>
          <Motion as="h1" v-bind="rise(0)" class="text-headline-md md:text-headline-lg">
            {{ t('testimonials.title') }}
          </Motion>
          <Motion as="p" v-bind="rise(0.1)" class="mt-3 max-w-lg text-body-lg text-on-surface-variant">
            {{ t('testimonials.subtitle') }}
          </Motion>
        </div>

        <Motion as="div" v-bind="rise(0.2)" class="hidden gap-3 sm:flex">
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
      <div
        ref="track"
        class="no-scrollbar flex shrink-0 snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        @scroll="onScroll"
      >
        <article
          v-for="item in testimonials"
          :key="item.name"
          role="button"
          tabindex="0"
          class="flex w-[72vw] shrink-0 cursor-pointer snap-start flex-col overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:border-white/20 hover:bg-white/8 sm:w-[360px]"
          @click="openDetail(item)"
          @keydown.enter="openDetail(item)"
          @keydown.space.prevent="openDetail(item)"
        >
          <!-- Media: portrait, or an initials placeholder until real photos are added -->
          <div class="h-28 w-full shrink-0 overflow-hidden sm:h-[22vh]">
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
          <div class="flex flex-1 flex-col justify-between p-6 sm:p-8">
            <p class="line-clamp-3 text-body-lg italic text-on-surface">&ldquo;{{ item.quote }}&rdquo;</p>
            <div class="mt-6">
              <h3 class="text-body-lg text-on-surface">{{ item.name }}</h3>
              <p class="mt-1 text-label-lg uppercase tracking-widest text-on-surface-variant">{{ item.role }}</p>
              <span class="mt-4 hidden items-center gap-2 text-label-lg uppercase tracking-widest text-on-surface-variant sm:inline-flex">
                {{ t('testimonials.readMore') }}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Dash indicators — mobile only (desktop uses the prev/next arrows) -->
      <div class="mt-4 flex justify-center gap-2 sm:hidden">
        <button
          v-for="(item, i) in testimonials"
          :key="item.name"
          type="button"
          class="h-0.5 rounded-full transition-all duration-300"
          :class="i === activeIndex ? 'w-8 bg-on-surface' : 'w-4 bg-on-surface-variant/40 hover:bg-on-surface-variant'"
          :aria-label="`${t('testimonials.goTo')} ${i + 1}`"
          @click="scrollToCard(i)"
        />
      </div>
    </div>

    <!-- Detail modal -->
    <Transition name="modal">
      <div
        v-if="selected"
        class="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 px-[5vw] py-16 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click.self="closeDetail"
      >
        <div
          class="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden border border-white/15 bg-white/8 backdrop-blur-2xl sm:flex-row"
        >
          <!-- Media -->
          <div class="h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
            <img v-if="selected.photo" :src="selected.photo" :alt="selected.name" class="h-full w-full object-cover" />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/12 to-transparent"
              aria-hidden="true"
            >
              <span class="text-headline-lg uppercase text-on-surface-variant/60">{{ initials(selected.name) }}</span>
            </div>
          </div>

          <!-- Copy -->
          <div class="flex flex-col overflow-y-auto p-8 sm:p-10">
            <span class="block text-6xl leading-none text-on-surface-variant/30" aria-hidden="true">&ldquo;</span>
            <p class="mt-2 text-body-lg italic text-on-surface">{{ selected.full }}</p>
            <div class="mt-8">
              <h3 class="text-body-lg text-on-surface">{{ selected.name }}</h3>
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
      </div>
    </Transition>
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

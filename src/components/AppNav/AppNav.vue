<script setup lang="ts">
import { computed, ref } from 'vue'

type NavLink = { label: string; href: string }

type Props = { links: NavLink[]; active?: string }

const props = defineProps<Props>()

const mobileOpen = ref(false)

const activeHref = computed(() => props.active ?? props.links[0]?.href)
const isActive = (link: NavLink) => link.href === activeHref.value

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

const closeMobile = () => {
  mobileOpen.value = false
}
</script>

<template>
  <nav class="w-full">
    <!-- Desktop: inline links (>= md) -->
    <ul class="hidden md:flex md:items-center md:gap-8">
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          class="inline-flex flex-col items-start text-label-lg uppercase transition-colors"
          :class="isActive(link) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'"
        >
          {{ link.label }}
          <span v-if="isActive(link)" class="mt-1 h-px w-full bg-primary" aria-hidden="true" />
        </a>
      </li>
    </ul>

    <!-- Mobile/tablet: hollow grid toggle (< md) -->
    <button
      type="button"
      class="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-on-surface md:hidden"
      :aria-expanded="mobileOpen"
      aria-label="Menu"
      @click="toggleMobile"
    >
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    </button>

    <!-- Mobile/tablet drawer -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-surface/95 backdrop-blur-sm md:hidden"
      @click="closeMobile"
    >
      <ul class="flex flex-col gap-2 px-[5vw] pt-24">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="inline-flex min-h-11 flex-col items-start py-2 text-label-lg uppercase transition-colors"
            :class="isActive(link) ? 'text-primary' : 'text-on-surface hover:text-primary'"
            @click="closeMobile"
          >
            {{ link.label }}
            <span v-if="isActive(link)" class="mt-1 h-px w-8 bg-primary" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

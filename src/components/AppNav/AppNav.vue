<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { NavLink } from './AppNav.types'

type Props = { links: NavLink[]; active?: string }

const props = defineProps<Props>()

const mobileOpen = ref(false)

// Close the drawer once navigation lands — never on the link's own click, so a
// single tap navigates cleanly (closing on click races the router → double-tap).
watch(
  () => props.active,
  () => {
    mobileOpen.value = false
  },
)

const activeHref = computed(() => props.active ?? props.links[0]?.href)
const isActive = (link: NavLink) => link.href === activeHref.value

// Internal paths navigate via the router; hashes/externals stay plain anchors.
const isRoute = (href: string) => href.startsWith('/')
const linkTag = (link: NavLink) => (isRoute(link.href) ? RouterLink : 'a')
const linkAttrs = (link: NavLink) => (isRoute(link.href) ? { to: link.href } : { href: link.href })

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
        <component
          :is="linkTag(link)"
          v-bind="linkAttrs(link)"
          class="inline-flex flex-col items-start text-label-lg uppercase transition-colors"
          :class="isActive(link) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'"
        >
          {{ link.label }}
          <span v-if="isActive(link)" class="mt-1 h-px w-full bg-primary" aria-hidden="true" />
        </component>
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
    <div v-if="mobileOpen" class="fixed inset-0 z-40 md:hidden">
      <!-- Backdrop: tapping outside the links closes; kept separate so a link
           tap never bubbles into closeMobile mid-navigation. -->
      <div class="absolute inset-0 bg-surface/95 backdrop-blur-sm" aria-hidden="true" @click="closeMobile" />
      <ul class="relative flex flex-col gap-2 px-[5vw] pt-24">
        <li v-for="link in links" :key="link.href">
          <component
            :is="linkTag(link)"
            v-bind="linkAttrs(link)"
            class="inline-flex min-h-11 flex-col items-start py-2 text-label-lg uppercase transition-colors"
            :class="isActive(link) ? 'text-primary' : 'text-on-surface hover:text-primary'"
          >
            {{ link.label }}
            <span v-if="isActive(link)" class="mt-1 h-px w-8 bg-primary" aria-hidden="true" />
          </component>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { StoryGroup } from '@/types/story'

type Props = { groups: StoryGroup[]; openLabel?: string }
defineProps<Props>()
const emit = defineEmits<{ open: [index: number] }>()
</script>

<template>
  <div class="no-scrollbar flex gap-5 overflow-x-auto pb-1 sm:gap-6">
    <button
      v-for="(group, i) in groups"
      :key="group.id"
      type="button"
      class="group flex shrink-0 flex-col items-center gap-2 focus:outline-none"
      :aria-label="openLabel ? `${openLabel}: ${group.label}` : group.label"
      @click="emit('open', i)"
    >
      <span
        class="rounded-full bg-gradient-to-tr from-tertiary via-primary to-tertiary p-[3px] transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-tertiary"
      >
        <span class="block rounded-full bg-surface p-[2px]">
          <img
            :src="group.cover"
            :alt="group.label"
            loading="lazy"
            class="size-16 rounded-full object-cover sm:size-[68px]"
          />
        </span>
      </span>
      <span class="max-w-[92px] truncate text-label-lg uppercase text-on-surface-variant transition-colors group-hover:text-on-surface">
        {{ group.label }}
      </span>
    </button>
  </div>
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

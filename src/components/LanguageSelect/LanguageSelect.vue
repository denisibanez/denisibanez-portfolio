<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { Option } from './LanguageSelect.types'

// Menu-button pattern (valid ARIA: menu → menuitem buttons) with full keyboard
// support: arrows to move, Home/End, Escape to close and restore focus.
type Props = { modelValue: string; options: Option[] }

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const triggerEl = ref<HTMLButtonElement | null>(null)
const listEl = ref<HTMLElement | null>(null)

const current = computed(() => props.options.find((o) => o.value === props.modelValue) ?? props.options[0])
const currentIndex = computed(() => Math.max(0, props.options.findIndex((o) => o.value === props.modelValue)))

const items = () => Array.from(listEl.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? [])
const focusAt = (index: number) => {
  const els = items()
  if (!els.length) return
  els[((index % els.length) + els.length) % els.length]?.focus()
}

const openMenu = (index = currentIndex.value) => {
  open.value = true
  nextTick(() => focusAt(index))
}

const closeMenu = (returnFocus = true) => {
  open.value = false
  if (returnFocus) nextTick(() => triggerEl.value?.focus())
}

const select = (value: string) => {
  emit('update:modelValue', value)
  closeMenu()
}

const onTriggerKey = (event: KeyboardEvent) => {
  const opener: Record<string, number> = { ArrowDown: 0, Enter: 0, ' ': 0, ArrowUp: -1 }
  if (!(event.key in opener)) return
  event.preventDefault()
  openMenu(event.key === 'ArrowUp' ? items().length - 1 : currentIndex.value)
}

const onItemKey = (event: KeyboardEvent, index: number) => {
  const actions: Record<string, () => void> = {
    ArrowDown: () => focusAt(index + 1),
    ArrowUp: () => focusAt(index - 1),
    Home: () => focusAt(0),
    End: () => focusAt(items().length - 1),
    Escape: () => closeMenu(),
    Tab: () => closeMenu(false),
  }
  const run = actions[event.key]
  if (!run) return
  if (event.key !== 'Tab') event.preventDefault()
  run()
}
</script>

<template>
  <div class="relative inline-block text-label-lg uppercase">
    <button
      ref="triggerEl"
      type="button"
      class="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 text-on-surface transition-colors hover:text-primary"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open ? closeMenu(false) : openMenu()"
      @keydown="onTriggerKey"
    >
      <span v-if="current?.flag" aria-hidden="true">{{ current.flag }}</span>
      {{ current?.label }}
      <svg
        class="size-3 transition-transform"
        :class="open ? 'rotate-180' : ''"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <template v-if="open">
      <!-- backdrop closes the menu without a global listener -->
      <div class="fixed inset-0 z-10" @click="closeMenu(false)" />
      <ul
        ref="listEl"
        role="menu"
        class="absolute right-0 z-20 mt-2 min-w-full rounded-sm border border-white/15 bg-white/8 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl backdrop-saturate-150"
      >
        <li v-for="(o, i) in options" :key="o.value" role="none">
          <button
            type="button"
            role="menuitem"
            :aria-current="o.value === modelValue"
            class="flex min-h-11 w-full cursor-pointer items-center gap-2 px-4 py-2 text-left transition-all duration-200 hover:bg-white/10 hover:backdrop-blur-md"
            :class="o.value === modelValue ? 'text-primary' : 'text-on-surface-variant'"
            @click="select(o.value)"
            @keydown="onItemKey($event, i)"
          >
            <span v-if="o.flag" aria-hidden="true">{{ o.flag }}</span>
            {{ o.label }}
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>

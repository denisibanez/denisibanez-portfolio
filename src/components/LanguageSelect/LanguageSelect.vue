<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Option } from './LanguageSelect.types'

type Props = { modelValue: string; options: Option[] }

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)

const current = computed(() => props.options.find((o) => o.value === props.modelValue) ?? props.options[0])

const toggle = () => {
  open.value = !open.value
}

const close = () => {
  open.value = false
}

const select = (value: string) => {
  emit('update:modelValue', value)
  close()
}
</script>

<template>
  <div class="relative inline-block text-label-lg uppercase">
    <button
      type="button"
      class="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 text-on-surface transition-colors hover:text-primary"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
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
      >
        <path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <template v-if="open">
      <!-- backdrop closes the menu without a global listener -->
      <div class="fixed inset-0 z-10" @click="close" />
      <ul
        role="listbox"
        class="absolute right-0 z-20 mt-2 min-w-full rounded-sm border border-white/15 bg-white/8 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl backdrop-saturate-150"
      >
        <li v-for="o in options" :key="o.value" role="option" :aria-selected="o.value === modelValue">
          <button
            type="button"
            class="flex min-h-11 w-full cursor-pointer items-center gap-2 px-4 py-2 text-left transition-all duration-200 hover:bg-white/10 hover:backdrop-blur-md"
            :class="o.value === modelValue ? 'text-primary' : 'text-on-surface-variant'"
            @click="select(o.value)"
          >
            <span v-if="o.flag" aria-hidden="true">{{ o.flag }}</span>
            {{ o.label }}
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>

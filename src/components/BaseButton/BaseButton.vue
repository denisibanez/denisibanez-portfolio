<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'outline'

type Props = {
  variant?: Variant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  /** Full width on mobile, auto from `sm` up. */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  block: false,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

// Lookup map instead of branching on the variant.
const variantClass: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-on-surface',
  outline: 'border border-outline text-on-surface hover:border-primary hover:text-primary',
}

const classes = computed(() => [
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-none px-6',
  'text-label-lg uppercase',
  'transition-all duration-300 ease-out will-change-transform',
  'hover:scale-[1.02] active:scale-95',
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
  variantClass[props.variant],
  props.block ? 'w-full sm:w-auto' : '',
])

const onClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes" @click="onClick">
    <slot />
    <slot name="trailing" />
  </button>
</template>

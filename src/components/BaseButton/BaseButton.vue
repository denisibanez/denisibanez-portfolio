<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type Variant = 'primary' | 'outline'

type Props = {
  variant?: Variant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  /** Full width on mobile, auto from `sm` up. */
  block?: boolean
  /** Render as a router link (internal navigation) — keeps link semantics. */
  to?: RouteLocationRaw
  /** Render as an anchor (external link). Pair with target/rel via attrs. */
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  block: false,
  to: undefined,
  href: undefined,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

// A CTA that navigates must be a link (crawlable, Cmd/middle-click, SR "link").
const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

// Bind only the props for the chosen element — passing an explicit (even
// undefined) `href` to RouterLink would clobber the href it generates.
const elementProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: props.type, disabled: props.disabled }
})

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
  <component :is="tag" v-bind="elementProps" :class="classes" @click="onClick">
    <slot />
    <slot name="trailing" />
  </component>
</template>

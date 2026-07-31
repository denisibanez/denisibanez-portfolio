<script setup lang="ts">
// A square glass icon button (blurred surface + border). The icon goes in the
// default slot; positioning/reveal/transition classes are passed via `class`
// and merge onto the root. No `click` emit is declared, so native listeners
// like `@click.stop` fall through and behave natively.
type Size = 'sm' | 'md' | 'lg'
type Variant = 'glass' | 'glass-soft'
type Props = { label: string; size?: Size; variant?: Variant }
withDefaults(defineProps<Props>(), { size: 'md', variant: 'glass' })

const sizeClass: Record<Size, string> = { sm: 'size-9', md: 'size-10', lg: 'size-11' }
const variantClass: Record<Variant, string> = {
  glass: 'border-white/15 hover:bg-on-surface hover:text-surface',
  'glass-soft': 'border-white/10 hover:bg-white/20',
}
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :class="[
      'inline-flex cursor-pointer items-center justify-center border bg-surface/40 text-on-surface backdrop-blur-md',
      sizeClass[size],
      variantClass[variant],
    ]"
  >
    <slot />
  </button>
</template>

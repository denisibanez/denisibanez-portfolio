<script setup lang="ts">
// Small status/label chip (e.g. "Draft", "Case Study"). Agnostic: the text comes
// from the default slot (or `label`), positioning via class fallthrough. Set
// `floating` when it sits over imagery so it stays legible (backdrop + surface).
type Props = { label?: string; floating?: boolean }
withDefaults(defineProps<Props>(), { label: undefined, floating: false })
</script>

<template>
  <span
    class="inline-flex items-center border border-tertiary/60 px-2.5 py-1 text-label-lg uppercase tracking-widest text-tertiary"
    :class="floating ? 'bg-surface/80 backdrop-blur-sm' : ''"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

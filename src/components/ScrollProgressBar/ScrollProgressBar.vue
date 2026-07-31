<script setup lang="ts">
// A thin vertical track with a fill that grows to `progress`% — the scroll
// indicator used alongside internally-scrolling panels.
type Variant = 'primary' | 'tertiary'
type Props = { progress: number; variant?: Variant }
withDefaults(defineProps<Props>(), { variant: 'primary' })

const fillClass: Record<Variant, string> = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
}
</script>

<template>
  <div class="w-0.5 shrink-0 bg-on-surface/20">
    <div class="w-full transition-[height] duration-150" :class="fillClass[variant]" :style="{ height: `${progress}%` }" />
  </div>
</template>

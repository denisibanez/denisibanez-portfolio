<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

// Reusable dialog: backdrop + centred panel (default slot), teleported to body.
// Closes on Escape or backdrop click; locks body scroll while open.
type Props = { open: boolean; label?: string }
const props = withDefaults(defineProps<Props>(), { label: '' })
const emit = defineEmits<{ close: [] }>()

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) emit('close')
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
  { immediate: true },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 px-[5vw] py-16 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="label || undefined"
        @click.self="emit('close')"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

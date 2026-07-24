<script setup lang="ts">
import { watch, onUnmounted, ref, nextTick } from 'vue'

// Reusable dialog: backdrop + centred panel (default slot), teleported to body.
// Closes on Escape or backdrop click; locks body scroll while open; traps focus
// inside the dialog, moves focus in on open and restores it to the trigger on close.
type Props = { open: boolean; label?: string }
const props = withDefaults(defineProps<Props>(), { label: '' })
const emit = defineEmits<{ close: [] }>()

const dialogEl = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const focusables = () =>
  Array.from(dialogEl.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )

const onKey = (event: KeyboardEvent) => {
  if (!props.open) return
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  // Trap Tab within the dialog (wrap at both ends).
  const items = focusables()
  if (!items.length) {
    event.preventDefault()
    dialogEl.value?.focus()
    return
  }
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      lastFocused = document.activeElement as HTMLElement | null
      window.addEventListener('keydown', onKey)
      nextTick(() => (focusables()[0] ?? dialogEl.value)?.focus())
    } else {
      window.removeEventListener('keydown', onKey)
      lastFocused?.focus()
      lastFocused = null
    }
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
        ref="dialogEl"
        tabindex="-1"
        class="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 px-[5vw] py-16 backdrop-blur-sm focus:outline-none"
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

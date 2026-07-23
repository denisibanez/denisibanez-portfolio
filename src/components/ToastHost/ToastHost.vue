<script setup lang="ts">
import { useToast, type ToastType } from '@/composables/useToast'

// Renders the shared toast queue once (mount in the layout). Agnostic: the
// dismiss label is passed in (i18n'd) so the component stays copy-free.
type Props = { dismissLabel?: string }
withDefaults(defineProps<Props>(), { dismissLabel: 'Dismiss' })

const { toasts, dismiss } = useToast()

// Error toasts get a gold accent dot + border; the rest stay neutral.
const accent: Record<ToastType, string> = {
  info: 'border-white/10',
  success: 'border-white/10',
  error: 'border-tertiary/50',
}
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-6 right-[5vw] z-[60] flex w-full max-w-sm flex-col items-stretch gap-3"
      role="region"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto flex items-start gap-3 border bg-surface-container/80 px-4 py-3 backdrop-blur-xl"
          :class="accent[t.type]"
          :role="t.type === 'error' ? 'alert' : 'status'"
        >
          <span
            v-if="t.type === 'error'"
            class="mt-1.5 size-1.5 shrink-0 rounded-full bg-tertiary"
            aria-hidden="true"
          />
          <p class="flex-1 text-body-lg text-on-surface">{{ t.message }}</p>
          <button
            type="button"
            class="shrink-0 cursor-pointer text-on-surface-variant transition-colors hover:text-on-surface"
            :aria-label="dismissLabel"
            @click="dismiss(t.id)"
          >
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>

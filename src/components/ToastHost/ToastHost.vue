<script setup lang="ts">
import BaseToast from '@/components/BaseToast/BaseToast.vue'
import { useToast } from '@/composables/useToast'

// Renders the shared toast queue once (mount in the layout). The dismiss label
// is passed in (i18n'd) so the component stays copy-free.
type Props = { dismissLabel?: string }
withDefaults(defineProps<Props>(), { dismissLabel: 'Dismiss' })

const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-6 right-[5vw] z-[60] flex w-full max-w-sm flex-col items-stretch gap-3"
      role="region"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <BaseToast
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto"
          :type="t.type"
          :message="t.message"
          :dismiss-label="dismissLabel"
          @dismiss="dismiss(t.id)"
        />
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

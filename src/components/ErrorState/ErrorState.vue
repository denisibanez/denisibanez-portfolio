<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue'

// On-brand error placeholder for async failures. Copy is passed in (i18n'd);
// emits `retry` so the host can re-run the request.
type Props = { title?: string; message?: string; retryLabel?: string }
withDefaults(defineProps<Props>(), { title: '', message: '', retryLabel: '' })
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-col items-start gap-4 py-12" role="alert">
    <span v-if="title" class="text-label-lg uppercase tracking-widest text-tertiary">{{ title }}</span>
    <p v-if="message" class="max-w-md text-body-lg text-on-surface-variant">{{ message }}</p>
    <BaseButton v-if="retryLabel" variant="outline" @click="emit('retry')">{{ retryLabel }}</BaseButton>
  </div>
</template>

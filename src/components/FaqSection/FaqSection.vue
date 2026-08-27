<script setup lang="ts">
import { Motion } from 'motion-v'
import { useLocalize } from '@/composables/useLocalize/useLocalize'
import { useRise } from '@/composables/useRise/useRise'
import type { FaqItem } from '@/types/faq'

type Props = { items: FaqItem[]; eyebrow: string; title: string }
defineProps<Props>()

const { localized } = useLocalize()
const { rise } = useRise()
</script>

<template>
  <section class="relative z-10 px-[5vw] py-24">
    <Motion
      as="p"
      v-bind="rise(0)"
      class="mb-6 flex items-center gap-4 text-label-lg uppercase tracking-widest text-on-surface-variant"
    >
      <span class="h-px w-10 bg-on-surface-variant" />
      {{ eyebrow }}
    </Motion>
    <Motion as="h2" v-bind="rise(0.1)" class="mb-10 text-headline-md leading-none">
      {{ title }}
    </Motion>

    <div class="mx-auto max-w-3xl divide-y divide-outline-variant/30 border-t border-outline-variant/30">
      <Motion
        v-for="(item, index) in items"
        :key="localized(item.question)"
        as="div"
        v-bind="rise(0.15 + index * 0.05)"
      >
        <details class="group py-6">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-6 text-body-lg font-medium text-on-surface marker:content-none"
          >
            {{ localized(item.question) }}
            <span
              class="shrink-0 text-xl text-on-surface-variant transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p class="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{{ localized(item.answer) }}</p>
        </details>
      </Motion>
    </div>
  </section>
</template>

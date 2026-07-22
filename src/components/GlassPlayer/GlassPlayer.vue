<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";

export type Track = { title: string; artist: string; src: string; cover?: string };

type Props = { open: boolean; track: Track };

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const audio = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);

const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0));

const format = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const toggle = () => {
  const el = audio.value;
  if (!el) return;
  if (el.paused) el.play().catch(() => {});
  else el.pause();
};

const seekBy = (delta: number) => {
  const el = audio.value;
  if (!el) return;
  el.currentTime = Math.min(Math.max(0, el.currentTime + delta), duration.value || 0);
};

const scrub = (event: MouseEvent) => {
  const el = audio.value;
  if (!el || !duration.value) return;
  const bar = event.currentTarget as HTMLElement;
  const rect = bar.getBoundingClientRect();
  const fraction = Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
  el.currentTime = fraction * duration.value;
};

const onTimeUpdate = () => (currentTime.value = audio.value?.currentTime ?? 0);
const onLoaded = () => (duration.value = audio.value?.duration ?? 0);
const onPlay = () => (playing.value = true);
const onPause = () => (playing.value = false);

const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") emit("close");
};

watch(
  () => props.open,
  (open) => {
    if (open) nextTick(() => audio.value?.play().catch(() => {}));
    else audio.value?.pause();
  },
);

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <Transition name="player">
    <div v-if="open" class="fixed inset-0 z-50" @click.self="emit('close')">
      <div
        class="absolute bottom-44 right-[5vw] w-[20rem] max-w-[90vw] origin-bottom-right overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
      >
        <!-- Liquid-glass sheen -->
        <div
          class="pointer-events-none absolute -top-1/3 left-0 h-2/3 w-full bg-linear-to-b from-white/15 to-transparent"
          aria-hidden="true"
        />

        <!-- Close -->
        <button
          type="button"
          class="absolute right-4 top-4 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/20 text-on-surface transition-colors hover:bg-black/40"
          :aria-label="'Close'"
          @click="emit('close')"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>

        <!-- Cover -->
        <div class="relative aspect-square w-full overflow-hidden rounded-3xl">
          <img v-if="track.cover" :src="track.cover" :alt="track.title" class="h-full w-full object-cover" />
          <div
            v-else
            class="flex h-full w-full items-center justify-center bg-linear-to-br from-white/25 to-white/5"
            aria-hidden="true"
          >
            <svg class="size-16 text-on-surface/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 17V5l10-2v12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="7" cy="17" r="2.2" />
              <circle cx="17" cy="15" r="2.2" />
            </svg>
          </div>
        </div>

        <!-- Meta -->
        <div class="relative mt-5">
          <h3 class="truncate text-body-lg text-on-surface">{{ track.title }}</h3>
          <p class="truncate text-label-lg uppercase tracking-widest text-on-surface-variant">{{ track.artist }}</p>
        </div>

        <!-- Progress -->
        <div class="relative mt-5">
          <div class="group h-1.5 w-full cursor-pointer rounded-full bg-on-surface/20" @click="scrub">
            <div class="h-full rounded-full bg-on-surface" :style="{ width: `${progress}%` }" />
          </div>
          <div class="mt-2 flex justify-between text-label-lg tabular-nums text-on-surface-variant">
            <span>{{ format(currentTime) }}</span>
            <span>{{ format(duration) }}</span>
          </div>
        </div>

        <!-- Transport -->
        <div class="relative mt-4 flex items-center justify-center gap-8">
          <button
            type="button"
            class="cursor-pointer text-on-surface transition-transform hover:scale-110 active:scale-95"
            aria-label="Rewind"
            @click="seekBy(-10)"
          >
            <svg class="size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 6L4 12l7 6V6zm9 0l-7 6 7 6V6z" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-on-surface text-surface transition-transform hover:scale-105 active:scale-95"
            :aria-label="playing ? 'Pause' : 'Play'"
            @click="toggle"
          >
            <svg v-if="playing" class="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
            <svg v-else class="size-6 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            type="button"
            class="cursor-pointer text-on-surface transition-transform hover:scale-110 active:scale-95"
            aria-label="Forward"
            @click="seekBy(10)"
          >
            <svg class="size-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 6l7 6-7 6V6zM4 6l7 6-7 6V6z" />
            </svg>
          </button>
        </div>

        <audio
          ref="audio"
          :src="track.src"
          preload="metadata"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoaded"
          @play="onPlay"
          @pause="onPause"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.player-enter-active,
.player-leave-active {
  transition: opacity 0.3s ease;
}
.player-enter-from,
.player-leave-to {
  opacity: 0;
}
.player-enter-active > div,
.player-leave-active > div {
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}
.player-enter-from > div,
.player-leave-to > div {
  transform: scale(0.85);
  opacity: 0;
}
</style>

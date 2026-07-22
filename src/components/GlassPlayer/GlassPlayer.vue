<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";

export type Track = { title: string; artist: string; src: string; cover?: string };

type Props = { open: boolean; tracks: Track[]; label?: string };

const props = withDefaults(defineProps<Props>(), { label: "Play" });
const emit = defineEmits<{ open: []; close: [] }>();

const audio = ref<HTMLAudioElement | null>(null);
const wrapEl = ref<HTMLElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const trackIndex = ref(0);
/** Shell chrome (padding / radius) — lags behind `open` on close. */
const expanded = ref(false);
/** True while width/height are tweening — drops expensive filters. */
const morphing = ref(false);

const BUTTON_SIZE = 64;
const CLOSED_BOTTOM = 96;
const OPEN_BOTTOM = 140;
const OPEN_WIDTH = 256;
const OPEN_PADDING = 14.4; // bottom padding only when open
const MORPH_MS = 520;
/** Fallback — full-bleed cover + meta + progress + transport + bottom pad */
const OPEN_HEIGHT_FALLBACK = 480;

let morphTimer: ReturnType<typeof setTimeout> | null = null;

const track = computed((): Track => {
  return (
    props.tracks[trackIndex.value] ??
    props.tracks[0] ?? { title: "", artist: "", src: "" }
  );
});
const hasPlaylist = computed(() => props.tracks.length > 1);
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

const playCurrent = async () => {
  await nextTick();
  const el = audio.value;
  if (!el) return;
  el.currentTime = 0;
  currentTime.value = 0;
  duration.value = 0;
  try {
    await el.play();
  } catch {
    /* autoplay / jsdom may reject */
  }
};

const prevTrack = () => {
  if (!hasPlaylist.value) return;
  trackIndex.value = (trackIndex.value - 1 + props.tracks.length) % props.tracks.length;
};

const nextTrack = () => {
  if (!hasPlaylist.value) return;
  trackIndex.value = (trackIndex.value + 1) % props.tracks.length;
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
const onEnded = () => {
  if (hasPlaylist.value) nextTrack();
  else playing.value = false;
};

const onKey = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.open) emit("close");
};

const openPlayer = () => {
  if (!props.open) emit("open");
};

const applyBox = (width: number, height: number | "auto", bottom: number) => {
  const el = wrapEl.value;
  if (!el) return;
  el.style.width = `${width}px`;
  el.style.height = height === "auto" ? "auto" : `${height}px`;
  el.style.bottom = `${bottom}px`;
};

/**
 * Body keeps a fixed content width even while clipped by the circle,
 * so scrollHeight reflects the full player (cover + controls).
 */
const measureOpenHeight = () => {
  const body = bodyEl.value;
  if (!body) return OPEN_HEIGHT_FALLBACK;
  const measured = Math.ceil(body.scrollHeight + OPEN_PADDING);
  return measured > BUTTON_SIZE * 2 ? measured : OPEN_HEIGHT_FALLBACK;
};

const runMorph = (width: number, height: number, bottom: number) => {
  morphing.value = true;
  if (morphTimer) clearTimeout(morphTimer);
  requestAnimationFrame(() => {
    applyBox(width, height, bottom);
  });
  morphTimer = setTimeout(() => {
    morphing.value = false;
    morphTimer = null;
    // Settle to auto so nothing clips if fonts/layout shift
    if (props.open) applyBox(OPEN_WIDTH, "auto", OPEN_BOTTOM);
  }, MORPH_MS);
};

const morphToOpen = async () => {
  const height = measureOpenHeight();
  expanded.value = true;
  await nextTick();
  // Remeasure after padding/open chrome is applied
  const settled = measureOpenHeight();
  runMorph(OPEN_WIDTH, Math.max(height, settled), OPEN_BOTTOM);
};

const morphToClosed = async () => {
  const el = wrapEl.value;
  if (el && el.style.height === "auto") {
    applyBox(OPEN_WIDTH, Math.ceil(el.getBoundingClientRect().height), OPEN_BOTTOM);
    void el.offsetHeight;
  }
  runMorph(BUTTON_SIZE, BUTTON_SIZE, CLOSED_BOTTOM);
  await new Promise((r) => setTimeout(r, MORPH_MS));
  expanded.value = false;
};

watch(
  () => props.open,
  async (open) => {
    if (open) {
      await morphToOpen();
      nextTick(() => audio.value?.play().catch(() => {}));
    } else {
      audio.value?.pause();
      playing.value = false;
      await morphToClosed();
    }
  },
);

watch(trackIndex, () => {
  if (props.open) playCurrent();
  else {
    currentTime.value = 0;
    duration.value = 0;
    playing.value = false;
  }
});

onMounted(() => {
  window.addEventListener("keydown", onKey);
  if (props.open) {
    expanded.value = true;
    applyBox(OPEN_WIDTH, "auto", OPEN_BOTTOM);
  } else {
    applyBox(BUTTON_SIZE, BUTTON_SIZE, CLOSED_BOTTOM);
  }
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  if (morphTimer) clearTimeout(morphTimer);
});
</script>

<template>
  <Transition name="scrim">
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/30"
      aria-hidden="true"
      @click="emit('close')"
    />
  </Transition>

  <div
    ref="wrapEl"
    class="glass-wrap fixed right-[5vw] z-50"
    :class="{ 'is-open': expanded, 'is-morphing': morphing }"
  >
    <div
      class="glass-card"
      :role="open ? 'dialog' : undefined"
      :aria-modal="open ? 'true' : undefined"
    >
      <span class="glass-sheen" aria-hidden="true" />

      <button
        type="button"
        class="play-hit"
        :class="{ 'is-hidden': expanded }"
        :aria-label="label"
        :tabindex="open ? -1 : 0"
        :aria-hidden="open"
        @click="openPlayer"
      >
        <svg class="play-glyph" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <div
        ref="bodyEl"
        class="player-body"
        :class="{ 'is-visible': open }"
        :aria-hidden="!open"
      >
        <!-- Cover full-bleed to the card edge — no frosted white frame around the art -->
        <div class="cover">
          <img
            v-if="track.cover"
            :src="track.cover"
            :alt="track.title"
            class="cover-img"
          />
          <div v-else class="cover-fallback" aria-hidden="true">
            <svg class="size-11 text-on-surface/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 17V5l10-2v12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="7" cy="17" r="2.2" />
              <circle cx="17" cy="15" r="2.2" />
            </svg>
          </div>

          <button
            type="button"
            class="close-btn"
            aria-label="Close"
            :tabindex="open ? 0 : -1"
            @click="emit('close')"
          >
            <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="player-meta">
          <h3 class="truncate text-[0.95rem] font-medium leading-snug text-on-surface">{{ track.title }}</h3>
          <p class="mt-0.5 truncate text-[0.7rem] font-medium uppercase tracking-[0.12em] text-on-surface-variant">
            {{ track.artist }}
          </p>
        </div>

        <div class="player-progress">
          <div class="h-1 w-full cursor-pointer rounded-full bg-on-surface/20" @click="scrub">
            <div class="h-full rounded-full bg-on-surface" :style="{ width: `${progress}%` }" />
          </div>
          <div class="mt-1.5 flex justify-between text-[0.65rem] tabular-nums text-on-surface-variant">
            <span>{{ format(currentTime) }}</span>
            <span>{{ format(duration) }}</span>
          </div>
        </div>

        <div class="player-transport">
          <button
            type="button"
            class="cursor-pointer text-on-surface transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
            aria-label="Previous track"
            :disabled="!hasPlaylist"
            :tabindex="open ? 0 : -1"
            @click="prevTrack"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 6L4 12l7 6V6zm9 0l-7 6 7 6V6z" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-on-surface text-surface transition-transform hover:scale-105 active:scale-95"
            :aria-label="playing ? 'Pause' : 'Play'"
            :tabindex="open ? 0 : -1"
            @click="toggle"
          >
            <svg v-if="playing" class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
            <svg v-else class="size-5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            type="button"
            class="cursor-pointer text-on-surface transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
            aria-label="Next track"
            :disabled="!hasPlaylist"
            :tabindex="open ? 0 : -1"
            @click="nextTrack"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
          @ended="onEnded"
        />
      </div>
    </div>

    <div class="glass-shadow" aria-hidden="true" />
  </div>
</template>

<style scoped>
@property --angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}

@property --angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

.glass-wrap {
  --t: 520ms;
  --hover-t: 400ms;
  --e: cubic-bezier(0.22, 1, 0.36, 1);
  --hover-e: cubic-bezier(0.25, 1, 0.5, 1);
  --border-width: clamp(1px, 0.0625em, 4px);
  --size: 4rem;
  --radius-closed: 999vw;
  --radius-open: 1.75rem;
  width: var(--size);
  height: var(--size);
  max-width: calc(100vw - 10vw);
  border-radius: var(--radius-closed);
  background: transparent;
  font-size: 1rem;
  transform-origin: bottom right;
  transition:
    width var(--t) var(--e),
    height var(--t) var(--e),
    bottom var(--t) var(--e),
    border-radius var(--t) var(--e),
    transform var(--hover-t) var(--hover-e);
}

.glass-wrap.is-open {
  border-radius: var(--radius-open);
}

/* Closed play-button hover — liquid glass press + sheen (matches reference) */
.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:hover) .glass-card {
  transform: scale(0.975);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.55),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 0.125em 0.125em rgba(0, 0, 0, 0.04),
    inset 0 -0.125em 0.2em rgba(255, 255, 255, 0.45),
    inset 0 0 0.1em 0.15em rgba(255, 255, 255, 0.28),
    0 0.2em 0.5em -0.1em rgba(0, 0, 0, 0.3),
    0 0.75em 1.5em -0.4em rgba(0, 0, 0, 0.35);
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:hover) .glass-card::after {
  --angle-1: -125deg;
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:hover) .glass-sheen {
  background-position: 25% 50%;
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:hover) .glass-shadow {
  filter: blur(clamp(2px, 0.0625em, 6px));
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:active) {
  transform: rotate3d(1, 0, 0, 18deg);
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:active) .glass-card {
  transform: scale(0.96);
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:active) .glass-card::after {
  --angle-1: -75deg;
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:active) .glass-sheen {
  background-position: 50% 15%;
  --angle-2: -15deg;
}

@media (hover: none) and (pointer: coarse) {
  .glass-wrap:not(.is-open) .glass-card::after,
  .glass-wrap:not(.is-open):has(.play-hit:active) .glass-card::after {
    --angle-1: -75deg;
  }
  .glass-wrap:not(.is-open) .glass-sheen,
  .glass-wrap:not(.is-open):has(.play-hit:active) .glass-sheen {
    --angle-2: -45deg;
  }
}

/*
 * Apple-like liquid glass:
 * — real frosted blur + saturate (reads the scene behind)
 * — layered translucent fill (not a flat tint)
 * — specular top highlight (::before)
 * — refracting rim with dark conic + luminous underlay (::after)
 * — soft floating shadow sibling
 */
.glass-card {
  position: relative;
  z-index: 3;
  isolation: isolate;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: var(--size);
  padding: 0;
  overflow: hidden;
  border-radius: inherit;
  background:
    linear-gradient(
      155deg,
      rgba(255, 255, 255, 0.28) 0%,
      rgba(255, 255, 255, 0.08) 42%,
      rgba(255, 255, 255, 0.04) 100%
    ),
    linear-gradient(
      -75deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.05)
    );
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.55),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 0.125em 0.125em rgba(0, 0, 0, 0.04),
    inset 0 -0.125em 0.2em rgba(255, 255, 255, 0.35),
    inset 0 0 0.15em 0.2em rgba(255, 255, 255, 0.12),
    0 0.35em 0.85em -0.15em rgba(0, 0, 0, 0.35),
    0 1.25em 2.5em -0.5em rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(28px) saturate(165%);
  -webkit-backdrop-filter: blur(28px) saturate(165%);
  transition:
    padding calc(var(--t) * 0.75) var(--e),
    transform var(--hover-t) var(--hover-e),
    box-shadow var(--hover-t) var(--hover-e);
}

/* While morphing, keep a solid frosted stand-in (blur mid-resize is janky) */
.is-morphing .glass-card {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background: rgba(255, 255, 255, 0.16);
}

.is-open .glass-card {
  /* Cover goes edge-to-edge; only the controls zone is padded */
  padding: 0 0 0.9rem;
}

/* Specular crown — keep it soft so it doesn't read as a white frame */
.glass-card::before {
  content: "";
  position: absolute;
  z-index: 2;
  left: 10%;
  right: 10%;
  top: 0;
  height: 28%;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.28) 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  mix-blend-mode: soft-light;
  opacity: 0.7;
}

.is-open .glass-card::before {
  /* Hide over the artwork — only the chrome below needs glass sheen */
  opacity: 0;
}

/* Refracting rim — reference button::after (dark conic + white underlay) */
.glass-card::after {
  content: "";
  position: absolute;
  z-index: 3;
  box-sizing: border-box;
  border-radius: inherit;
  width: calc(100% + var(--border-width));
  height: calc(100% + var(--border-width));
  top: calc(0% - var(--border-width) / 2);
  left: calc(0% - var(--border-width) / 2);
  padding: var(--border-width);
  background:
    conic-gradient(
      from var(--angle-1) at 50% 50%,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0) 5% 40%,
      rgba(0, 0, 0, 0.45) 50%,
      rgba(0, 0, 0, 0) 60% 95%,
      rgba(0, 0, 0, 0.45)
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.65),
      rgba(255, 255, 255, 0.25) 45%,
      rgba(255, 255, 255, 0.45)
    );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  box-shadow: inset 0 0 0 calc(var(--border-width) / 2) rgba(255, 255, 255, 0.55);
  pointer-events: none;
  transition:
    --angle-1 500ms ease,
    background var(--hover-t) var(--hover-e);
}

/* Diagonal liquid sheen sweep */
.glass-sheen {
  position: absolute;
  z-index: 2;
  inset: var(--border-width);
  border-radius: inherit;
  overflow: clip;
  background: linear-gradient(
    var(--angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  background-size: 220% 220%;
  background-position: 0% 50%;
  background-repeat: no-repeat;
  mix-blend-mode: screen;
  opacity: 0.85;
  pointer-events: none;
  transition:
    background-position calc(var(--hover-t) * 1.25) var(--hover-e),
    --angle-2 calc(var(--hover-t) * 1.25) var(--hover-e),
    opacity 200ms ease;
}

.is-open .glass-sheen {
  opacity: 0;
}

.play-hit {
  all: unset;
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  opacity: 1;
  transition: opacity 140ms ease;
}

.play-hit.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.play-glyph {
  width: 1.4rem;
  height: 1.4rem;
  transform: translateX(1px);
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  transition:
    transform 180ms var(--e),
    opacity 140ms ease;
}

.play-hit.is-hidden .play-glyph {
  transform: translateX(1px) scale(0.5);
  opacity: 0;
}

.glass-wrap:not(.is-open):not(.is-morphing):has(.play-hit:hover) .play-glyph {
  transform: translateX(1px) scale(1.08);
}

.player-body {
  position: relative;
  z-index: 4;
  width: 16rem;
  flex-shrink: 0;
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
  transition:
    opacity 240ms ease,
    transform 420ms var(--e);
}

.player-body.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  transition-delay: 80ms;
}

.cover {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  background: #0a0a0a;
  /* Match the open card top corners so no glass peeks as a white frame */
  border-radius: var(--radius-open) var(--radius-open) 0 0;
}

.cover-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Crop the 1px white scan edge some JPEGs carry */
  transform: scale(1.03);
  transform-origin: center;
}

.cover-fallback {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
}

.close-btn {
  all: unset;
  box-sizing: border-box;
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999vw;
  cursor: pointer;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 160ms ease,
    background 160ms ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.72);
  transform: scale(1.06);
}

.close-btn:active {
  transform: scale(0.96);
}

.player-meta,
.player-progress,
.player-transport {
  padding-inline: 0.9rem;
}

.player-meta {
  margin-top: 0.9rem;
}

.player-progress {
  margin-top: 0.85rem;
}

.player-transport {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

/* Soft drop — PlayButton-style blob, circular when closed */
.glass-shadow {
  --cut: 1.5em;
  position: absolute;
  z-index: 0;
  width: calc(100% + var(--cut));
  height: calc(100% + var(--cut));
  top: calc(-1 * var(--cut) / 2);
  left: calc(-1 * var(--cut) / 2);
  border-radius: inherit;
  filter: blur(clamp(2px, 0.125em, 12px));
  pointer-events: none;
  opacity: 1;
  transition:
    opacity 160ms ease,
    filter var(--hover-t) var(--hover-e);
}

.glass-shadow::after {
  content: "";
  position: absolute;
  border-radius: 999vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.12));
  width: calc(100% - var(--cut) - 0.25em);
  height: calc(100% - var(--cut) - 0.25em);
  top: calc(var(--cut) - 0.5em);
  left: calc(var(--cut) - 0.5em);
  transition: border-radius var(--t) var(--e);
}

.is-open .glass-shadow::after {
  border-radius: 1.75rem;
}

.is-morphing .glass-shadow {
  opacity: 0;
}

.scrim-enter-active,
.scrim-leave-active {
  transition: opacity 280ms ease;
}
.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}
</style>

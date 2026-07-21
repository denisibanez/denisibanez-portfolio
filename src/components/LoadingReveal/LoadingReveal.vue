<script setup lang="ts">
import { ref } from 'vue'
import bannerHome from '@/assets/images/banner-home-full.png'

type Props = { label?: string; hint?: string }

withDefaults(defineProps<Props>(), {
  label: 'Loading',
  hint: 'Move your cursor to reveal',
})

const SIZE = 220
const HALF = SIZE / 2
const RADIUS = 40
const OFFSCREEN = -9999
const HIDDEN_CLIP = `inset(50% 50% 50% 50% round ${RADIUS}px)`

// Cursor-follow state (bound as inline clip-path/transform — must be dynamic).
const sharpStyle = ref<Record<string, string>>({ clipPath: HIDDEN_CLIP })
const ringStyle = ref<Record<string, string>>({ transform: `translate(${OFFSCREEN}px, ${OFFSCREEN}px)` })

const onMove = (event: PointerEvent) => {
  const { clientX: x, clientY: y } = event
  // Reveal a rounded square (the ring itself) — no inner circle.
  sharpStyle.value = {
    clipPath: `inset(${y - HALF}px calc(100% - ${x + HALF}px) calc(100% - ${y + HALF}px) ${x - HALF}px round ${RADIUS}px)`,
  }
  ringStyle.value = { transform: `translate(${x - HALF}px, ${y - HALF}px)` }
}

const onLeave = () => {
  sharpStyle.value = { clipPath: HIDDEN_CLIP }
  ringStyle.value = { transform: `translate(${OFFSCREEN}px, ${OFFSCREEN}px)` }
}
</script>

<template>
  <div class="stage" role="status" aria-live="polite" :aria-label="label" @pointermove="onMove" @pointerleave="onLeave">
    <img class="img img--blur" :src="bannerHome" alt="" />
    <img class="img img--sharp" :src="bannerHome" alt="" :style="sharpStyle" />

    <div class="sheen" aria-hidden="true" />
    <div class="glass-ring" :style="ringStyle" aria-hidden="true" />

    <div class="center-loader">
      <span class="loading-word text-headline-md md:text-headline-lg">{{ label }}</span>
      <div class="dots"><span /><span /><span /></div>
    </div>

    <div class="hint">{{ hint }}</div>
  </div>
</template>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  background: #111;
  cursor: none;
  font-family: 'Poppins', system-ui, sans-serif;
}
.img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Mobile: keep the person centred */
  object-position: 50% 20%;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}
@media (min-width: 768px) {
  .img {
    object-position: 60% 20%;
  }
}
.img--blur {
  z-index: 1;
  filter: blur(26px) saturate(1.35) brightness(0.97);
  transform: scale(1.1);
}
.img--sharp {
  z-index: 2;
  filter: saturate(1.08) contrast(1.03);
  will-change: clip-path;
}
.sheen {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0) 60%);
}
/* Rounded-square glass frame around the revealed area (no inner circle) */
.glass-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  z-index: 4;
  pointer-events: none;
  border-radius: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
}
.glass-ring::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.55), inset -2px -2px 6px rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 40%);
}
.center-loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  pointer-events: none;
}
.loading-word {
  /* Size/weight come from the design-system headline utilities (matches the home title); Poppins inherited from .stage. */
  color: #fff;
  opacity: 0.95;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}
.dots {
  display: flex;
  gap: 8px;
}
.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  animation: bounce 1.1s infinite ease-in-out;
}
.dots span:nth-child(2) {
  animation-delay: 0.15s;
}
.dots span:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.55;
  }
  30% {
    transform: translateY(-9px);
    opacity: 1;
  }
}
.hint {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  color: rgba(255, 255, 255, 0.65);
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  pointer-events: none;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  animation: fade-pulse 2.4s infinite ease-in-out;
}
@keyframes fade-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.85;
  }
}
</style>

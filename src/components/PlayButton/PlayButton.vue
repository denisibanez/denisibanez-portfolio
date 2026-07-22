<script setup lang="ts">
type Props = { label?: string }

withDefaults(defineProps<Props>(), { label: "Play" })

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <div class="lg-wrap">
    <button class="lg-btn" :aria-label="label" @click="emit('click')">
      <span class="lg-sheen" aria-hidden="true" />
      <svg class="lg-glyph" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
    <div class="lg-shadow" aria-hidden="true" />
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

.lg-wrap {
  --t: 400ms;
  --e: cubic-bezier(0.25, 1, 0.5, 1);
  --size: 4rem;
  --bw: clamp(1px, 0.0625em, 4px);
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 999vw;
  transition: transform var(--t) var(--e);
}

.lg-btn {
  all: unset;
  box-sizing: border-box;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  border-radius: 999vw;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.06)
  );
  box-shadow:
    inset 0 0.125em 0.125em rgba(0, 0, 0, 0.05),
    inset 0 -0.125em 0.125em rgba(255, 255, 255, 0.5),
    0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.2),
    0 0 0.1em 0.25em inset rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  transition:
    transform var(--t) var(--e),
    box-shadow var(--t) var(--e);
}

.lg-btn:hover {
  transform: scale(0.975);
}

.lg-glyph {
  position: relative;
  z-index: 4;
  width: 1.4rem;
  height: 1.4rem;
  transform: translateX(1px);
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
}

/* Conic outline (the refracting rim) */
.lg-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999vw;
  padding: var(--bw);
  background:
    conic-gradient(
      from var(--angle-1) at 50% 50%,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0) 5% 40%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 60% 95%,
      rgba(255, 255, 255, 0.6)
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  box-shadow: inset 0 0 0 calc(var(--bw) / 2) rgba(255, 255, 255, 0.5);
  transition: --angle-1 500ms ease;
  pointer-events: none;
}

.lg-btn:hover::after {
  --angle-1: -125deg;
}
.lg-btn:active::after {
  --angle-1: -75deg;
}

/* Sheen sweep */
.lg-sheen {
  position: absolute;
  inset: var(--bw);
  z-index: 3;
  border-radius: 999vw;
  background: linear-gradient(
    var(--angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  background-size: 200% 200%;
  background-position: 0% 50%;
  background-repeat: no-repeat;
  mix-blend-mode: screen;
  pointer-events: none;
  transition:
    background-position calc(var(--t) * 1.25) var(--e),
    --angle-2 calc(var(--t) * 1.25) var(--e);
}

.lg-btn:hover .lg-sheen {
  background-position: 25% 50%;
}
.lg-btn:active .lg-sheen {
  background-position: 50% 15%;
  --angle-2: -15deg;
}

/* Soft drop shadow */
.lg-shadow {
  --cut: 1.5em;
  position: absolute;
  z-index: 1;
  width: calc(100% + var(--cut));
  height: calc(100% + var(--cut));
  top: calc(-1 * var(--cut) / 2);
  left: calc(-1 * var(--cut) / 2);
  filter: blur(clamp(2px, 0.125em, 12px));
  pointer-events: none;
}
.lg-shadow::after {
  content: "";
  position: absolute;
  border-radius: 999vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.1));
  width: calc(100% - var(--cut) - 0.25em);
  height: calc(100% - var(--cut) - 0.25em);
  top: calc(var(--cut) - 0.5em);
  left: calc(var(--cut) - 0.5em);
}

.lg-wrap:has(.lg-btn:active) {
  transform: rotate3d(1, 0, 0, 25deg);
}

@media (hover: none) and (pointer: coarse) {
  .lg-btn::after,
  .lg-btn:active::after {
    --angle-1: -75deg;
  }
  .lg-sheen,
  .lg-btn:active .lg-sheen {
    --angle-2: -45deg;
  }
}
</style>

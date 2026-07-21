---
name: new-component
description: Scaffold UI in the Denis Ibañez portfolio — a Vue 3 + TypeScript component (or view/layout/store/composable) that follows the Ethereal Precision design system, styled only with Tailwind design tokens, plus a Storybook story, a Vitest unit test, and a Playwright e2e when it has a user-facing flow. Use whenever creating any new component, view, layout, store, or composable in this project.
---

# New component (Ethereal Precision)

Follow this every time you create UI or logic in this project. Read `DESIGN-SYSTEM.md` first.

## Non-negotiables

- **Vue 3 + TypeScript**, always `<script setup lang="ts">`.
- **Style only with Tailwind utilities backed by the design tokens** (`bg-surface`, `text-on-surface`, `text-headline-lg`, `border-outline`, `font-sans`, …). **Never** hardcode hex values or arbitrary `[...]` values when a token exists. Roundness stays `rounded-none`→`rounded-sm`; spacing on the 8px grid.
- **Agnostic, reusable components**: drive everything through typed `props`/`emits`/`slots`. No page-specific data, no fetching inside presentational components. A component knows the design system, not the page.
- **`const` + arrow functions only** — every function (handlers, helpers, composables) is `const fn = (...) => ...`. No `function` declarations.
- **No nested `if`s** — use early-return guard clauses, ternaries for simple cases, or a lookup map/record for multi-branch logic.
- **Clean code / no smells**: small single-purpose units, meaningful names, no dead code, no `any`, no `console.*`, no duplication (extract a composable/util).

## Routing

- Use **vue-router with nested routes**. Every area is a parent route whose `component` is a **layout** (`src/layouts/*Layout.vue`) with an inner `<RouterView />`; pages are its `children`. Never render page chrome inside a page — it belongs to the layout.

## Responsiveness (required)

Every component and layout **must be responsive**, authored **mobile-first** (base = mobile, scale up). A component without responsive handling is incomplete.

- Breakpoints (Tailwind): base = **mobile** (<640), `sm:` 640, **`md:` 768 = tablet**, **`lg:` 1024 = desktop**.
- Fluid horizontal padding `px-[5vw]` (or container padding) — never fixed side margins.
- **Navigation collapses below `md:`**: inline links on desktop; hamburger toggle + drawer/overlay on tablet/mobile. Open state via `ref` + `const` arrow handlers.
- **Touch targets ≥ 44px** on mobile (`min-h-11`).
- Type scales down on small screens (`text-headline-md md:text-headline-lg`, or `clamp()`).
- Grids reflow (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) — never overflow on mobile.
- Check each story at mobile / tablet / desktop widths; e2e should assert the mobile menu behaviour.
- If a tablet/mobile reference is missing, ask for it before guessing the collapse/stack behaviour.

## Animation (motion-v)

Use **`motion-v`** for motion — never hand-rolled timers or CSS keyframes for entrance/interaction.

- Import the `<Motion>` component: `import { Motion } from 'motion-v'`. Render as another tag with `as` (`<Motion as="h1" …>`).
- Entrance: `:initial` → `:animate` with a `:transition`; stagger sibling elements with an increasing `delay` (extract a `const rise = (delay) => ({ initial, animate, transition })` helper and `v-bind` it — no repetition).
- Scroll reveals: use `:in-view` / `while-in-view` instead of firing on mount.
- Keep it **subtle and fast** (200–600ms, `easeOut`). Motion supports light/tasteful, not flashy.
- Respect reduced motion: gate non-essential animation behind `usePreferredReducedMotion()` (@vueuse/core) or keep offsets tiny.

## What to generate per unit

For a **component** `src/components/<Name>/<Name>.vue`, also create:
1. `src/components/<Name>/<Name>.stories.ts` — Storybook (`@storybook/vue3-vite`): a `Default` story + one per meaningful variant/state; wire `args`/`argTypes` for props.
2. `src/components/<Name>/<Name>.spec.ts` — Vitest + `@vue/test-utils`: render, props/variants, emitted events, edge cases.
3. **Playwright e2e** in `e2e/` — only when the unit adds a user-facing flow (navigation, form, interaction across the page). Skip for purely presentational atoms.

Create **stores** (`src/stores/<name>.ts`, Pinia `defineStore`, setup style) and **composables** (`src/composables/use<Name>.ts`) whenever there is shared state or reusable logic — keep it out of components.

## Conventions

- Folders: `components/` (agnostic UI), `views/` (routed pages), `layouts/`, `stores/`, `composables/`, `services/` (axios via `@/services/http`), `i18n/`, `types/`.
- User-facing copy goes through **vue-i18n** (`useI18n`), never hardcoded strings.
- Import alias `@/` → `src/`.
- Props typed with `defineProps<Props>()`; prefer `type` over `interface`.

## Skeleton to follow

```vue
<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'ghost'
type Props = { label: string; variant?: Variant; disabled?: boolean }

const props = withDefaults(defineProps<Props>(), { variant: 'primary', disabled: false })
const emit = defineEmits<{ click: [] }>()

// lookup map instead of nested ifs
const variantClass: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary',
  ghost: 'border border-outline text-on-surface',
}

const classes = computed(() => variantClass[props.variant])
const onClick = () => {
  if (props.disabled) return // guard clause, no nesting
  emit('click')
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="['text-label-lg uppercase rounded-sm px-4 py-2 transition-colors', classes]"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>
```

## Before finishing

Run `pnpm type-check`, `pnpm lint`, `pnpm test:unit`, and (if an e2e was added) `pnpm test:e2e`. Everything must pass.

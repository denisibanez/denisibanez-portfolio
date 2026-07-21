# Denis Ibañez — Portfolio

Personal portfolio of Denis Ibañez (front-end developer), built as a modern, fully-typed
single-page app. Dark, minimalist design ("Ethereal Precision"), Poppins typography, a
cinematic hero (background video that cross-fades into a still banner), an interactive
"liquid glass" loading reveal, and full internationalization.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **Vue 3** (`<script setup>`, Composition API) |
| Language | **TypeScript** (strict) |
| Build | **Vite** |
| Routing | **vue-router** — nested routes under layouts |
| State | **Pinia** |
| i18n | **vue-i18n** — EN · PT · ES · DE · FR · JA |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`, design tokens via `@theme`) |
| HTTP | **axios** (shared instance in `services/http.ts`) |
| Animation | **motion-v** (Motion for Vue) |
| Component workshop | **Storybook** (`@storybook/vue3-vite`) |
| Unit tests | **Vitest** + `@vue/test-utils` |
| E2E | **Playwright** |
| Quality | **ESLint** (flat) + **oxlint**, **Prettier**, **Husky** pre-commit |
| Package manager | **pnpm** |

---

## Design system — Ethereal Precision

Dark, geometric, high-contrast. All colours, typography, radii and spacing are exposed as
**Tailwind tokens** via `@theme` in `src/assets/main.css`, so components use utilities
(`bg-surface`, `text-on-surface`, `text-headline-lg`, `border-outline`) — never hardcoded hex.
See [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) for the full token reference.

- **Palette:** `surface` `#131313`, `on-surface` `#e2e2e2`, `primary` `#ffffff`, `outline` `#919191`, plus surface-container tiers.
- **Type:** Poppins — `headline-lg/md`, `body-lg`, `label-lg`.
- **Shape/spacing:** `rounded-none`→`rounded-sm`, 8px grid, `5vw` side padding.

---

## Project structure

```
src/
  assets/          Tailwind entry + design tokens (@theme), images, video
  components/      agnostic, design-system-driven UI (+ .stories.ts + .spec.ts each)
    AppNav/          responsive nav (inline desktop, grid-icon drawer on mobile)
    BaseButton/      primary / outline variants
    LanguageSelect/  6-language flag dropdown (liquid-glass panel)
    LoadingReveal/   cursor-reveal "liquid glass" loading screen
  composables/     reusable logic (useInitialLoad)
  i18n/            vue-i18n setup + locales (en, pt, es, de, fr, ja)
  layouts/         route layouts (DefaultLayout: nav + footer chrome)
  router/          nested routes
  services/        axios instance (http.ts)
  stores/          Pinia stores
  views/           routed pages (HomeView)
e2e/               Playwright specs
.storybook/        Storybook config
.claude/skills/    "new-component" skill (see below)
```

---

## Key features

- **Hero (`HomeView`)** — a background **video** (`assets/video`) autoplays on load, then
  **cross-fades to the still banner** when it ends. The banner is always painted underneath,
  so the swap never flickers; the video only appears once it can play (no black frame).
- **Loading screen (`LoadingReveal`)** — shown on boot via `useInitialLoad` until the hero
  image is ready (+ a minimum display time), then fades out. A frosted **glass ring follows
  the cursor**, revealing the sharp banner over a blurred backdrop.
- **Language select** — 6 locales with flags; switches `vue-i18n` locale live.
- **Responsive** — mobile-first; navigation collapses to a drawer below `md`.
- **i18n** — all copy runs through `vue-i18n`.

---

## Scripts

```bash
pnpm dev            # dev server (Vite)
pnpm build          # type-check + production build
pnpm preview        # preview the production build
pnpm test:unit      # Vitest (jsdom + Storybook browser project)
pnpm test:e2e       # Playwright
pnpm storybook      # Storybook at :6006
pnpm build-storybook
pnpm lint           # oxlint + eslint (--fix)
pnpm format         # Prettier
```

---

## Building UI — the `new-component` skill

`.claude/skills/new-component` encodes this project's conventions so new UI is generated
consistently. It enforces:

- Vue 3 + TS, **Tailwind design tokens only** (no hardcoded hex), agnostic/reusable components.
- **`const` arrow functions** everywhere; **no nested `if`s** (guard clauses / lookup maps).
- **Mobile-first responsiveness** (breakpoints, collapsing nav, ≥44px touch targets).
- **vue-router nested routes + layouts**.
- **motion-v** for animation (subtle, reduced-motion aware).
- For each component: a **Storybook story**, a **Vitest unit test**, and a **Playwright e2e**
  when there's a user-facing flow. Stores/composables when logic is shared.

---

## Quality

- `type-check` (vue-tsc), `lint` (oxlint + eslint), and unit tests run clean.
- **Husky** `pre-commit` runs `lint:eslint` + `type-check`.
- Every component ships with a story and unit test; interactive components add e2e where relevant.

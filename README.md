# Denis Ibañez — Portfolio

<img width="1920" height="962" alt="Captura de Tela 2026-07-21 às 21 58 38" src="https://github.com/user-attachments/assets/4ad7e1c5-c266-47dd-b323-423eed006519" />

Personal portfolio of Denis Ibañez (front-end developer), built as a modern, fully-typed
single-page app. Dark, minimalist design ("Ethereal Precision"), Poppins typography, a
cinematic hero (background video that cross-fades into a still banner), an interactive
"liquid glass" loading reveal, and full internationalization.

LINK [https://denisibanez.dev/]: https://denisibanez.dev/

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

- **Palette:** `surface` `#131313`, `on-surface` `#e2e2e2`, `primary` `#ffffff`, `outline` `#919191`, plus surface-container tiers. A `tertiary` gold (`#e9c349`) is used sparingly as an editorial accent.
- **Type:** **Poppins** everywhere (`headline-lg/md`, `body-lg`, `label-lg`). A **Playfair Display** serif token (`font-serif`) is reserved for a couple of editorial display values on the project pages.
- **Shape/spacing:** `rounded-none`→`rounded-sm`, 8px grid, `5vw` side padding.

---

## Project structure

```
src/
  assets/          Tailwind entry + design tokens (@theme), images, video, mp3
  components/      agnostic, design-system-driven UI (+ .stories.ts + .spec.ts each)
    AppNav/          responsive nav (inline desktop, grid-icon drawer on mobile)
    BaseButton/      primary / outline variants
    BaseCarousel/    generic, slot-driven Netflix-style carousel (Projects + Testimonials)
    GlassPlayer/     morphing "liquid glass" audio player with playlist
    LanguageSelect/  6-language flag dropdown (liquid-glass panel)
    LoadingReveal/   cursor-reveal "liquid glass" loading screen
    PlayButton/      animated round play trigger
    <Name>.types.ts  co-located types when they're component-only (e.g. NavLink)
  composables/     reusable logic (useInitialLoad, useProjects, useRise)
  utils/           pure helpers (getInitials)
  types/           SHARED domain types (project.ts, track.ts)
  config/          site-wide constants (site.ts: identity, socials)
  i18n/            vue-i18n setup + locales (en, pt, es, de, fr, ja)
  layouts/         route layouts (DefaultLayout: nav + footer chrome)
  router/          nested routes
  services/        axios instance (http.ts)
  stores/          Pinia stores
  views/           routed pages — Home, About, Projects, ProjectDetail,
                   ProjectSpecs, Testimonials, NotFound (+ .stories/.spec each)
e2e/               Playwright specs
.storybook/        Storybook config
.claude/skills/    project skills (new-component, open-pr, deploy, …)
```

**Types convention:** component/page-only types live in a co-located `*.types.ts`
next to the component; types shared across the app live in `src/types/`.

---

## Key features

- **Hero (`HomeView`)** — a background **video** (`assets/video`) autoplays on load, then
  **cross-fades to the still banner** when it ends. The banner is always painted underneath,
  so the swap never flickers; the video only appears once it can play (no black frame).
- **Loading screen (`LoadingReveal`)** — shown on boot via `useInitialLoad` until the hero
  image is ready (+ a minimum display time), then fades out. A frosted **glass ring follows
  the cursor**, revealing the sharp banner over a blurred backdrop.
- **Projects (`ProjectsView`)** — a **Netflix-style horizontal carousel** (`BaseCarousel`)
  of poster cards, with prev/next + mobile dashes that auto-hide when the cards fit, and a
  hover "dim the siblings" cue. Clicking a card opens the project.
- **Project detail (`ProjectDetailView`)** — case-study page with an image gallery
  (dots + drag/swipe), a lightbox, prev/next project navigation and a scroll-progress bar.
  Its "View details" action drills into…
- **Project specs (`ProjectSpecsView`)** — a project-specification sheet: a scrollable
  narrative (with its own scroll-progress bar) beside metadata panels (industry, timeline,
  tech stack, role & collaborators). Project data is shared via the `useProjects` composable.
- **Testimonials** — reuses `BaseCarousel` (photo + quote cards) with a detail modal.
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

## Deployment

- **App** — hosted on **Vercel**, auto-deployed from `main` (production) and PRs (previews).
  Live at [denisibanez.dev](https://denisibanez.dev). SPA routing via `vercel.json` rewrites.
- **Design system (Storybook)** — published as a **separate Vercel project** at
  **[design.denisibanez.dev](https://design.denisibanez.dev)**. It is deployed as a prebuilt
  static folder (`storybook-static`) so the app's SPA rewrite doesn't apply. A GitHub Action
  (`.github/workflows/publish-storybook.yml`) rebuilds and republishes it on every push to
  `main`. It needs three repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
  (the design-system project). Manual publish: `pnpm build-storybook && cd storybook-static && pnpm dlx vercel --prod`.

---

## Quality

- `type-check` (vue-tsc), `lint` (oxlint + eslint), and unit tests run clean.
- **Husky** `pre-commit` runs `lint:eslint` + `type-check`.
- Every component ships with a story and unit test; interactive components add e2e where relevant.

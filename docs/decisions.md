# Decisions

Short rationale for the choices that shape the codebase (ADR-lite).

### 1. Design system first — "Ethereal Precision", tokens only
Dark, geometric, high-contrast. All colour/type/space live as Tailwind `@theme` tokens so
components use utilities and stay consistent. Published as its own Storybook site
(design.denisibanez.dev). **Why:** one source of truth; no drifting hex values.

### 2. Poppins everywhere; serif + gold reserved for emphasis
The whole site is Poppins + greyscale. A **Playfair** serif token and a **gold `tertiary`** accent
exist but are used sparingly — the case-study eyebrow and the active tab. **Why:** a restrained
accent reads as intentional; overusing it would cheapen it.

### 3. Static now, data-driven later — Pinia & axios scaffolded
Content lives in composables/data; `stores/counter.ts` and `services/http.ts` are unused
scaffolding kept as the pattern. **Why:** ship a fast static site now; when projects/testimonials/
blog come from endpoints, fetch via `services/http` into Pinia without changing component APIs.

### 4. Two Vercel projects — app vs design system
The app (`denisibanez.dev`) auto-deploys via Vercel's Git integration. Storybook
(`design.denisibanez.dev`) is a separate project published by a GitHub Action from the prebuilt
`storybook-static` folder. **Why:** the app's `vercel.json` SPA rewrite breaks static Storybook,
and deploying from inside the repo targets the app project. Keep them independent.

### 5. Projects model — status, kind, dates
Projects carry `status` (published/draft — drafts hidden and 404), `kind` (study/client — drives
filter tabs and the study-only "View on GitHub" action), and `startDate`/`endDate` (`YYYY-MM`,
drive newest-first ordering and the derived timeline). **Why:** editorial control + real ordering
without a CMS yet.

### 6. Reusable primitives over per-page markup
`BaseCarousel`, `BaseTabs`, `MediaBackdrop` and the composables (`useRise`, `useProjectRoute`,
`useAudioPlayer`) replace copy-pasted markup/logic. **Why:** one place to fix and test; pages stay thin.

### 7. Full coverage per unit + i18n for all copy
Every unit has a story + spec; flows have e2e; every string is translated to six locales.
**Why:** confidence to refactor, and a genuinely international portfolio.

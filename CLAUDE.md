# CLAUDE.md

Guidance for Claude Code working in this repo. Read [`README.md`](./README.md) for the
full stack/feature tour; this file captures conventions and the non-obvious gotchas.

## What this is

Denis Ibañez's personal portfolio — a Vue 3 + TypeScript + Vite SPA, dark "Ethereal
Precision" design system, Tailwind v4 tokens, vue-i18n (6 locales), motion-v animation.
Fully typed, fully tested, Storybook-documented.

## Conventions (must follow)

The project skill **`new-component`** (`.claude/skills/new-component`) is the source of
truth — read it before creating any UI. In short:

- **Vue 3 `<script setup lang="ts">`**, `const` arrow functions only (no `function`), no
  nested `if`s (guard clauses / lookup maps), no `any`, no `console.*`.
- **Style only with Tailwind design tokens** (`bg-surface`, `text-headline-lg`, …) defined
  via `@theme` in `src/assets/main.css`. Never hardcode hex or arbitrary values when a token
  exists. `rounded-none`→`rounded-sm`, 8px grid, `px-[5vw]` side padding.
- **Mobile-first responsive**; nav collapses to a drawer below `md`.
- **Animation** via `motion-v` (`<Motion>` + the `useRise()` composable), reduced-motion aware.
- **All user copy** through `vue-i18n` — add keys to **all six** `src/i18n/locales/*.json`.
- Every component/view ships a `.stories.ts` + `.spec.ts`; user-facing flows add a Playwright e2e.

## Structure & where things go

- **Folder-per-unit** everywhere: `components/<Name>/`, `views/<Name>/`, `composables/<name>/`,
  `utils/<name>/` — each folder holds the file named after it plus its `.spec.ts` (and
  `.stories.ts` for UI). Import the explicit file: `@/composables/useRise/useRise`,
  `@/views/HomeView/HomeView.vue` (no index files — matches the components convention).
- `layouts/` — chrome (DefaultLayout: nav + footer). `data/` — static content. `types/` — shared
  types (co-located `*.types.ts` for component-only ones).
- **Types:** shared → `src/types/*.ts`; component/page-only → co-located `*.types.ts`.
- `i18n/`, `router/` (nested routes under layouts), `config/site.ts` (identity/socials).
- **Projects** live in `src/data/projects.ts` (localized `Record<Locale>` copy, per-project
  media under `public/projects/<slug>/`). For any project work — adding, editing, drafting,
  wiring images/video — use the **`new-project`** skill.

## Commands

```bash
pnpm dev
pnpm type-check          # vue-tsc
pnpm lint                # oxlint + eslint --fix
VITEST=1 npx vitest run --project '!storybook'   # unit tests (see gotcha below)
pnpm build-storybook     # design system → storybook-static/
```

Husky pre-commit runs `lint:eslint` + `type-check`. Use the **`open-pr`** skill to open PRs.

## ⚠️ Gotchas (these have bitten before)

1. **OneDrive working dir.** The repo lives under OneDrive, which flips file modes (phantom
   git diffs — fixed via `git config core.fileMode false`) and can transiently *dehydrate*
   untracked files (e.g. `.storybook` "vanishing"). Re-check before assuming a file is missing.
2. **Unit tests.** `vitest.config.ts` has two projects: jsdom (unit) and `storybook` (chromium,
   slow). `pnpm test:unit` is watch mode. For a one-shot unit run use
   `VITEST=1 npx vitest run --project '!storybook'`.
3. **Generic SFCs** (`BaseCarousel`) collapse `T` to `unknown` in stories/specs — cast with
   `as unknown as …`, never `any`.
4. **Deploys are two separate Vercel projects.** The app (`denisibanez.dev`) auto-deploys via
   Vercel's Git integration. Storybook (`design.denisibanez.dev`) is a *separate* project,
   published by `.github/workflows/publish-storybook.yml`. Never run `vercel` from inside the
   repo to deploy Storybook — it targets the app project and rebuilds the app from Git. Deploy
   the prebuilt `storybook-static/` folder from *outside* the repo (no root `vercel.json`).
5. **PR auth.** SSH pushes as `denisibanez`; the `gh` CLI is `ibanezdenis2886` (not a
   collaborator) so `gh pr create` fails — open PRs via the web URL.
6. **SSG build + `@unhead/vue` is pinned to v2.** `pnpm build` runs `vite-ssg build`
   (prerenders every route to HTML). vite-ssg depends on unhead **v2**, so `@unhead/vue`
   is pinned to `^2` on purpose — upgrading to v3 gives a *different* head instance and
   `useSeo`'s title/meta/JSON-LD silently stop rendering into the prerendered HTML. Don't
   bump it without bumping vite-ssg to match. Prerendered routes + `sitemap.xml` are both
   derived from `src/data/projects` in `vite.config.ts` (no manual list to keep in sync).
   `status: 'draft'` projects are excluded from both (and 404 in prod via the router guard).
7. **Never `git add -A` for project media.** The user drops raw captures/videos straight into
   `public/projects/` (often for *future* projects). A broad add commits source material into
   the public deploy — stage explicitly (`git add public/projects/<slug>/<clean>.png`) and
   leave `_source/`/`figma-export/` and unrelated raw files untracked. Crop frames with **PIL,
   not `sips`** (`sips -c` crops centred, missing the top hero). See the **`new-project`** skill.

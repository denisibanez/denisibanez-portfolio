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

- `components/<Name>/` — agnostic UI (`.vue` + `.stories.ts` + `.spec.ts`).
- `views/` — routed pages (flat). `layouts/` — chrome (DefaultLayout: nav + footer).
- `composables/` — reusable logic (`useRise`, `useProjects`, `useInitialLoad`).
- `utils/` — pure helpers (`getInitials`, `timeline`).
- **Types:** shared → `src/types/*.ts`; component/page-only → co-located `*.types.ts`.
- `i18n/`, `router/` (nested routes under layouts), `config/site.ts` (identity/socials).
- Sample content (e.g. projects) currently lives in `composables/useProjects.ts`.

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

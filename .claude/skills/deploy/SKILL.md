---
name: deploy
description: Deploy this Vite/Vue app to Vercel (the host). Use to set up or trigger a deploy.
---

# deploy (Vercel)

The project is hosted on **Vercel**, which auto-detects Vite (build `pnpm build`, output `dist`).

- **Auto-deploy:** push to `main` → production; PRs → preview deploys. No action once the repo is linked in Vercel.
- **CLI:** `pnpm dlx vercel` (preview) / `pnpm dlx vercel --prod` (production). First run links the project.
- **SPA rewrites (needed for vue-router history mode):** add `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```
  Without it, refreshing a client route 404s.
- **Env vars** (e.g. `VITE_API_BASE_URL`): Vercel → Project → Settings → Environment Variables.

CI is for **tests only** — do not duplicate the Vercel build/deploy in CI.

## Design system (Storybook) — a SEPARATE Vercel project

The Storybook lives on its own project, `denisibanez-design-system`, at
**design.denisibanez.dev** — distinct from the app (`denisibanez-portfolio`).

- **Auto-publish:** `.github/workflows/publish-storybook.yml` builds Storybook and deploys the
  static `storybook-static/` folder on push to `main`. Needs repo secrets `VERCEL_TOKEN`,
  `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (the design-system project).
- **Manual publish:** `pnpm build-storybook && cd storybook-static && pnpm dlx vercel --prod`.
- **⚠️ Gotcha — never `vercel` from inside the repo to deploy Storybook.** The repo is
  Git-linked to the *app* project (and has a root `vercel.json` SPA rewrite that breaks static
  Storybook), so deploying from anywhere in the tree targets the app and rebuilds it from Git.
  Always deploy the prebuilt `storybook-static/` folder from **outside** the repo (or via the
  Action). If a bad deploy hits production, `vercel rollback <previous-prod-url>` restores it.

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

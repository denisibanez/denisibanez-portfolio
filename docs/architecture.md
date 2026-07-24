# Architecture

A Vue 3 + TypeScript SPA built with Vite. Static content today; structured so it can grow
into a data-driven app without re-architecture.

## Layers & responsibilities

Every unit is a **folder named after it** holding the file + its `.spec` (+ `.stories` for UI),
e.g. `views/HomeView/HomeView.vue`, `composables/useRise/useRise.ts`. Import the explicit file
(`@/composables/useRise/useRise`) — no index files, matching the components convention.

```
views/        Routed pages. Compose components; own page-level state and copy (via i18n).
layouts/      Route chrome (DefaultLayout = nav + footer) with an inner <RouterView/>.
components/   Agnostic, reusable UI. Know the design system, never the page. Props/emits/slots.
composables/  Reusable logic & stateful behaviour (useProjects, useRise, useAudioPlayer, …).
data/         Static sample content (projects.ts, testimonials.ts) — the seam to swap for an API.
utils/        Pure, stateless helpers (getInitials, timeline).
types/        SHARED domain types (project.ts, track.ts). Component/page-only types are
              co-located as *.types.ts next to their consumer.
services/     axios instance (http.ts) — scaffolding for future API calls.
stores/       Pinia — scaffolding for future shared/server state.
i18n/         vue-i18n setup + 6 locale JSONs. All user copy runs through here.
config/       Site-wide constants (site.ts: identity, socials).
router/       Nested routes: every area is a layout parent with page children.
assets/       Tailwind entry + @theme tokens, images, video, audio.
```

## Routing

Nested routes under layouts, so page chrome lives in the layout, not the page:

```
/                     DefaultLayout → HomeView
/about                              → AboutView
/projects                           → ProjectsView (carousel + kind tabs)
/projects/:slug                     → ProjectDetailView (case study)
/projects/:slug/specs               → ProjectSpecsView (spec sheet)
/testimonials                       → TestimonialsView
/:pathMatch(.*)*                    → NotFoundView (reuses DefaultLayout)
```

## Data flow (today → tomorrow)

- **Today:** content is static, defined in `src/data/` (`projects.ts`, `testimonials.ts`);
  composables read from it. Projects carry `status` (published/draft) and `kind` (study/client)
  and are ordered by build date. Drafts are hidden from the list and 404 on direct access.
- **Tomorrow:** when projects/testimonials/blog come from **endpoints**, `services/http` fetches
  them into **Pinia stores**; composables read from the store instead of a literal array. The
  component API stays the same, so views don't change.

## Rendering & motion

- **Prerendered (SSG) via `vite-ssg`**: `pnpm build` renders every route to static
  HTML (real content + per-route `<title>`/meta/OG/JSON-LD from `useSeo`), then the
  client hydrates into a normal SPA. `main.ts` exports `createApp = ViteSSG(...)`;
  `router/index.ts` exports the `routes` array (vite-ssg owns the router + head).
  - **Single source of truth**: `vite.config.ts` derives both the prerender list
    (`ssgOptions.includedRoutes`) and `sitemap.xml` from `src/data/projects`
    (published projects only — drafts are excluded from both). The sitemap is
    generated into `dist/` by `ssgOptions.onFinished`, so it never drifts. Project
    pages aren't reachable via crawlable `<a>` links (carousel cards are buttons),
    which is why they're listed explicitly rather than discovered by crawling.
  - **`@unhead/vue` is pinned to v2** to match vite-ssg (v3 uses a different head
    instance and its tags won't render into the prerendered HTML).
  - Vercel serves the prerendered files (`cleanUrls`); the `/(.*) → /index.html`
    rewrite is the SPA fallback for non-prerendered paths (drafts, unknown slugs).
- Entrance/interaction animation via **motion-v** (`<Motion>` + `useRise`), kept subtle and
  reduced-motion aware. No hand-rolled timers for entrances.

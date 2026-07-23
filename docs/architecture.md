# Architecture

A Vue 3 + TypeScript SPA built with Vite. Static content today; structured so it can grow
into a data-driven app without re-architecture.

## Layers & responsibilities

```
views/        Routed pages. Compose components; own page-level state and copy (via i18n).
layouts/      Route chrome (DefaultLayout = nav + footer) with an inner <RouterView/>.
components/   Agnostic, reusable UI. Know the design system, never the page. Props/emits/slots.
composables/  Reusable logic & stateful behaviour (useProjects, useRise, useAudioPlayer, …).
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

- **Today:** content is static, defined in composables/data (`useProjects`) and view-local
  arrays (testimonials). Projects carry `status` (published/draft) and `kind` (study/client)
  and are ordered by build date. Drafts are hidden from the list and 404 on direct access.
- **Tomorrow:** when projects/testimonials/blog come from **endpoints**, `services/http` fetches
  them into **Pinia stores**; composables read from the store instead of a literal array. The
  component API stays the same, so views don't change.

## Rendering & motion

- SPA (history mode); Vercel rewrites all paths to `index.html`.
- Entrance/interaction animation via **motion-v** (`<Motion>` + `useRise`), kept subtle and
  reduced-motion aware. No hand-rolled timers for entrances.

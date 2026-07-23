# Code-quality review

A snapshot of reuse, composables, stores, code smells and clean-code health — what's strong,
what was improved, and what's left.

## Strengths

- **Clean baseline:** no `any`, no `console.*`, no `function` declarations, no `TODO/FIXME`.
  Consistent `const`-arrow style, guard clauses over nested `if`s.
- **Reuse:** UI primitives (`BaseButton`, `BaseCarousel`, `BaseTabs`, `MediaBackdrop`) and
  composables/utils (`useRise`, `useProjectRoute`, `useAudioPlayer`, `useProjects`,
  `getInitials`, `timeline`) — duplicated markup/logic has been factored out.
- **Types:** shared vs co-located split is deliberate and consistent.
- **Coverage:** every unit has a story + spec; flows have e2e; all copy is i18n'd (6 locales).

## Improved in this pass

- **`useAudioPlayer`** extracted from the 785-line `GlassPlayer` — audio state/controls are now
  isolated and unit-tested independently of the morph/UI.
- **`MediaBackdrop`** replaced the repeated `section > background image (+scrim)` boilerplate
  across six views.
- **`useProjectRoute`** deduped the slug→project resolution shared by the detail & specs pages.
- **Scaffolding documented** — `stores/counter.ts` + `services/http.ts` are marked as the pattern
  for future dynamic data (see [decisions.md](./decisions.md#3)).
- **E2e broadened** — navigation, language switch, 404, specs drill-down, tab filtering.

## What's next (candidates, not blockers)

- **Separate project data from logic.** `useProjects.ts` still mixes ~150 lines of sample data
  with the helpers. Move the data to `src/data/projects.ts` (or a JSON/endpoint) so the composable
  is just logic — this is the natural seam for the "static → API" step.
- **`GlassPlayer` is still large** (~740 lines) — now mostly template + morph CSS. Could split the
  expanded player body / transport row into small presentational subcomponents.
- **Replace view-local sample arrays** (testimonials) the same way as projects when data goes dynamic.
- **Add loading/error states** once `services/http` + Pinia are wired to real endpoints.
- **Gate non-essential motion** behind `usePreferredReducedMotion()` (@vueuse) app-wide, rather
  than per-component.
- **Round out e2e:** mobile nav drawer, testimonial modal, gallery swipe/lightbox, prev/next
  project navigation.
- **Remove the two Storybook chunk-size warnings** by code-splitting stories if the build grows.

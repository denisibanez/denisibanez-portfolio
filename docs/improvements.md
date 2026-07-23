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
- **Data separated from logic** — projects and testimonials now live in `src/data/`; `useProjects`
  is logic-only. This is the seam to swap for an API later.
- **Reduced motion** — `useRise` collapses to a no-op under `prefers-reduced-motion` (native
  `matchMedia`, no extra dependency), so entrance animations are gated app-wide.

## What's next (candidates, not blockers)

- **`GlassPlayer` is still large** (~740 lines) — now mostly template + morph CSS. Could split the
  expanded player body / transport row into small presentational subcomponents.
- **Add loading/error states** once `services/http` + Pinia are wired to real endpoints (then the
  `data/` modules become API calls feeding stores).
- **Round out e2e:** gallery swipe/lightbox and prev/next project navigation.
- **Remove the two Storybook chunk-size warnings** by code-splitting stories if the build grows.

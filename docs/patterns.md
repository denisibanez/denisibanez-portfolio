# Patterns

The reusable building blocks and how to use them.

## Components

### `MediaBackdrop`
Full-bleed backdrop: a fixed decorative background image + an optional `#scrim` overlay + page
content in the default slot. Replaces the repeated `section > img` boilerplate.
```vue
<MediaBackdrop :src="bg">
  <template #scrim><div class="… lg:hidden" /></template>
  <div class="relative z-10 …">…page content…</div>
</MediaBackdrop>
```

### `BaseCarousel`
Generic, slot-driven, Netflix-style horizontal carousel: snap scroll, prev/next (desktop) +
dashes (mobile) that auto-hide when the cards fit, entrance motion, hover pop, optional sibling
`dim`. Drive it with `items` + `item-key` + a scoped `#card` slot; listen to `@select`.

### `BaseTabs`
Accessible tab bar (roving arrow keys); `v-model` the active value, pass `{ label, value }[]`.
Active tab shows the gold underline. Used for the projects study/client filter.

### `BaseButton` / `GlassPlayer` / `LoadingReveal` / `AppNav` / `PlayButton` / `LanguageSelect`
See their stories in Storybook (design.denisibanez.dev).

## Composables

- **`useRise()`** → `rise(delay)` — the standard fade-up entrance config for `<Motion v-bind>`.
- **`useProjectRoute(() => props.slug)`** → `{ slug, project }` — resolves the project from the
  route `:slug` (or a prop override). Shared by the detail & specs pages.
- **`useAudioPlayer(() => tracks)`** → audio state + transport controls (play/pause, cycle, scrub,
  progress, media-event handlers). Host component binds `audio` to `<audio>` and the `on*` handlers.
- **`useProjects()`** → published-and-sorted `projects` + `getBySlug` / `getAdjacent`.
- **`useInitialLoad()`** → boot loading state for `LoadingReveal`.

## Utils

- **`getInitials(name)`** → first two words' initials, uppercased.
- **`timeline`** → `monthsBetween`, `formatMonth`, `formatRange`, `yearOf` over `YYYY-MM` dates.

## Recurring micro-patterns

- **`slug` prop override** on routed views (`props.slug ?? route.params.slug`) so stories/tests
  can render a specific record without a router param.
- **Scroll-progress bar** — a `bg-on-surface/20` track with a `bg-primary` fill sized to a
  `scrollTop / (scrollHeight - clientHeight)` (or index/total) percentage.
- **Cast, don't `any`** — generic SFCs and Storybook `Meta` use `as unknown as …`.

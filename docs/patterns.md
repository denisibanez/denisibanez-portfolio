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

### `BaseSkeleton`
Shimmering placeholder that mirrors the real layout (modern skeleton, not a spinner). Size it
with utility classes; `rounded` for pills/avatars; wrap the group in `aria-busy`.
```vue
<div v-if="pending" aria-busy="true" class="flex gap-6">
  <div v-for="n in 3" :key="n" class="w-[220px]">
    <BaseSkeleton class="aspect-[2/3] w-full" />
    <BaseSkeleton class="mt-4 h-3 w-1/2" />
  </div>
</div>
```

### `BaseModal`
Reusable dialog: teleported backdrop + centred panel (default slot), closes on Escape /
backdrop click, locks body scroll. Powers the testimonial detail modal and the project lightbox.
```vue
<BaseModal :open="!!selected" :label="selected?.name" @close="close">
  <div v-if="selected" class="…panel…">…</div>
</BaseModal>
```

### `ToastHost` + `useToast`
Transient notifications (errors as toasts). Mount `<ToastHost/>` once (it's in DefaultLayout);
fire from anywhere via `useToast()`:
```ts
const { error, success, notify } = useToast()
error(t('state.errorMessage')) // gold-accented error toast, auto-dismisses
```

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
- **`useAsyncData(fetcher)`** → `{ data, pending, error, retry }` — glue for `BaseSkeleton`
  (while `pending`) and a `useToast().error(...)` on `error`; the seam for when `data/` modules
  become `services/http` calls.
- **`useToast()`** → `{ toasts, notify, success, error, dismiss }` — shared toast queue rendered by
  `ToastHost`.

## Utils

- **`getInitials(name)`** → first two words' initials, uppercased.
- **`timeline`** → `monthsBetween`, `formatMonth`, `formatRange`, `yearOf` over `YYYY-MM` dates.

## Recurring micro-patterns

- **`slug` prop override** on routed views (`props.slug ?? route.params.slug`) so stories/tests
  can render a specific record without a router param.
- **Scroll-progress bar** — a `bg-on-surface/20` track with a `bg-primary` fill sized to a
  `scrollTop / (scrollHeight - clientHeight)` (or index/total) percentage.
- **Cast, don't `any`** — generic SFCs and Storybook `Meta` use `as unknown as …`.

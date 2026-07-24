# Conventions

Enforced by the **`new-component`** skill (read it before creating UI) and by
type-check + lint (Husky pre-commit). Summary:

## Code

- **Vue 3 `<script setup lang="ts">`** everywhere.
- **`const` arrow functions only** — no `function` declarations.
- **No nested `if`s** — guard clauses, ternaries, or lookup maps.
- **No `any`, no `console.*`, no dead code.** Casts use `as unknown as …`, never `any`.
- Props typed with `defineProps<Props>()`; prefer `type` over `interface`.
- Extract shared logic to **composables** and pure helpers to **utils** rather than duplicating.

## Styling

- **Tailwind design tokens only** (`bg-surface`, `text-headline-lg`, `border-outline`, `font-serif`,
  `text-tertiary`, …), defined via `@theme` in `src/assets/main.css`. Never hardcode hex or
  arbitrary `[…]` values when a token exists.
- Roundness `rounded-none`→`rounded-sm`; spacing on the 8px grid; fluid side padding `px-[5vw]`.
- The **gold `tertiary`** accent and the **Playfair `font-serif`** are reserved for editorial
  emphasis / active state (case-study eyebrow, active tab). Everything else is Poppins + greyscale.

## Responsiveness

Mobile-first (base = mobile, scale up). Breakpoints `sm 640 / md 768 / lg 1024`. Navigation
collapses to a drawer below `md`; touch targets ≥ 44px (`min-h-11`); grids reflow, never overflow.

## Types

- **Shared** domain types → `src/types/*.ts`.
- **Component/page-only** types → co-located `*.types.ts` next to the consumer.

## i18n

All user-facing copy runs through **vue-i18n**. Add every new key to **all six** locale files
(`src/i18n/locales/{en,pt,es,de,fr,ja}.json`).

## Testing & docs per unit

Each component/view ships a **Storybook story** + a **Vitest unit test**; user-facing flows add a
**Playwright e2e**. Generic SFCs collapse `T` to `unknown` in stories/specs — cast, don't `any`.

Run: `pnpm type-check`, `pnpm lint`, `VITEST=1 npx vitest run --project '!storybook'`.

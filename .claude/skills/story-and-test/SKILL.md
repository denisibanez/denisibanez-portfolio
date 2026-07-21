---
name: story-and-test
description: Generate a Storybook story and a Vitest unit test for an existing Vue 3 component. Use when a component lacks a story/spec.
---

# story-and-test

For `src/components/<Name>/<Name>.vue`, create siblings:

- `<Name>.stories.ts` — `@storybook/vue3-vite` `Meta`/`StoryObj`: a `Default` story plus one per meaningful prop/variant/state; wire `args`/`argTypes`.
- `<Name>.spec.ts` — Vitest + `@vue/test-utils`: render, each prop/variant, emitted events, guard/edge cases.

Gotcha: don't pass read-only `MouseEvent` props via `trigger('pointermove', { clientX })` — jsdom throws. Assert the resulting behaviour/state, not exact coordinates.

Run `pnpm exec vitest run --project '!storybook'` (fast jsdom) then `pnpm test:unit` (adds the Storybook browser/visual project). Follow `new-component` conventions (tokens, `const` arrow fns, no nested `if`s).

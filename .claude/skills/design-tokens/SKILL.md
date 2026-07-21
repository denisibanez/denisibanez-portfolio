---
name: design-tokens
description: Turn a design spec (Figma values or a doc) into Tailwind v4 tokens in src/assets/main.css (@theme), following the Ethereal Precision system. Use when adding/adjusting colours, type or spacing.
---

# design-tokens

Tokens live in `src/assets/main.css` under `@theme` and become Tailwind utilities — never hardcode hex/px in components.

- **Colour:** `--color-<name>: <hex>;` → `bg-<name>` / `text-<name>` / `border-<name>`.
- **Type scale:** `--text-<name>` + `--text-<name>--line-height|--font-weight|--letter-spacing` → `text-<name>` sets all four.
- **Font family:** `--font-<name>` → `font-<name>`.

Workflow: map each spec value to an **existing** token first; add a new token only when none fits; name it semantically (`--{component}-{element}-{prop}-{variant}` or a clear role name). Update `DESIGN-SYSTEM.md` whenever you add a token.

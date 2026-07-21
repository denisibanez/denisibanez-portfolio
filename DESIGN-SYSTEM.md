# Design System — Ethereal Precision

Tokens and visual guidelines for the Denis Ibañez portfolio. All tokens are exposed as
Tailwind utilities via `@theme` in `src/assets/main.css` — **use the utilities, never hardcoded
hex values**.

## Colours (dark palette)

| Token | Utility | Hex | Use |
|-------|---------|-----|-----|
| surface | `bg-surface` | `#131313` | Main page background |
| surface-dim | `bg-surface-dim` | `#131313` | Less prominent areas |
| surface-bright | `bg-surface-bright` | `#393939` | Borders / lightly raised surfaces |
| surface-container-lowest | `bg-surface-container-lowest` | `#0e0e0e` | Lowest-hierarchy background |
| surface-container-low | `bg-surface-container-low` | `#1c1b1b` | Secondary surface (cards) |
| surface-container | `bg-surface-container` | `#212121` | Default container surface |
| on-surface | `text-on-surface` | `#e2e2e2` | Primary text / icons |
| on-surface-variant | `text-on-surface-variant` | `#c6c6c6` | Secondary text / captions |
| primary | `bg-primary` / `text-primary` | `#ffffff` | Primary accent (max contrast) |
| on-primary | `text-on-primary` | `#131313` | Text on primary (buttons) |
| outline | `border-outline` | `#919191` | Subtle borders / dividers |

## Typography (Poppins)

Font family utility: `font-sans` (Poppins). Type-scale utilities set size + line-height +
weight + letter-spacing together:

| Utility | Size | LH | Weight | Tracking | Use |
|---------|------|----|--------|----------|-----|
| `text-headline-lg` | 3.5rem | 1.2 | 700 | -0.02em | H1 (name) |
| `text-headline-md` | 2.25rem | 1.3 | 600 | — | H2 (section titles) |
| `text-body-lg` | 1.125rem | 1.6 | 400 | — | Body / descriptions |
| `text-label-lg` | 0.875rem | 1.5 | 500 | 0.1em, uppercase¹ | Nav links, buttons |

¹ Apply `uppercase` alongside `text-label-lg`.

## Shape & spacing

- **Roundness:** `rounded-none` → `rounded-sm` only. Minimalist, geometric.
- **Spacing:** 8px grid (Tailwind `2` = 8px). Side margins: `5vw` or the container padding.

## Layout conventions

- **Nav:** left-aligned links, **no** text logo on the left.
- **Footer:** horizontal — copyright left, social links right.

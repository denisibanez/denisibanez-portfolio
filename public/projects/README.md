# Project images

One folder per project, named after its `slug` in `src/data/projects.ts`:

```
public/projects/<slug>/
  home.png            # curated, publish-safe images (committed)
  markets.png
  story-*.png
  figma-export/       # raw source (Figma exports, etc.) — GITIGNORED, local only
```

## Pattern

- **Committed images** live directly under `public/projects/<slug>/` with clean,
  URL-safe, descriptive names (`home.png`, `story-atmosphere.png`, …). These are
  served publicly, so only include what's safe to publish.
- **Source material** (raw Figma exports, screenshot dumps, anything internal or
  bulky) goes under `public/projects/<slug>/figma-export/` — this path is
  **gitignored**, so it stays on your machine and is never deployed or committed.
  Copy the good frames out into the folder root (clean name) to feature them.

## Wiring in the data

In `src/data/projects.ts` each project references its images:

```ts
image: '/projects/<slug>/home.png',        // card + detail hero (cover)
images: [                                  // detail-page gallery, in order
  '/projects/<slug>/home.png',
  '/projects/<slug>/story-atmosphere.png',
],
```

`image` is the cover (portrait crops best for the card poster). `images` is the
ordered gallery; if omitted it falls back to `[image]`. With no image at all, the
card shows a gradient placeholder (no broken image).

Bulky raw captures (e.g. full-page screenshots) go under `<slug>/_source/`, which
is also gitignored — crop the hero/gallery frames out of them into the folder root.

## Projects

- `betfair-skybet/` — Betfair & SkyBet (Blip). Cover + gallery from the public
  product plus a few Stories/FeaturedMarkets frames. Full Figma export kept local
  under `figma-export/`.
- `eurowings/` — Eurowings (Aubay). `home.png` + `section.png` cropped from the
  public site; the full-page capture is kept local under `_source/`.

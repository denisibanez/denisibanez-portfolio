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

An optional `video: '/projects/<slug>/home.mp4'` leads the gallery: the detail
media box shows the play badge over `image` (its poster), and the lightbox plays
the video with controls. Keep videos web-friendly (H.264 MP4); they are committed
and served, so only include what's safe to publish.

Bulky raw captures (e.g. full-page screenshots) go under `<slug>/_source/`, which
is also gitignored — crop the hero/gallery frames out of them into the folder root.

## Projects

- `betfair-skybet/` — Betfair & SkyBet (Blip). **Draft** for now. Cover + gallery
  from the public product: Stories frames, MarketEventPage frames
  (`market-event`, `market-lineups`, `market-mobile`) and `home`/`markets`. Full
  Figma export kept local under `figma-export/`; raw captures under `_source/`.
- `eurowings/` — Eurowings (Aubay). `mobile.png` (card cover) + `home.png` +
  `section.png` cropped from the public site; the full-page capture is kept local
  under `_source/`.
- `noatum/` — Noatum (Amaris). `home.png` (cover + video poster) cropped from the
  public site, plus `home.mp4` (showcase video). Raw full-page capture kept local
  under `_source/`.
- `bentley/` — Bentley Systems (Jobbex). `home.png` (Cohesive renewables / wind
  turbines) + `corporate.png` + `mobile.png`.
- `ageas/` — Ageas Seguros (Askblue). `home.png` (dental-insurance landing) + `mobile.png`.
- `pricefy/` — Pricefy / Selbetti. `home.png` + `mobile.png` + `team-*.jpg` (team photos).
- `tempo/` — Tempo Assist. `home.png` + `mobile.png`.
- `dock/` — Dock (BaaS). `home.png` + `mobile.png`.

All cropped from the companies' public sites; raw full-page captures kept local
under each `_source/`.

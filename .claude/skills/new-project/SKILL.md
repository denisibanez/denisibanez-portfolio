---
name: new-project
description: Add (or update) a portfolio project in the Denis Ibañez portfolio — the full pipeline from localized data entry in src/data/projects.ts, through curating per-project images/video under public/projects/<slug>/, to draft/publish, integrity checks and the SSG build. Use whenever adding, editing, publishing or drafting a project, or wiring its images/video.
---

# New project

Follow this every time you add or change a portfolio **project**. Content lives in
`src/data/projects.ts`; media lives in `public/projects/<slug>/`. Read the
`new-component` skill for the code conventions and `public/projects/README.md` for
the image pattern.

## 1. Data entry — `src/data/projects.ts`

One `Project` object (type in `src/types/project.ts`). **All copy is localized** as
`Record<Locale, …>` (read at runtime via `useLocalize().localized()`, which falls
back en→pt). You MUST fill **all six locales** (`en, pt, es, de, fr, ja`) for every
localized field — never leave one out.

- Localized (`LocalizedText` / `LocalizedList`): `category`, `summary`,
  `overview` (paragraphs), `features` (bullets), `industry`.
- Plain strings: `title`, `role`, `collaborators` (e.g. `'via Aubay'`), `techStack[]`,
  `startDate`/`endDate` (`YYYY-MM`, drive ordering + timeline), `slug`, `kind`
  (`'client'|'study'`), optional `url`, `repoUrl` (study only), `image`, `images[]`,
  `video`, `status`.
- Ordering is automatic (newest-first by `endDate`) — array position doesn't matter.

Translate carefully and idiomatically (not literally); keep product/tech names
(React, AEM, Vitest…) untranslated. Mirror the tone of the existing entries.

## 2. Media — `public/projects/<slug>/`

Committed, publish-safe frames sit in the folder root with clean names
(`home.png`, `market-event.png`, …). **Raw source stays local & gitignored**:
`_source/` (screenshot dumps, full-page captures, videos-in) and `figma-export/`.

Crop curated frames from raw captures — **use Python PIL, not `sips`**
(`sips -c H W` crops *centred*, so it misses the hero at the top):

```python
from PIL import Image
im = Image.open("public/projects/<slug>/_source/raw.png")
w, h = im.size
im.crop((0, 0, w, 820)).save("public/projects/<slug>/home.png")   # top hero
```

- Full-page captures are unusable whole — crop a hero/gallery frame from the top.
- Heavy PNGs: downscale to ~1600px wide + `optimize=True` (keep a hero < ~1.3 MB).
- Fit is `object-contain` everywhere (no cropping in the UI) — any aspect ratio is fine.
- Wire it: `image` = card cover + poster; `images[]` = ordered gallery (falls back to
  `[image]`); no image → gradient placeholder. Move the raw capture into `_source/`
  when done.

### Video (optional)

`video: '/projects/<slug>/home.mp4'` leads the gallery: it plays **inline** in the
media box (poster = `image`) and again in the lightbox, both with native controls.
Commit web-friendly H.264 MP4s (they are served). Keep the poster still as `image`.

## 3. Draft vs published

`status: 'draft'` hides a project from the public list, the prerender **and** the
sitemap (both derived from published projects in `vite.config.ts` — no manual list),
and the router guard 404s its URL in prod. Drafts are visible **only on localhost**
(`useProjects` + `import.meta.env.DEV`). Omit `status` to publish. When a project's
publish state or slug changes, nothing else needs updating — routes and sitemap follow.

## 4. Verify

```bash
# every referenced image/video exists and is non-empty
node -e "const fs=require('fs');const s=fs.readFileSync('src/data/projects.ts','utf8');\
[...new Set([...s.matchAll(/'(\/projects\/[^']+\.(png|jpg|jpeg|webp|mp4))'/g)].map(m=>m[1]))]\
.forEach(p=>console.log((fs.existsSync('public'+p)&&fs.statSync('public'+p).size>1000)?'ok':'MISSING',p))"

pnpm type-check
VITEST=1 npx vitest run --project '!storybook'   # specs mock @/data/projects — a fixture, so they don't break on content
pnpm build                                        # confirm sitemap + prerendered routes match the published set
```

Then run **visual-check** on the new detail page + the projects list at desktop and
mobile — never trust the data alone. For video, confirm it plays inline.

## ⚠️ Gotchas (bit us before)

1. **Never `git add -A` blindly.** The user drops raw captures/videos straight into
   `public/projects/` (and loose files). A broad add sweeps source material into the
   commit and the public deploy. **Stage explicitly** (`git add src/… public/projects/<slug>/<clean>.png`);
   leave `_source/`, `figma-export/` and unrelated raw files untracked.
2. **OneDrive dehydration** can drop committed images from disk; a later `git add -A`
   then commits the *deletion*. Restore from the commit that added them:
   `git checkout <sha> -- public/projects/<slug>/<file>.png`. See the
   `onedrive-dehydration` memory.
3. Unknown project slugs must hit the **real 404** via the router `beforeEnter` guard —
   never an inline "not found" panel.

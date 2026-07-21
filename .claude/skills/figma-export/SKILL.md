---
name: figma-export
description: Export screens/frames from a Figma page as PNGs via the Figma REST API, organised per page. Use to pull design references or portfolio screens.
---

# figma-export

Token: use `$FIGMA_TOKEN` (if missing/expired, ask for a fresh personal token — figma.com → Settings → Personal access tokens).

1. Parse the URL: file key = id in `/design/<KEY>/...`; node id = `?node-id=X-Y` → `X:Y`.
2. **List frames:** `GET /v1/files/{key}/nodes?ids={node}&depth=2`, walk children (FRAME/COMPONENT/SECTION). Skip trash/WIP sections (🗑️, 🔍, "wip", "explorations", "templates"). Keep screen-sized frames (mobile: w 300–520 & h≥560; desktop: w 900–2000 & h≥560).
3. **Render in small batches (≤8 ids)** to avoid render timeout: `GET /v1/images/{key}?ids=...&format=png&scale=2` → download each returned url.
4. Save into per-page folders, filenames `NN_<sanitised-name>.png`.

Notes: rendering a whole canvas at scale 2 times out — always render individual frames. `log()` anything skipped; never silently truncate.

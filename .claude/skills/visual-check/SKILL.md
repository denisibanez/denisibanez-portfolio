---
name: visual-check
description: Screenshot a running dev server or Storybook story at desktop AND mobile widths (via Playwright) and view the result BEFORE claiming a UI change works. Use after any visual/UI change.
---

# visual-check

Never claim a UI change is done from code alone — capture it and look.

1. Ensure a server is up: `pnpm dev` (app) or `pnpm storybook` (:6006). Detect the port from its log.
2. Write a throwaway script **in the repo root** (so `@playwright/test` resolves), e.g. `_shot.mjs`:

   ```js
   import { chromium } from '@playwright/test'
   const b = await chromium.launch()
   for (const [w, h, name] of [[1440, 900, 'desktop'], [390, 800, 'mobile']]) {
     const p = await b.newPage({ viewport: { width: w, height: h } })
     await p.goto(URL, { waitUntil: 'load' })
     await p.waitForTimeout(1500)
     await p.screenshot({ path: `/tmp/vc_${name}.png`, fullPage: false })
     await p.close()
   }
   await b.close()
   ```
   - App: `URL = http://localhost:<port>/`
   - Story: `URL = http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
3. `node _shot.mjs`, delete it, then **Read the PNGs** and compare with the reference at BOTH viewports. Fix and repeat until it matches.

Notes: run from repo root (module resolution). For hover/menu states add `p.mouse.move(...)` / `p.click(...)` before the screenshot. If Storybook stories render unstyled, `.storybook/preview.ts` must import the CSS entry (`../src/assets/main.css`).

## Before/after pixel-diff (for refactors — "don't break anything")

When a refactor must be visually **identical** (extracting a component, renaming classes),
capture the SAME view on the old code and the new code, then quantify the delta — don't
eyeball it. Screenshot `git stash`ed/base state → `/tmp/before_*.png`, then the new state →
`/tmp/after_*.png` (same URLs, same viewports, same waits), and diff with PIL (no numpy needed):

```python
from PIL import Image, ImageChops
for name in ("desktop", "mobile"):
    a = Image.open(f"/tmp/before_{name}.png").convert("RGB")
    b = Image.open(f"/tmp/after_{name}.png").convert("RGB")
    diff = ImageChops.difference(a, b)
    bbox = diff.getbbox()                       # None → pixel-identical
    changed = sum(1 for px in diff.getdata() if px != (0, 0, 0))
    total = a.width * a.height
    print(name, "bbox", bbox, f"{changed}/{total} = {changed/total:.4%}")
```

Interpret: `bbox None` / 0% = identical (ideal for lightboxes/static UI). A tiny non-zero %
localized to an animating area (hover-scale, transitions firing at different frame times) is
expected — confirm the changed **region** matches the animation, not layout. Anything structural
(shifted boxes, new gaps) means the refactor changed rendering — investigate before committing.

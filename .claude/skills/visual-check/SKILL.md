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

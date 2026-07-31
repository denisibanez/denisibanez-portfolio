---
name: new-post
description: Add or edit a blog post — data in src/data/blog.ts, media in public/blog/, rich blocks, embeds, drafts.
---

# New blog post

Follow this every time you add or change a **blog post**. Content lives in
`src/data/blog.ts`; media lives in `public/blog/`. Read the `new-component` skill for
the code conventions and `new-project` for the media/staging rules (they apply here too).

## 1. Data entry — `src/data/blog.ts`

One `BlogPost` object (type in `src/types/blog.ts`). Ordering is automatic
(newest-first by `date`) — array position doesn't matter.

**Two localization models — do not mix them up:**

- **Card + header copy** (`title`, `excerpt`, `category`, `body`, `quote`) is
  `LocalizedText` / `LocalizedList` — **all six locales required** (`en, pt, es, de, fr, ja`),
  same as projects. Read at runtime via `useLocalize().localized()` (falls back en→pt).
- **Rich block prose** (`blocks[].text`) is `BlogText` = `Partial<Record<Locale,string>> & { en: string }`
  — **English required, the rest optional** and falls back to English. Use this for
  long-form imported posts (e.g. Medium) where translating every block is impractical:
  write `{ en: '…', pt: '…' }` and skip the others.

Plain fields: `slug`, `date` (`YYYY-MM-DD`, drives order + display), `readingMinutes`,
`tags[]` (kept as-is across locales), optional `featured`, `status`.

Translate the localized copy idiomatically (not literally); keep product/tech names
(Vue, Vite, Quasar…) untranslated. Mirror the tone of existing entries.

## 2. Body: `body` (simple) **or** `blocks` (rich) — never both

- **Simple post:** `body: LocalizedList` — an array of paragraphs per locale. The first
  paragraph gets a drop-cap automatically.
- **Long-form / imported post:** `blocks: BlogBlock[]` — ordered mix of:
  - `{ type: 'p' | 'h2' | 'h3', text: BlogText }` — localized prose
  - `{ type: 'code', code: string }` — shared across locales, rendered in a monospace `<pre>`
  - `{ type: 'img', src: string, alt?: BlogText }` — shared across locales

### ⚠️ Code-block escaping (this bites EVERY time)

`blocks[].code` is a **template literal** in a `.ts` file, so anything the JS parser
treats specially must be escaped **in the source**:

| You want to display | Write in `blog.ts` |
|---|---|
| `` ` `` (backtick) | `` \` `` |
| `${x}` (interpolation) | `\${x}` |
| `\` (a literal backslash, e.g. regex `\.`) | `\\` (so displayed `\.` → source `\\.`) |

Real examples already in the file:
```ts
{ type: 'code', code: `fileName: format => \`design-system-ui.\${format}.js\`` }
{ type: 'code', code: `config.headers.Authorization = \`Bearer \${ACCESS_TOKEN}\`;` }
```

**Safety net:** `pnpm build` imports `blog.ts`; a missed escape throws a `ReferenceError`
(unescaped `${...}`) or a syntax error at build. Always run the build after adding code blocks.

## 3. Lead media — first match wins (see `BlogPostView`)

The article top renders exactly one lead, in this precedence:

1. `youtube: '<id>'` → inline `youtube-nocookie` embed (opens in-page, never leaves the blog).
2. `video: '/blog/<name>.mp4'` → inline `<video>` with native controls; poster = `image`.
3. `images: ['/blog/a.jpeg', …]` (>1) → **BlogGallery** carousel + lightbox.
4. `image: '/blog/<name>.jpeg'` → single hero.

`image` is always the **card thumbnail** (and the video poster) — set it even when a
`video`/`youtube` lead is present. For a YouTube post, use the thumbnail
(`https://i.ytimg.com/vi/<id>/hqdefault.jpg`) saved locally under `public/blog/`.

## 4. Media — `public/blog/`

Committed frames sit in `public/blog/` with clean names (`ewor.jpeg`, `run-leiria-2.jpeg`).
**Raw source stays local & gitignored.** Fit is `object-contain` — any aspect ratio is fine.
Heavy PNGs → downscale/convert to WebP (see `new-project`). Reuse a project image when it
fits (e.g. an Airbnb shot) rather than duplicating.

## 5. Draft vs published

`status: 'draft'` hides the post from the index, the prerender **and** the sitemap
(both derived from published posts in `vite.config.ts` — no manual list), and the router
guard 404s its URL in prod. Drafts are visible **only on localhost** (`useBlog` +
`import.meta.env.DEV`). Omit `status` to publish.

## 6. Verify

```bash
# every referenced image/video exists and is non-empty
node -e "const fs=require('fs');const s=fs.readFileSync('src/data/blog.ts','utf8');\
[...new Set([...s.matchAll(/'(\/blog\/[^']+\.(png|jpg|jpeg|webp|mp4))'/g)].map(m=>m[1]))]\
.forEach(p=>console.log((fs.existsSync('public'+p)&&fs.statSync('public'+p).size>1000)?'ok':'MISSING',p))"

pnpm type-check
VITEST=1 npx vitest run --project '!storybook'   # specs mock @/data/blog — a fixture
pnpm build                                        # catches code-block escape errors + confirms sitemap/prerender
```

Then run **visual-check** on the new post page at desktop + mobile — confirm the lead
media (embed/video/gallery/hero) renders and, for multi-image posts, the gallery + lightbox work.

## ⚠️ Gotchas

1. **Never `git add -A`** — the user drops raw captures/videos into `public/blog/` (often for
   future posts). Stage explicitly (`git add src/data/blog.ts public/blog/<clean>.jpeg`).
   See the `project-media-staging` memory.
2. **`body` XOR `blocks`** — a post with both renders `blocks` and silently ignores `body`.
3. **Don't forget the six locales** on `title`/`excerpt`/`category` — a missing key falls back
   but reads wrong in that language. `blocks[].text` only needs `en`.

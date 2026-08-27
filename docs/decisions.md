# Decisions

Short rationale for the choices that shape the codebase (ADR-lite).

### 1. Design system first — "Ethereal Precision", tokens only
Dark, geometric, high-contrast. All colour/type/space live as Tailwind `@theme` tokens so
components use utilities and stay consistent. Published as its own Storybook site
(design.denisibanez.dev). **Why:** one source of truth; no drifting hex values.

### 2. Poppins everywhere; serif + gold reserved for emphasis
The whole site is Poppins + greyscale. A **Playfair** serif token and a **gold `tertiary`** accent
exist but are used sparingly — the case-study eyebrow and the active tab. **Why:** a restrained
accent reads as intentional; overusing it would cheapen it.

### 3. Static now, data-driven later — Pinia & axios scaffolded
Content lives in composables/data; `stores/counter.ts` and `services/http.ts` are unused
scaffolding kept as the pattern. **Why:** ship a fast static site now; when projects/testimonials/
blog come from endpoints, fetch via `services/http` into Pinia without changing component APIs.

### 4. Two Vercel projects — app vs design system
The app (`denisibanez.dev`) auto-deploys via Vercel's Git integration. Storybook
(`design.denisibanez.dev`) is a separate project published by a GitHub Action from the prebuilt
`storybook-static` folder. **Why:** the app's `vercel.json` SPA rewrite breaks static Storybook,
and deploying from inside the repo targets the app project. Keep them independent.

### 5. Projects model — status, kind, dates
Projects carry `status` (published/draft — drafts hidden and 404), `kind` (study/client — drives
filter tabs and the study-only "View on GitHub" action), and `startDate`/`endDate` (`YYYY-MM`,
drive newest-first ordering and the derived timeline). **Why:** editorial control + real ordering
without a CMS yet.

### 6. Reusable primitives over per-page markup
`BaseCarousel`, `BaseTabs`, `MediaBackdrop` and the composables (`useRise`, `useProjectRoute`,
`useAudioPlayer`) replace copy-pasted markup/logic. **Why:** one place to fix and test; pages stay thin.

### 7. Full coverage per unit + i18n for all copy
Every unit has a story + spec; flows have e2e; every string is translated to six locales.
**Why:** confidence to refactor, and a genuinely international portfolio.

### 8. MCP server as a Vercel serverless function
`api/mcp.ts` exposes the portfolio over Streamable HTTP (`@modelcontextprotocol/sdk`),
stateless (fresh `McpServer` per request — Vercel functions share no memory between
invocations). Read-only tools (`get_profile`, `get_projects`, `get_project`,
`get_blog_posts`, `get_blog_post`, `get_testimonials`, `get_faq`) are grounded only in data
that already exists in `src/data/*`/`src/config/site.ts`; `api/_lib/*` mirrors that data
layer 1:1 (draft filtering re-implemented without the `import.meta.env.DEV` escape hatch
the Vue composables use — there's no reliable "dev" signal in a deployed function, so the
public endpoint must never preview drafts). The locale-fallback rule was extracted from
`useLocalize` into `src/utils/localizeText/localizeText.ts` so both the Vue app and the
API share one source of truth. **Why:** additive to the static SSG build (Vercel deploys
`/api` independently of `dist`).

An eighth tool, `contact_denis`, delivers a project brief straight to WhatsApp via
CallMeBot (`api/_lib/contact.ts`) — a free, unofficial personal-use API (not Meta's
official WhatsApp Business Cloud API, which would need business verification and template
approval). Only `CALLMEBOT_API_KEY` is a secret; the phone number reuses `site.whatsapp`
(already public — it backs the site's own `wa.me` link). Since this tool is public,
unauthenticated and triggers a real side effect, `api/_lib/rateLimit.ts` caps it at 3
calls/hour per IP (in-memory, best-effort — resets on cold start, not shared across
concurrent instances) via a check in `api/mcp.ts` before the request ever reaches the MCP
transport; the read-only tools are deliberately not rate-limited.

`src/views/ConnectView/ConnectView.vue` (route `/connect`, linked from the footer next to
the socials) is the human-facing discoverability page: the endpoint URL, per-client setup
steps (Claude/ChatGPT/Cursor — kept literal/untranslated, same treatment as other
product-referential strings like cert titles), and the tool list.

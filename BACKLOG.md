# Backlog — Denis Ibañez Portfolio

Prioritised list of what's left. ✅ = done · ⏳ = to do.

## Done ✅
- Vue 3 + TS + Vite scaffold, pnpm, ESLint/oxlint + Prettier + Husky.
- Design system "Ethereal Precision" (Tailwind v4 `@theme` tokens) + `DESIGN-SYSTEM.md`.
- Router (nested + `DefaultLayout`), Pinia, vue-i18n (EN/PT/ES/DE/FR/JA).
- Components (story + unit test): `AppNav`, `BaseButton`, `LanguageSelect`, `LoadingReveal`.
- Hero: background **video → banner cross-fade** (no flicker), animated text (motion-v).
- Boot **loading screen** (`useInitialLoad` + `LoadingReveal`) with fade-out.
- Banner star removed; PT flag = 🇧🇷.
- Storybook (styled), Vitest + Playwright, **CI pipeline** (`.github/workflows/ci.yml`).
- Skills: `new-component`, `visual-check`, `open-pr`, `figma-export`, `deploy`, `design-tokens`, `story-and-test`.
- Deploy on **Vercel**.

## Now — quick wins ⏳
- **SEO / link preview** ⭐ — meta `description`, canonical, and **Open Graph + Twitter Card** (`og:title/description/image/url`, `twitter:card=summary_large_image`) in `index.html` so pasting the link shows a rich preview. Add an `og-image` (share banner ~1200×630). Also `robots.txt` + `sitemap.xml`.
- **404 page** — catch-all route (`/:pathMatch(.*)*`) → `NotFoundView` (design-system styled, link home).
- **Extract hardcoded config** — social links + WhatsApp number (currently in `DefaultLayout`) → `src/config/site.ts` (single source).
- **prefers-reduced-motion** — gate motion-v entrances + loader dots behind the media query.

## Soon ⏳
- **Sections**: About, Projects, Testimonials, Contact (nested routes under `DefaultLayout`).
- **Toast feedback** — `useToast` composable + `<ToastHost>` (for the contact form: success/error, "link copied"). Backend-for-calculations style: UI only triggers/displays.
- **Contact form + axios interceptor** — wire `services/http.ts` interceptors to a real endpoint (e.g. email/service or Vercel serverless function); handle loading/error via toast.
- **Video optimisation** — poster frame, compress `video-home.mp4`, `preload="metadata"`, lazy below-the-fold assets.

## Later ⏳
- **Per-route SEO** — if dynamic OG per section is needed, add prerender (`vite-plugin-prerender`/vike) since SPA OG relies on the static `index.html`.
- **Analytics** — Vercel Analytics or Plausible.
- **Visual regression** — Playwright `toHaveScreenshot` or Chromatic on top of the current browser tests.
- **i18n coverage** — audit all copy goes through `vue-i18n`; add a language-persistence (localStorage) + `<html lang>` sync.

---

## Opinion / architecture notes

- **Architecture is right-sized.** For a single-surface portfolio the current layout (`views` / `components` / `composables` / `stores` / `services` / `i18n` / `layouts`) is clean — **don't over-engineer** (no feature-modules/DDD needed). Just add a `config/` for constants.
- **Interceptor**: the `http.ts` stub is fine now; it only earns its keep once there's a real API (contact form). Wire it then, not before.
- **Toast**: worth it, but tied to the contact form — build them together.
- **404**: cheap, do it now.
- **SEO is the highest-leverage item for a portfolio** (recruiters share/paste the link) — prioritise the Open Graph tags.

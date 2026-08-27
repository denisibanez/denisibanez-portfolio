// Relative import (not the `@/` alias): api/ is bundled separately by Vercel's
// Node function builder, which doesn't resolve Vite's alias config — same
// reasoning `vite.config.ts` itself uses relative imports into `src/`.
import { site } from '../../src/config/site'

export type Profile = {
  name: string
  role: string
  url: string
  description: string
  resumeUrl: string
  socials: { label: string; href: string }[]
}

/** Static profile summary — no locale param, `site.ts` copy is English-only. */
export const getProfile = (): Profile => ({
  name: site.name,
  role: site.role,
  url: site.url,
  description: site.description,
  resumeUrl: `${site.url}${site.resumeUrl}`,
  socials: site.socials.map((s) => ({ label: s.label, href: s.href })),
})

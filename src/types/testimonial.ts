import type { Locale } from '@/i18n'

/** Text provided per supported locale (quotes are real, so translated 1:1). */
export type LocalizedText = Record<Locale, string>

export type Testimonial = {
  quote: LocalizedText
  full: LocalizedText
  name: string
  role: string
  photo?: string
  /** LinkedIn (or other) profile — the name links here in the detail modal. */
  link?: string
}

import type { Locale } from '../../src/i18n'
import { testimonials } from '../../src/data/testimonials'
import { site } from '../../src/config/site'
import { localizeText } from '../../src/utils/localizeText/localizeText'

const absolutize = (path: string): string => `${site.url}${path}`

export type TestimonialSummary = {
  quote: string
  full: string
  name: string
  role: string
  photo?: string
  link?: string
}

/** All testimonials are public — no draft/status concept for this data source. */
export const listTestimonials = (locale: Locale): TestimonialSummary[] =>
  testimonials.map((t) => ({
    quote: localizeText(t.quote, locale),
    full: localizeText(t.full, locale),
    name: t.name,
    role: t.role,
    photo: t.photo ? absolutize(t.photo) : undefined,
    link: t.link,
  }))

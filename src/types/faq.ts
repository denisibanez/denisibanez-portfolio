import type { LocalizedText } from '@/types/project'

/** A single frequently-asked question — feeds the About page FAQ section and FAQPage JSON-LD. */
export type FaqItem = {
  question: LocalizedText
  answer: LocalizedText
}

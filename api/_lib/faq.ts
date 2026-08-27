import type { Locale } from '../../src/i18n'
import { faq } from '../../src/data/faq'
import { localizeText } from '../../src/utils/localizeText/localizeText'

export type FaqEntry = { question: string; answer: string }

export const listFaq = (locale: Locale): FaqEntry[] =>
  faq.map((item) => ({
    question: localizeText(item.question, locale),
    answer: localizeText(item.answer, locale),
  }))

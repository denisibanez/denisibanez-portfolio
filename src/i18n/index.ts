import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import ja from './locales/ja.json'

export const SUPPORTED_LOCALES = ['en', 'pt', 'es', 'de', 'fr', 'ja'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, pt, es, de, fr, ja },
})

export default i18n

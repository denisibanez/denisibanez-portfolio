import { useI18n } from 'vue-i18n'
import type { Locale } from '@/i18n'

/**
 * Picks the value for the active locale from a `Record<Locale, T>` map, falling
 * back to English then Portuguese. Used for content that is translated 1:1
 * (project copy, testimonial quotes) rather than routed through message keys.
 */
export const useLocalize = () => {
  const { locale } = useI18n()
  const localized = <T>(map: Record<Locale, T>): T =>
    map[locale.value as Locale] ?? map.en ?? map.pt
  return { localized }
}

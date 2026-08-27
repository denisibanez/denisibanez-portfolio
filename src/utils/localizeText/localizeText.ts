import type { Locale } from '@/i18n'

/**
 * Picks the value for a locale from a per-locale map, falling back to English
 * then Portuguese. Shared by `useLocalize` (Vue) and the MCP API handlers
 * (plain Node) — kept framework-agnostic so both can own the same rule.
 */
export const localizeText = <T>(map: Partial<Record<Locale, T>> & { en: T }, locale: Locale): T =>
  map[locale] ?? map.en ?? (map.pt as T)

import type { BlogPost } from '@/types/blog'
import type { LocalizedText, LocalizedList } from '@/types/project'

// Stable fixture for the blog specs — decoupled from real content.
const L = (s: string): LocalizedText => ({ en: s, pt: s, es: s, de: s, fr: s, ja: s })
const LL = (a: string[]): LocalizedList => ({ en: a, pt: a, es: a, de: a, fr: a, ja: a })

export const posts: BlogPost[] = [
  { slug: 'alpha', date: '2024-01-01', readingMinutes: 5, tags: ['x'], category: L('Theory'), title: L('Alpha'), excerpt: L('Alpha excerpt.'), body: LL(['Alpha body.']) },
  { slug: 'beta', date: '2025-01-01', readingMinutes: 3, tags: ['y'], category: L('Eng'), title: L('Beta'), excerpt: L('Beta excerpt.'), body: LL(['Beta body.']) },
  { slug: 'gamma', date: '2023-01-01', readingMinutes: 4, tags: ['z'], category: L('Career'), title: L('Gamma'), excerpt: L('Gamma excerpt.'), body: LL(['Gamma body.']) },
  { slug: 'delta-draft', status: 'draft', date: '2025-06-01', readingMinutes: 2, tags: ['w'], category: L('Draft'), title: L('Delta'), excerpt: L('Delta excerpt.'), body: LL(['Delta body.']) },
]

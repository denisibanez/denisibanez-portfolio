import { posts } from '@/data/blog'
import type { BlogPost } from '@/types/blog'

// Newest first (dates are `YYYY-MM-DD`, so string-sortable).
const byDateDesc = (a: BlogPost, b: BlogPost): number => b.date.localeCompare(a.date)

/**
 * Shared access to the blog posts, ordered newest-first, with a slug lookup and
 * a featured/rest split for the index layout.
 */
export const useBlog = () => {
  const all = [...posts].sort(byDateDesc)
  const featured = all.find((p) => p.featured) ?? all[0] ?? null
  const rest = all.filter((p) => p !== featured)

  const getBySlug = (slug: string): BlogPost | null => all.find((p) => p.slug === slug) ?? null

  return { posts: all, featured, rest, getBySlug }
}

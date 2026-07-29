import { posts } from '@/data/blog'
import type { BlogPost } from '@/types/blog'

// Drafts are visible while developing (localhost) so work-in-progress can be
// previewed, but hidden in the production build (and excluded from the
// prerender/sitemap in vite.config) — same rule as projects.
const isVisible = (post: BlogPost): boolean => post.status !== 'draft' || import.meta.env.DEV

// Newest first (dates are `YYYY-MM-DD`, so string-sortable).
const byDateDesc = (a: BlogPost, b: BlogPost): number => b.date.localeCompare(a.date)

/**
 * Shared access to the VISIBLE blog posts (published everywhere; drafts only in
 * dev), ordered newest-first, with a slug lookup. Hidden posts aren't resolvable
 * by slug, so their pages 404 in production.
 */
export const useBlog = () => {
  const visible = posts.filter(isVisible).sort(byDateDesc)

  const getBySlug = (slug: string): BlogPost | null => visible.find((p) => p.slug === slug) ?? null

  return { posts: visible, getBySlug }
}

/** Shared "not found" shape for any by-slug lookup tool (`get_project`, `get_blog_post`). */
export type NotFound = { error: 'not_found'; slug: string }

export const notFound = (slug: string): NotFound => ({ error: 'not_found', slug })

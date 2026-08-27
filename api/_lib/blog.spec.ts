import { describe, it, expect, vi } from 'vitest'
import type { BlogPost } from '../../src/types/blog'

const text = (en: string) => ({ en, pt: en, es: en, de: en, fr: en, ja: en })
const list = (items: string[]) => ({ en: items, pt: items, es: items, de: items, fr: items, ja: items })

const fixture: BlogPost[] = [
  {
    slug: 'published-post',
    title: text('Published Post'),
    excerpt: text('An excerpt.'),
    category: text('Engineering'),
    body: list(['First paragraph.', 'Second paragraph.']),
    date: '2024-06-01',
    readingMinutes: 4,
    tags: ['vue'],
  },
  {
    slug: 'rich-post',
    title: text('Rich Post'),
    excerpt: text('Rich excerpt.'),
    category: text('Engineering'),
    blocks: [
      { type: 'h2', text: text('Heading') },
      { type: 'p', text: text('Body text.') },
      { type: 'code', code: 'const x = 1' },
      { type: 'img', src: '/blog/rich-post/shot.png', alt: text('A screenshot') },
    ],
    date: '2024-07-01',
    readingMinutes: 6,
    tags: ['react'],
  },
  {
    slug: 'draft-post',
    status: 'draft',
    title: text('Draft Post'),
    excerpt: text('Secret excerpt.'),
    category: text('Engineering'),
    body: list(['Secret paragraph.']),
    date: '2025-01-01',
    readingMinutes: 2,
    tags: [],
  },
]

vi.mock('../../src/data/blog', () => ({ posts: fixture }))

const { isPublished, listBlogPosts, getBlogPost } = await import('./blog')

describe('isPublished', () => {
  it('excludes draft posts', () => {
    expect(isPublished(fixture[0]!)).toBe(true)
    expect(isPublished(fixture[2]!)).toBe(false)
  })
})

describe('listBlogPosts', () => {
  it('never includes a draft post, newest first', () => {
    const slugs = listBlogPosts('en').map((p) => p.slug)
    expect(slugs).toEqual(['rich-post', 'published-post'])
    expect(slugs).not.toContain('draft-post')
  })
})

describe('getBlogPost', () => {
  it('returns not-found for a draft slug — never the draft content', () => {
    expect(getBlogPost('draft-post', 'en')).toEqual({ error: 'not_found', slug: 'draft-post' })
  })

  it('returns not-found for an unknown slug', () => {
    expect(getBlogPost('nope', 'en')).toEqual({ error: 'not_found', slug: 'nope' })
  })

  it('flattens `body` paragraphs into `p` content blocks', () => {
    const result = getBlogPost('published-post', 'en')
    expect(result).toMatchObject({
      content: [
        { type: 'p', text: 'First paragraph.' },
        { type: 'p', text: 'Second paragraph.' },
      ],
    })
  })

  it('normalizes `blocks` (heading/code/image) and absolutizes image src', () => {
    const result = getBlogPost('rich-post', 'en')
    expect(result).toMatchObject({
      content: [
        { type: 'h2', text: 'Heading' },
        { type: 'p', text: 'Body text.' },
        { type: 'code', code: 'const x = 1' },
        { type: 'img', src: 'https://denisibanez.dev/blog/rich-post/shot.png', alt: 'A screenshot' },
      ],
    })
  })
})

import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { SUPPORTED_LOCALES } from '../../src/i18n'
import { getProfile } from './profile'
import { listProjects, getProject } from './projects'
import { listBlogPosts, getBlogPost } from './blog'
import { listTestimonials } from './testimonials'
import { listFaq } from './faq'
import { sendContactMessage } from './contact'

const localeSchema = z.enum(SUPPORTED_LOCALES).optional().describe('Response language. Defaults to English.')

// Every tool returns JSON as a single text block — simple, universally
// parseable, and avoids registering a matching Zod outputSchema per tool.
const json = (data: unknown): CallToolResult => ({
  content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  isError: typeof data === 'object' && data !== null && 'error' in data,
})

/**
 * Builds a fresh MCP server with the portfolio's read-only tools registered.
 * Called once per request in `api/mcp.ts` (stateless mode) — cheap, since
 * every tool handler just reads from `src/data/*` in memory.
 */
export const createMcpServer = (): McpServer => {
  const server = new McpServer({ name: 'denisibanez-portfolio', version: '1.0.0' })

  server.registerTool(
    'get_profile',
    { description: "Denis Ibañez's name, role, summary, résumé link and social profiles." },
    () => json(getProfile()),
  )

  server.registerTool(
    'get_projects',
    {
      description: 'List published portfolio projects (summaries), newest first.',
      inputSchema: { locale: localeSchema, kind: z.enum(['study', 'client']).optional() },
    },
    ({ locale, kind }) => json(listProjects(locale ?? 'en', kind)),
  )

  server.registerTool(
    'get_project',
    {
      description: 'Full detail for one published project by slug (from get_projects).',
      inputSchema: { slug: z.string(), locale: localeSchema },
    },
    ({ slug, locale }) => json(getProject(slug, locale ?? 'en')),
  )

  server.registerTool(
    'get_blog_posts',
    {
      description: 'List published blog posts (summaries), newest first.',
      inputSchema: { locale: localeSchema },
    },
    ({ locale }) => json(listBlogPosts(locale ?? 'en')),
  )

  server.registerTool(
    'get_blog_post',
    {
      description: 'Full content of one published blog post by slug (from get_blog_posts).',
      inputSchema: { slug: z.string(), locale: localeSchema },
    },
    ({ slug, locale }) => json(getBlogPost(slug, locale ?? 'en')),
  )

  server.registerTool(
    'get_testimonials',
    {
      description: "Testimonials from Denis Ibañez's clients and colleagues.",
      inputSchema: { locale: localeSchema },
    },
    ({ locale }) => json(listTestimonials(locale ?? 'en')),
  )

  server.registerTool(
    'get_faq',
    {
      description: 'Frequently asked questions about Denis Ibañez and how he works.',
      inputSchema: { locale: localeSchema },
    },
    ({ locale }) => json(listFaq(locale ?? 'en')),
  )

  server.registerTool(
    'contact_denis',
    {
      description:
        'Send a project brief or message directly to Denis Ibañez — delivered immediately. Use when someone wants to get in touch about work.',
      inputSchema: {
        name: z.string().min(1).max(200).describe('The sender’s name.'),
        contact: z.string().min(1).max(200).describe('Email, phone, or LinkedIn — how Denis should reply.'),
        message: z.string().min(1).max(2000).describe('The brief or message itself.'),
      },
    },
    async ({ name, contact, message }) => json(await sendContactMessage({ name, contact, message })),
  )

  return server
}

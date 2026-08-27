import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'

vi.mock('./contact', () => ({
  sendContactMessage: vi.fn<() => Promise<{ ok: true }>>().mockResolvedValue({ ok: true }),
}))

const { createMcpServer } = await import('./createMcpServer')
const { sendContactMessage } = await import('./contact')

let client: Client

beforeEach(async () => {
  const server = createMcpServer()
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
  client = new Client({ name: 'test-client', version: '1.0.0' })
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
})

afterEach(async () => {
  await client.close()
})

const callJson = async (name: string, args: Record<string, unknown> = {}) => {
  const result = await client.callTool({ name, arguments: args })
  const content = result.content as { type: string; text: string }[]
  return JSON.parse(content[0]!.text)
}

describe('createMcpServer', () => {
  it('registers the 7 read-only content tools plus contact_denis', async () => {
    const { tools } = await client.listTools()
    expect(tools.map((t) => t.name).sort()).toEqual(
      [
        'contact_denis',
        'get_blog_post',
        'get_blog_posts',
        'get_faq',
        'get_profile',
        'get_project',
        'get_projects',
        'get_testimonials',
      ].sort(),
    )
  })

  it('get_profile returns the site identity', async () => {
    const profile = await callJson('get_profile')
    expect(profile.name).toBe('Denis Ibañez')
  })

  it('get_projects returns a list, and get_project resolves one by slug', async () => {
    const projects = await callJson('get_projects')
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)

    const detail = await callJson('get_project', { slug: projects[0].slug })
    expect(detail.slug).toBe(projects[0].slug)
  })

  it('get_project returns a not-found error result for an unknown slug', async () => {
    const result = await client.callTool({ name: 'get_project', arguments: { slug: 'does-not-exist' } })
    expect(result.isError).toBe(true)
  })

  it('get_faq returns localized questions and answers', async () => {
    const faq = await callJson('get_faq', { locale: 'pt' })
    expect(faq.length).toBeGreaterThan(0)
    expect(faq[0]).toHaveProperty('question')
    expect(faq[0]).toHaveProperty('answer')
  })

  it('contact_denis delegates to sendContactMessage with the given fields', async () => {
    const result = await callJson('contact_denis', { name: 'Jane', contact: 'jane@example.com', message: 'Hi' })
    expect(result).toEqual({ ok: true })
    expect(sendContactMessage).toHaveBeenCalledWith({ name: 'Jane', contact: 'jane@example.com', message: 'Hi' })
  })

  it('contact_denis rejects an empty message via the input schema', async () => {
    const result = await client.callTool({
      name: 'contact_denis',
      arguments: { name: 'Jane', contact: 'jane@example.com', message: '' },
    })
    expect(result.isError).toBe(true)
  })
})

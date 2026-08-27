import { describe, it, expect, vi } from 'vitest'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isRateLimited } from './_lib/rateLimit'

// This file tests only the HTTP-adapter boundary (CORS, OPTIONS, rate limiting)
// — full MCP protocol behavior (tool registration/calls) is already covered by
// createMcpServer.spec.ts via the SDK's in-memory transport. Mocking the real
// transport here avoids needing a fully-featured fake Node ServerResponse.
class FakeTransport {
  close = vi.fn<() => void>()
  handleRequest = vi.fn<() => Promise<void>>().mockResolvedValue(undefined)
}
vi.mock('@modelcontextprotocol/sdk/server/streamableHttp.js', () => ({ StreamableHTTPServerTransport: FakeTransport }))
vi.mock('./_lib/createMcpServer', () => ({
  createMcpServer: vi
    .fn<() => { connect: () => Promise<void>; close: () => void }>()
    .mockReturnValue({ connect: vi.fn<() => Promise<void>>().mockResolvedValue(undefined), close: vi.fn<() => void>() }),
}))

const { default: handler } = await import('./mcp')

const fakeRes = () => {
  const headers: Record<string, string> = {}
  const res: Record<string, unknown> = { headers }
  res.setHeader = vi.fn<(key: string, value: string) => void>((key, value) => {
    headers[key] = value
  })
  res.status = vi.fn<(code: number) => typeof res>(() => res)
  res.json = vi.fn<(body: unknown) => typeof res>(() => res)
  res.end = vi.fn<() => void>()
  res.on = vi.fn<(event: string, cb: () => void) => void>()
  return res as unknown as VercelResponse & { headers: Record<string, string> }
}

const fakeReq = (overrides: Partial<VercelRequest> = {}): VercelRequest =>
  ({ method: 'POST', headers: {}, socket: { remoteAddress: '203.0.113.1' }, ...overrides }) as VercelRequest

const contactCallBody = (id: number) => ({
  jsonrpc: '2.0',
  id,
  method: 'tools/call',
  params: { name: 'contact_denis', arguments: { name: 'Jane', contact: 'jane@example.com', message: 'Hi' } },
})

describe('mcp handler', () => {
  it('sets CORS headers on every response', async () => {
    const res = fakeRes()
    await handler({ method: 'OPTIONS' } as VercelRequest, res)
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*')
    expect(res.headers['Access-Control-Allow-Methods']).toContain('POST')
    expect(res.headers['Mcp-Session-Id']).toBeUndefined()
    expect(res.headers['Access-Control-Expose-Headers']).toBe('Mcp-Session-Id')
  })

  it('short-circuits OPTIONS with a 204, without touching the MCP transport', async () => {
    const res = fakeRes()
    await handler({ method: 'OPTIONS' } as VercelRequest, res)
    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.end).toHaveBeenCalled()
    expect(res.on).not.toHaveBeenCalled()
  })

  it('rate-limits repeated contact_denis calls from the same IP with a 429, without touching the transport', async () => {
    const ip = `198.51.100.${Math.floor(Math.random() * 255)}`
    // Exhaust the bucket directly (same key the handler derives from the IP).
    isRateLimited(`contact:${ip}`)
    isRateLimited(`contact:${ip}`)
    isRateLimited(`contact:${ip}`)

    const res = fakeRes()
    await handler(fakeReq({ body: contactCallBody(1), socket: { remoteAddress: ip } as never }), res)

    expect(res.status).toHaveBeenCalledWith(429)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, error: expect.objectContaining({ code: -32000 }) }),
    )
    expect(res.on).not.toHaveBeenCalled()
  })

  it('does not rate-limit calls to the read-only tools', async () => {
    const ip = `198.51.100.${Math.floor(Math.random() * 255)}`
    isRateLimited(`contact:${ip}`)
    isRateLimited(`contact:${ip}`)
    isRateLimited(`contact:${ip}`)
    isRateLimited(`contact:${ip}`) // this IP is now well over the contact-only limit

    const res = fakeRes()
    const body = { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'get_faq', arguments: {} } }
    await handler(fakeReq({ body, socket: { remoteAddress: ip } as never }), res)

    expect(res.status).not.toHaveBeenCalledWith(429)
  })
})

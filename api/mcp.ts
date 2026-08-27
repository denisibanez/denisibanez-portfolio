import type { VercelRequest, VercelResponse } from '@vercel/node'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { createMcpServer } from './_lib/createMcpServer'
import { isRateLimited } from './_lib/rateLimit'

const setCorsHeaders = (res: VercelResponse): void => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Session-Id, Authorization')
  res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id')
}

type JsonRpcBody = { id?: string | number | null; method?: string; params?: { name?: string } }

const isContactToolCall = (body: unknown): body is JsonRpcBody => {
  const b = body as JsonRpcBody | undefined
  return b?.method === 'tools/call' && b?.params?.name === 'contact_denis'
}

const clientIp = (req: VercelRequest): string => {
  const forwarded = req.headers['x-forwarded-for']
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return first?.trim() || req.socket?.remoteAddress || 'unknown'
}

/**
 * MCP endpoint over Streamable HTTP, in STATELESS mode: a fresh server +
 * transport per invocation, since Vercel functions share no memory across
 * calls (no `sessionIdGenerator`, per the SDK's documented stateless example).
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  // Only the contact tool is rate-limited — it's the one public, unauthenticated
  // action that triggers a real-world side effect (a WhatsApp message).
  if (isContactToolCall(req.body) && isRateLimited(`contact:${clientIp(req)}`)) {
    res.status(429).json({
      jsonrpc: '2.0',
      id: req.body?.id ?? null,
      error: { code: -32000, message: 'Too many contact requests. Please try again later.' },
    })
    return
  }

  const server = createMcpServer()
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })

  res.on('close', () => {
    void transport.close()
    void server.close()
  })

  await server.connect(transport)
  await transport.handleRequest(req, res, req.body)
}

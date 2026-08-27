import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sendContactMessage } from './contact'

const brief = { name: 'Jane', contact: 'jane@example.com', message: 'Interested in a project.' }

describe('sendContactMessage', () => {
  beforeEach(() => {
    vi.stubEnv('CALLMEBOT_API_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('returns not-configured when the API key is missing', async () => {
    vi.unstubAllEnvs()
    const result = await sendContactMessage(brief)
    expect(result).toEqual({ ok: false, error: 'Contact channel is not configured yet.' })
  })

  it('calls the CallMeBot endpoint with phone, text and apikey, and reports success', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({ ok: true, text: () => Promise.resolve('Message queued') } as Response)
    vi.stubGlobal('fetch', fetchMock)

    const result = await sendContactMessage(brief)

    expect(result).toEqual({ ok: true })
    const calledUrl = new URL(fetchMock.mock.calls[0]![0] as string)
    expect(calledUrl.origin + calledUrl.pathname).toBe('https://api.callmebot.com/whatsapp.php')
    expect(calledUrl.searchParams.get('apikey')).toBe('test-key')
    expect(calledUrl.searchParams.get('text')).toContain('Jane')
  })

  it('reports failure on a non-ok HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503, text: () => Promise.resolve('') }))
    const result = await sendContactMessage(brief)
    expect(result).toEqual({ ok: false, error: 'HTTP 503' })
  })

  it('reports failure when the response body signals an error even on HTTP 200', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('Error: invalid apikey') }))
    const result = await sendContactMessage(brief)
    expect(result.ok).toBe(false)
  })
})

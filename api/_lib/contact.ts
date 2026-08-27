import { site } from '../../src/config/site'

export type ContactBrief = { name: string; contact: string; message: string }
export type ContactResult = { ok: true } | { ok: false; error: string }

const CALLMEBOT_URL = 'https://api.callmebot.com/whatsapp.php'

/**
 * Delivers a contact brief straight to Denis's WhatsApp via CallMeBot — a
 * free, unofficial personal-use API (not affiliated with Meta/WhatsApp):
 * https://www.callmebot.com/blog/free-api-whatsapp-messages/. The phone
 * number is `site.whatsapp` (already public — it backs the site's own
 * wa.me link); only the personal API key is a secret (`CALLMEBOT_API_KEY`).
 */
export const sendContactMessage = async (brief: ContactBrief): Promise<ContactResult> => {
  const apiKey = process.env.CALLMEBOT_API_KEY
  if (!apiKey) return { ok: false, error: 'Contact channel is not configured yet.' }

  const text = `New portfolio lead\nName: ${brief.name}\nContact: ${brief.contact}\n\n${brief.message}`
  const params = new URLSearchParams({ phone: `+${site.whatsapp}`, text, apikey: apiKey })

  const res = await fetch(`${CALLMEBOT_URL}?${params}`)
  const body = await res.text()
  if (!res.ok || /error/i.test(body)) return { ok: false, error: body || `HTTP ${res.status}` }
  return { ok: true }
}

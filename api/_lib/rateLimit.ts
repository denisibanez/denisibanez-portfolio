type Bucket = { count: number; windowStart: number }

// Module-level (not per-request) — persists for the lifetime of a warm Vercel
// function instance. Best-effort only: resets on cold start and isn't shared
// across concurrent instances. Good enough to blunt simple bot abuse on a
// public, unauthenticated, action-triggering tool without adding a database.
const buckets = new Map<string, Bucket>()

const HOUR_MS = 60 * 60 * 1000

/** True once `key` has been called more than `max` times within `windowMs`. */
export const isRateLimited = (key: string, max = 3, windowMs = HOUR_MS): boolean => {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now })
    return false
  }
  bucket.count += 1
  return bucket.count > max
}

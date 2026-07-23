import axios from 'axios'

/**
 * Shared axios instance — scaffolding, not used yet.
 * The site is currently static (content lives in composables/data). This is
 * ready for when projects/testimonials/blog data come from real endpoints:
 * point requests at the API via VITE_API_BASE_URL (falls back to /api for a
 * dev proxy), and feed responses into Pinia stores.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach auth / tracing headers here.
http.interceptors.request.use((config) => config)

// Central error normalisation lives here.
http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default http

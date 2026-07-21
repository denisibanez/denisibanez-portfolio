import axios from 'axios'

/**
 * Shared axios instance. Point requests at the API via VITE_API_BASE_URL
 * (falls back to /api for a dev proxy).
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

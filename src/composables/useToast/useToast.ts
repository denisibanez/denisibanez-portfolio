import { ref } from 'vue'

export type ToastType = 'info' | 'success' | 'warning' | 'error'
export type Toast = { id: number; message: string; type: ToastType }

// Singleton queue shared across the app and the single <ToastHost/>.
const toasts = ref<Toast[]>([])
let seq = 0

const dismiss = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

const notify = (message: string, type: ToastType = 'info', timeout = 5000): number => {
  const id = (seq += 1)
  toasts.value = [...toasts.value, { id, message, type }]
  if (timeout > 0) setTimeout(() => dismiss(id), timeout)
  return id
}

const error = (message: string, timeout = 6000) => notify(message, 'error', timeout)
const success = (message: string, timeout = 4000) => notify(message, 'success', timeout)
const warning = (message: string, timeout = 6000) => notify(message, 'warning', timeout)
const info = (message: string, timeout = 5000) => notify(message, 'info', timeout)

/** Fire-and-forget notifications. Render once with `<ToastHost/>` (in the layout). */
export const useToast = () => ({ toasts, notify, error, success, warning, info, dismiss })

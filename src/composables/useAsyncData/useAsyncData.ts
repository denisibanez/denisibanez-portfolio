import { ref, shallowRef, onMounted } from 'vue'

type Options = { immediate?: boolean }

/**
 * Wraps an async fetcher into `{ data, pending, error, retry }`. Pair with
 * `LoadingState` / `ErrorState`. Runs on mount by default (opt out with
 * `immediate: false`) — the seam for when content comes from `services/http`.
 */
export const useAsyncData = <T>(fetcher: () => Promise<T>, options: Options = {}) => {
  const data = shallowRef<T | null>(null)
  const pending = ref(false)
  const error = ref<Error | null>(null)

  const run = async () => {
    pending.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (cause) {
      error.value = cause instanceof Error ? cause : new Error(String(cause))
    } finally {
      pending.value = false
    }
  }

  if (options.immediate !== false) onMounted(run)

  return { data, pending, error, retry: run }
}

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Scaffold store — kept as the template/pattern for real Pinia stores.
 * Pinia is wired up so that when the site grows dynamic data (e.g. projects,
 * testimonials or blog posts fetched from an API via `services/http`), state
 * lives here instead of in components. Not used by any view yet.
 */
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const increment = () => {
    count.value++
  }

  return { count, doubleCount, increment }
})

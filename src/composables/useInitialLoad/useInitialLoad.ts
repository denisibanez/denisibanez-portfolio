import { onMounted, ref } from 'vue'
import bannerHome from '@/assets/images/banner-home-full.png'

const MIN_DISPLAY_MS = 700

/**
 * Drives the initial loading screen: stays true until the hero banner has loaded
 * (so the reveal has an image to show) and a minimum display time has elapsed.
 */
export const useInitialLoad = () => {
  const isLoading = ref(true)

  onMounted(() => {
    const start = performance.now()

    const finish = () => {
      const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - start))
      window.setTimeout(() => {
        isLoading.value = false
      }, remaining)
    }

    const img = new Image()
    img.onload = finish
    img.onerror = finish
    img.src = bannerHome
    if (img.complete) finish()
  })

  return { isLoading }
}

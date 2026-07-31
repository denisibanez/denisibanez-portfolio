import { ref } from 'vue'

/**
 * Tracks vertical scroll progress (0–100) of an element. Bind the returned
 * `scrollArea` ref to the scrolling container and `onScroll` to its `@scroll`,
 * then feed `scrollProgress` to a `<ScrollProgressBar>`. Shared by the project
 * specs panel and the blog article panel.
 */
export const useScrollProgress = () => {
  const scrollArea = ref<HTMLElement | null>(null)
  const scrollProgress = ref(0)

  const onScroll = () => {
    const el = scrollArea.value
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    scrollProgress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
  }

  return { scrollArea, scrollProgress, onScroll }
}

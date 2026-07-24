/**
 * Subtle upward fade-in for entrance animations (motion-v).
 * Usage: `const { rise } = useRise()` then `<Motion v-bind="rise(0.1)" …>`.
 * Respects `prefers-reduced-motion` — collapses to a no-op (no offset/duration).
 */
export const useRise = () => {
  const prefersReduced =
    typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const rise = (delay: number) => ({
    initial: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : delay, ease: 'easeOut' },
  })

  return { rise }
}

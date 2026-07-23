/**
 * Subtle upward fade-in for entrance animations (motion-v).
 * Usage: `const { rise } = useRise()` then `<Motion v-bind="rise(0.1)" …>`.
 */
export const useRise = () => {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  return { rise }
}

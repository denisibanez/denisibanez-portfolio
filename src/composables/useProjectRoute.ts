import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from './useProjects'
import type { Project } from '@/types/project'

/**
 * Resolves the current project from the route `:slug` (or a `slug` prop
 * override, handy for stories/tests). Shared by the detail and specs pages.
 */
export const useProjectRoute = (slugOverride: () => string | undefined) => {
  const route = useRoute()
  const { getBySlug } = useProjects()

  const slug = computed(() => slugOverride() ?? String(route.params.slug ?? ''))
  const project = computed<Project | null>(() => getBySlug(slug.value))

  return { slug, project }
}

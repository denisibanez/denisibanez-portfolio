import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { useProjects } from '@/composables/useProjects/useProjects'
import { useBlog } from '@/composables/useBlog/useBlog'

// Unknown project slugs land on the real 404 route (never an inline "not found"
// panel) — one consistent not-found experience across the whole app.
export const requireProject = (to: RouteLocationNormalized) => {
  const { getBySlug } = useProjects()
  if (getBySlug(String(to.params.slug))) return true
  // Keep the typed URL; re-match it as the catch-all so NotFoundView renders.
  return { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } }
}

// Same rule for blog posts — unknown slugs hit the real 404.
export const requireBlogPost = (to: RouteLocationNormalized) => {
  const { getBySlug } = useBlog()
  if (getBySlug(String(to.params.slug))) return true
  return { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } }
}

/**
 * Routes are nested under a layout. Each top-level area owns a layout and
 * declares its pages as `children`, e.g.:
 *
 *   {
 *     path: '/',
 *     component: () => import('@/layouts/DefaultLayout.vue'),
 *     children: [
 *       { path: '', name: 'home', component: () => import('@/views/HomeView/HomeView.vue') },
 *     ],
 *   }
 *
 * The catch-all (404) is a top-level route that reuses DefaultLayout so the
 * standard header/footer still wrap the NotFound view.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView/HomeView.vue') },
      { path: 'about', name: 'about', component: () => import('@/views/AboutView/AboutView.vue') },
      { path: 'projects', name: 'projects', component: () => import('@/views/ProjectsView/ProjectsView.vue') },
      {
        path: 'projects/:slug',
        name: 'project-detail',
        beforeEnter: requireProject,
        component: () => import('@/views/ProjectDetailView/ProjectDetailView.vue'),
      },
      {
        path: 'projects/:slug/specs',
        name: 'project-specs',
        beforeEnter: requireProject,
        component: () => import('@/views/ProjectSpecsView/ProjectSpecsView.vue'),
      },
      { path: 'testimonials', name: 'testimonials', component: () => import('@/views/TestimonialsView/TestimonialsView.vue') },
      { path: 'blog', name: 'blog', component: () => import('@/views/BlogView/BlogView.vue') },
      {
        path: 'blog/:slug',
        name: 'blog-post',
        beforeEnter: requireBlogPost,
        component: () => import('@/views/BlogPostView/BlogPostView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [{ path: '', name: 'not-found', component: () => import('@/views/NotFoundView/NotFoundView.vue') }],
  },
]

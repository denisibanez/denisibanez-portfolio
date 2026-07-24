import type { RouteRecordRaw } from 'vue-router'

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
        component: () => import('@/views/ProjectDetailView/ProjectDetailView.vue'),
      },
      {
        path: 'projects/:slug/specs',
        name: 'project-specs',
        component: () => import('@/views/ProjectSpecsView/ProjectSpecsView.vue'),
      },
      { path: 'testimonials', name: 'testimonials', component: () => import('@/views/TestimonialsView/TestimonialsView.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [{ path: '', name: 'not-found', component: () => import('@/views/NotFoundView/NotFoundView.vue') }],
  },
]

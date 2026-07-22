import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/**
 * Routes are nested under a layout. Each top-level area owns a layout and
 * declares its pages as `children`, e.g.:
 *
 *   {
 *     path: '/',
 *     component: () => import('@/layouts/DefaultLayout.vue'),
 *     children: [
 *       { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
 *     ],
 *   }
 *
 * The catch-all (404) is a top-level route that reuses DefaultLayout so the
 * standard header/footer still wrap the NotFound view.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
      { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') },
      { path: 'projects', name: 'projects', component: () => import('@/views/ProjectsView.vue') },
      {
        path: 'projects/:slug',
        name: 'project-detail',
        component: () => import('@/views/ProjectDetailView.vue'),
      },
      { path: 'testimonials', name: 'testimonials', component: () => import('@/views/TestimonialsView.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [{ path: '', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

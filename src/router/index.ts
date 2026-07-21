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
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('@/views/HomeView.vue') }],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

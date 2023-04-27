import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue')
  }
]

export default routes

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/about',
    name: '关于',
    component: () => import('@/views/about.vue')
  }
];

export default routes;

import { createRouter, createWebHashHistory } from 'vue-router';

import baseRouters from './modules/base.ts';

const routes = [...baseRouters];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path:'/client-area',
      name:'clientarea',
      component:()=>import('../views/ClientArea.vue')
    }
  ],
});
export default router;

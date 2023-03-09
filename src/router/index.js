import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const requireClient = async (to, from, next) => {
  const userStore = useUserStore();
  const {cliente}=storeToRefs(userStore)
  if (cliente.value) {
      next();
  } else {
      next("/");
  }
  userStore.loading = false;
};
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
      component:()=>import('../views/ClientArea.vue'),
      beforeEnter: requireClient

    }
  ],
});
export default router;

import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useFirebaseHook } from '../composables/useFirebase';


const requireClient = async (to, from, next) => {
  const userStore = useUserStore();
  const { cliente } = storeToRefs(userStore);
  if (cliente.value) {
    next();
  } else {
    next('/');
  }
  userStore.loading = false;
};
const requireAuth = async (to,from,next)=>{
  const firebase=useFirebaseHook()
  const {currentUser}=firebase
  const user = await currentUser();
    if (user) {
        next();
    } else {
        next("/");
    }
}
const onLogin = async (to,from,next)=>{
  const firebase=useFirebaseHook()
  const {currentUser}=firebase
  const user = await currentUser();
    if (user) {
      next("/admin");
    } else {
      next();
    }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  bas: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter:onLogin,
    },
    {
      path: '/client-area',
      name: 'clientarea',
      component: () => import('../views/ClientArea.vue'),
      beforeEnter: requireClient,
    },
    {
      path: '/cta-cte/:id',
      name: 'ctacte',
      component: () => import('../views/CtaCte.vue'),
      beforeEnter:requireAuth,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/PaneldeControl.vue'),
      beforeEnter:requireAuth,
    },
    {
      path: '/pago',
      name: 'pago',
      component: () => import('../views/Pago.vue'),

    },
    {
      path: '/campo-prueba',
      name: 'campoprueba1',
      component: () => import('../views/CampoPrueba.vue'),

    },
    {
      path: '/editClient',
      name: 'agregarCliente',
      component: () => import('../views/AgregaroEditarCliente.vue'),
      beforeEnter:requireAuth,
    },
    {
      path: '/editClient/:id',
      name: 'editarCliente',
      component: () => import('../views/AgregaroEditarCliente.vue'),
      beforeEnter:requireAuth,
    },
    {
      path: '/cta-cte/agregarUnaFactura/:id',
      name: 'agregarUnaFactura',
      component: () => import('../views/AgregarUnaFactura.vue'),
      beforeEnter:requireAuth,
    },
  ],
});
export default router;

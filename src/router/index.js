import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/components/Register.vue';
import Bucketlists from '@/components/Bucketlists.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'Bucketlist',
      component: Bucketlists,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: 'Register' },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('token') == null) {
      next({ name: 'Register' });
    } else {
      next();
    }
  } else if (window.localStorage.getItem('token') != null) {
    next({ name: 'Bucketlist' });
  } else {
    next();
  }
});


export default router

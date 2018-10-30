import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Bucketlists from '@/components/Bucketlists';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('token')) {
      next();
    } else {
      next({ name: 'Register' });
    }
  } else {
    next();
  }
});

export default router;

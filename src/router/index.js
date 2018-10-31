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
    {
      path: '*',
      redirect: { name: 'Register' },
    },
  ],
});

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

export default router;

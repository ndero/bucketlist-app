import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Bucketlists from '@/components/Bucketlists';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'Bucketlist',
      component: Bucketlists,
    },
  ],
});

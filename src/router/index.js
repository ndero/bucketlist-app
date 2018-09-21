import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Bucketlists from '@/components/Bucketlists';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register,
    },
    {
      path: '/bucketlists',
      name: 'Bucketlist',
      component: Bucketlists,
    },
  ],
});

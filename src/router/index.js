import Vue from 'vue';
import Router from 'vue-router';
import Bucketlists from '@/components/Bucketlists';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Bucketlists',
      component: Bucketlists,
    },
  ],
});

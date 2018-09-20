import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/Bucketlist';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Bucketlist',
      component: HelloWorld,
    },
  ],
});

import { createRouter, createWebHistory } from "vue-router";
import AccountLogin from "@/components/AccountLogin.vue";
import BucketlistItems from "@/components/BucketlistItems.vue";
// import { authStore } from "@/store/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: AccountLogin,
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "BucketlistItems",
      component: BucketlistItems,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "Login" },
    },
  ],
});

// router.beforeEach(async (to, from) => {
//   const store = authStore();
//   if (!store.loggedIn && !to.meta.requiresAuth) {
//     return { name: "Login" };
//   }
// });

export default router;

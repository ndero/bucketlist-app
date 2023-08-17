import { createRouter, createWebHistory } from "vue-router";
import AccountLogin from "@/components/AccountLogin.vue";
import BucketlistItems from "@/components/BucketlistItems.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: AccountLogin,
      meta: { requiresAuth: false },
    },
    {
      path: "/bucketlists",
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

// TODO: add router guard

export default router;

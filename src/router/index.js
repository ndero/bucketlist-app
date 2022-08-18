import { createRouter, createWebHistory } from "vue-router";
import AccountLogin from "@/components/AccountLogin.vue";
import TodoItems from "@/components/TodoItems.vue";

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
      name: "Bucketlists",
      component: TodoItems,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "Login" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (window.localStorage.getItem("token") == null) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (window.localStorage.getItem("token") != null) {
    next({ name: "Bucketlists" });
  } else {
    next();
  }
});

export default router;

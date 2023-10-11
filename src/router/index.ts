import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home.vue"),
    },
    {
      path: '/bookkeeping',
      name: 'bookkeeping',
      component: () => import('@/views/Bookkeeping/index.vue')
    }
  ],
});
export default router;

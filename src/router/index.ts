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
    // {
    //   path: "/",
    //   component: () => import("@/components/testTable/index.vue"),
    // },
    {
      path: "/game",
      component: () => import("@/game/game.vue"),
    },
  ],
});
export default router;

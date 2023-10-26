import { createRouter, createWebHistory } from 'vue-router';
//@ts-ignore
import HomeView from '../views/Home.view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: "/detail/:id",
      name: "Detail",
      //@ts-ignore
      component: () => import("../views/Detail.view.vue"),
      meta: { title: "Poke | Detail"}
    }
  ]
})

export default router;

import { createRouter, createWebHistory } from 'vue-router';
//@ts-ignore
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: "/detail/:name",
      name: "Detail",
      //@ts-ignore
      component: () => import("../views/DetailView.vue"),
      meta: { title: "Poke | Detail"}
    }
  ]
})

export default router;

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
    },{
      path: "/search",
      name: "Search",
      //@ts-ignore
      component: () => import("../views/Search.view.vue"),
      meta: { title: "Poke | Search"}
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

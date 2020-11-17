import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/views/home.vue";
import Plotter from "@/components/views/plotter.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', name: "Home", component: Home },
  { path: '/plotter',name: "Plotter", component: Plotter }
];

const router = new VueRouter({
  routes: routes 
});

export default router;
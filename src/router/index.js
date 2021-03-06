import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
      // meta: { auth: true }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (!to.meta.auth) return next();
// });

export default router;

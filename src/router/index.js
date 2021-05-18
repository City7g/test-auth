import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      notAuth: true,
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      notAuth: true,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/reset",
    name: "Reset",
    meta: {
      notAuth: true,
    },
    component: () => import("../views/Reset.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/update-user/:id",
    name: "UpdateUser",
    meta: { auth: true },
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/UpdateUser.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requiresAuth);
  const notAuth = to.matched.some(record => record.meta.notAuth);

  if (requireAuth && !store.getters.isLoggedIn) {
    next("/login");
    console.log(1);
  } else {
    next();
  }

  if (notAuth && store.getters.isLoggedIn) {
    next("/admin");
  } else {
    next();
  }
});

export default router;

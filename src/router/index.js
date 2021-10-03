import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPassword.vue"),
  },
  {
    path: "/setting",
    name: "UpdateProfile",
    component: () => import("../views/UpdateProfile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

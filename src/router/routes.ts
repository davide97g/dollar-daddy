import { type RouteRecordRaw } from "vue-router";

export const ROUTE_NAMES = {
  homepage: "Home",
  list: "List",
  login: "Login",
  notFound: "Not Found",
  overview: "Overview",
};

export const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.homepage,
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/list",
    name: ROUTE_NAMES.list,
    component: () => import("../pages/list.vue"),
  },
  {
    path: "/overview",
    name: ROUTE_NAMES.overview,
    component: () => import("../pages/overview.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.notFound,
    component: () => import("../pages/404.vue"),
  },
];

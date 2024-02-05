import { type RouteRecordRaw } from "vue-router";

export const ROUTE_NAMES = {
  homepage: "Home",
  login: "Login",
  notFound: "Not Found",
  overview: "Overview",
  add: "Add",
  category: "Category",
};

export const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.homepage,
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/overview",
    name: ROUTE_NAMES.overview,
    component: () => import("../pages/overview.vue"),
  },
  {
    path: "/add",
    name: ROUTE_NAMES.add,
    component: () => import("../pages/add.vue"),
  },
  {
    path: "/category",
    name: ROUTE_NAMES.category,
    component: () => import("../pages/category.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.notFound,
    component: () => import("../pages/404.vue"),
  },
];

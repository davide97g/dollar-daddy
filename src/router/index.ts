import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "../stores/user";
import { ROUTE_NAMES, routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ? logged guard
router.beforeEach(async (to, _, next) => {
  if (to.name !== ROUTE_NAMES.homepage && !useUserStore().user) {
    next({ name: ROUTE_NAMES.homepage });
  } else next();
});

export { router };

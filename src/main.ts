import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./locale";
import Framework7 from "framework7/lite-bundle";
import Framework7Vue, { registerComponents } from "framework7-vue/bundle";
import App from "./App.vue";

import "framework7/css/bundle";
import "uno.css";
import "./app.css";
import { Auth } from "./api/auth";
import { router } from "./router";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

Auth.onAuthChange()
  .catch((err) => console.info(err))
  .finally(() => {
    Framework7.use(Framework7Vue);
    app.use(router).use(i18n).mount("#app");
  });

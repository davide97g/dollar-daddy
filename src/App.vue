<template>
  <f7-app v-bind="f7params">
    <Navbar />
    <router-view />
    <f7-panel left cover dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>Left panel content goes here</f7-block>
          <f7-list menu-list strong-ios outline-ios>
            <f7-list-item link title="Overview" @click="() => goToOverview()">
              <i class="i-mdi-view-dashboard w-5 h-5 text-color-primary"> </i>
            </f7-list-item>
            <f7-list-item link title="Add Expense" @click="() => goToAdd()">
              <i class="i-mdi-plus-thick w-5 h-5 text-color-primary"> </i>
            </f7-list-item>
            <f7-list-item link title="Categories" @click="() => goToCategory()">
              <i class="i-mdi-view-list w-5 h-5 text-color-primary"> </i>
            </f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <LoginScreen />
  </f7-app>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import {
  f7,
  f7ready,
  f7App,
  f7Page,
  f7View,
  f7Panel,
  f7List,
  f7ListItem,
  f7Block,
  f7Navbar,
} from "framework7-vue";
import { getDevice } from "framework7/lite-bundle";
import capacitorApp from "./capacitor-app";
import LoginScreen from "./components/LoginScreen.vue";
import Navbar from "./components/Navbar.vue";

import { useRouter } from "vue-router";
import { ROUTE_NAMES } from "./router/routes";

const router = useRouter();
const goToOverview = () => {
  router.push({ name: ROUTE_NAMES.overview });
};
const goToAdd = () => {
  router.push({ name: ROUTE_NAMES.add });
};
const goToCategory = () => {
  router.push({ name: ROUTE_NAMES.category });
};

const device = getDevice();
// Framework7 Parameters
const f7params = {
  name: "Dollar Daddy", // App name
  theme: "auto", // Automatic theme detection
  id: "com.dollardaddy.app", // App bundle ID
  // App routes
  routes: [],
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.capacitor,
    scrollIntoViewCentered: device.capacitor,
  },
  // Capacitor Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
};

onMounted(() => {
  f7ready(() => {
    // Init capacitor APIs (see capacitor-app.js)
    if (device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });
});
</script>

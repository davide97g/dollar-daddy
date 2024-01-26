<template>
  <f7-app v-bind="f7params">
    <router-view />
    <!-- Left panel with cover effect-->
    <f7-panel left cover dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>Left panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Right panel with reveal effect-->
    <f7-panel right reveal dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Right Panel"></f7-navbar>
          <f7-block>Right panel content goes here</f7-block>
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
  f7Block,
  f7Navbar,
} from "framework7-vue";
import { getDevice } from "framework7/lite-bundle";
import capacitorApp from "./capacitor-app";
import LoginScreen from "./components/LoginScreen.vue";

const device = getDevice();
// Framework7 Parameters
const f7params = {
  name: "Dollar Daddy", // App name
  theme: "auto", // Automatic theme detection
  id: "com.example.app", // App bundle ID
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

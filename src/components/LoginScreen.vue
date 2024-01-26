<template>
  <f7-login-screen id="my-login-screen" v-model:opened="isOpened">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list>
          <f7-list-button
            title="Google Login"
            @click="Auth.login"
          ></f7-list-button>
          <f7-block-footer>
            Login to access DollarDaddy features ✨
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
</template>

<script setup lang="ts">
import { Auth } from "../api/auth";
import { useUserStore } from "../stores/user";
import {
  f7,
  f7Page,
  f7View,
  f7BlockFooter,
  f7List,
  f7LoginScreen,
  f7LoginScreenTitle,
  f7ListButton,
} from "framework7-vue";
import { ref, watch } from "vue";

const userStore = useUserStore();
const isOpened = ref(!userStore.user);

watch(
  () => userStore.user,
  () => (isOpened.value = !userStore.user)
);
</script>

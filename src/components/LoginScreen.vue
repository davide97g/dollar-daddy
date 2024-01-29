<template>
  <f7-login-screen id="my-login-screen" v-model:opened="isOpened">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            label="Email"
            type="text"
            placeholder="test@example.com"
            v-model:value="email"
          />
          <f7-list-input
            label="Password"
            type="password"
            placeholder="Your password"
            v-model:value="password"
          />
        </f7-list>
        <f7-list inset>
          <f7-list-button @click="() => Auth.login(email, password)"
            >Login</f7-list-button
          >
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
  f7ListInput,
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

const email = ref("");
const password = ref("");

watch(
  () => userStore.user,
  () => (isOpened.value = !userStore.user)
);
</script>

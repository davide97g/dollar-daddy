<template>
  <f7-page name="home">
    <f7-navbar :title="`Dollar Daddy${env !== 'PROD' ? ` [${env}]` : ''}`" />

    <f7-block-title v-if="userStore.user">{{
      userStore.user?.displayName
    }}</f7-block-title>
    <f7-block
      v-if="userStore.user"
      strong
      outline-ios
      class="grid grid-cols-3 grid-gap justify-center"
    >
      <f7-button tonal @click="Auth.logout">Logout</f7-button>
    </f7-block>
  </f7-page>
</template>
<script setup lang="ts">
import { Auth } from "../api/auth";
import { useUserStore } from "../stores/user";
import {
  f7Page,
  f7Navbar,
  f7Button,
  f7BlockTitle,
  f7Block,
} from "framework7-vue";
const env = import.meta.env.VITE_ENV;
const userStore = useUserStore();
</script>

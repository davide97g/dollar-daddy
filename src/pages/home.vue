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
    <f7-block-title>Categories</f7-block-title>
    <f7-block v-if="categories">
      {{ JSON.stringify(categories.map((c) => c.title).join(", ")) }}
    </f7-block>
  </f7-page>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { API } from "../api";
import { Auth } from "../api/auth";
import { useUserStore } from "../stores/user";
import {
  f7Page,
  f7Navbar,
  f7Button,
  f7BlockTitle,
  f7Block,
} from "framework7-vue";
import { DD_Category } from "../models/categories";
const env = import.meta.env.VITE_ENV;
const userStore = useUserStore();
const categories = ref<DD_Category[]>([]);
if (userStore.user?.id) {
  API.Database.Users.getUserCategories(userStore.user?.id).then(
    (res) => (categories.value = res)
  );
}
</script>

<template>
  <f7-page name="list">
    <f7-navbar title="List" />
    <f7-block-title>Expenses</f7-block-title>
  </f7-page>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { API } from "../api";
import { useUserStore } from "../stores/user";
import { f7Page, f7Navbar, f7BlockTitle } from "framework7-vue";
import { DD_Category } from "../models/categories";

const userStore = useUserStore();
const categories = ref<DD_Category[]>([]);
if (userStore.user?.id) {
  API.Database.Users.getUserCategories(userStore.user?.id).then(
    (res) => (categories.value = res)
  );
}
</script>

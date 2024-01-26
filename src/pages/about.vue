<template>
  <f7-page name="about">
    <f7-navbar title="Login" />
    <p>{{ useUserStore().user?.displayName }}</p>
    <button @click="Auth.login">Login</button>
    <button @click="Auth.logout">Logout</button>
  </f7-page>
</template>
<script setup lang="ts">
import { f7Page, f7Navbar } from "framework7-vue";
import { Auth } from "../api/auth";
import { useUserStore } from "../stores/user";
</script>

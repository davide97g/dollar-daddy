<template>
  <h2>Login page</h2>
  <p>{{ useUserStore().user?.displayName }}</p>
  <button @click="Auth.login">Login</button>
  <button @click="Auth.login">Logout</button>
</template>

<script lang="ts" setup>
import { Auth } from "../api/auth";
import { useUserStore } from "../stores/user";
</script>

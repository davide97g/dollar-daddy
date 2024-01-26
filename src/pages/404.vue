<template>
  <f7-page>
    <f7-navbar title="Not found" back-link="Back" />
    <f7-block strong>
      <p>Sorry</p>
      <p>Requested content not found.</p>
      <f7-block class="grid grid-cols-3 grid-gap">
        <f7-button
          tonal
          @click="() => router.push({ name: ROUTE_NAMES.homepage })"
          >Home</f7-button
        >
      </f7-block>
    </f7-block>
  </f7-page>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from "../router/routes";
import { router } from "../router";
import { f7Page, f7Navbar, f7Block, f7Button } from "framework7-vue";
</script>

<template>
  <div>
    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active></f7-view>

    <!-- About View -->
    <f7-view id="view-about" name="about" tab url="/about/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>
    <f7-views tabs class="safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom>
        <f7-link tab-link="#view-home" tab-link-active>
          <i class="i-tabler-home w-6 h-6" />
          <span
            class="normal-case text-sm"
            @click="() => router.push({ name: ROUTE_NAMES.homepage })"
            >Home</span
          >
        </f7-link>
        <f7-link tab-link="#view-about">
          <i class="i-tabler-user w-6 h-6" />
          <span class="normal-case text-sm">About</span>
        </f7-link>
        <f7-link tab-link="#view-settings">
          <i class="i-tabler-settings w-6 h-6" />
          <span class="normal-case text-sm">Settings</span>
        </f7-link>
      </f7-toolbar>
    </f7-views>
  </div>
</template>
<script setup lang="ts">
import { f7View, f7Toolbar } from "framework7-vue";
import { ROUTE_NAMES } from "../router/routes";
import { router } from "../router";
</script>

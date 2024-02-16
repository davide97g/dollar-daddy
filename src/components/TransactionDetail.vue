<template>
  <f7-sheet
    v-model:opened="isOpen"
    style="height: auto"
    swipe-to-close
    swipe-to-step
    push
    backdrop
    @sheet:close="() => emits('close')"
    @sheet:stepopen="isSwipeOpen = true"
    @sheet:stepclose="isSwipeOpen = false"
    @sheet:closed="isSwipeOpen = false"
  >
    <f7-toolbar>
      <div slot="before-inner">
        {{
          transaction?.day +
          "/" +
          transaction?.month +
          1 +
          "/" +
          transaction?.year
        }}
      </div>
      <div slot="after-inner">
        <f7-link sheet-close>Close</f7-link>
      </div>
    </f7-toolbar>
    <div class="swipe-handler"></div>
    <div class="sheet-modal-swipe-step">
      <div class="padding-horizontal padding-bottom">
        <div class="margin-top text-align-center" style="font-size: 18px">
          <b>Da decidere come fare</b>
        </div>
      </div>
      <div
        class="display-flex padding justify-content-space-between align-items-center"
      >
        <div style="font-size: 18px">
          <b>{{ transaction?.id }}</b>
        </div>
        <div style="font-size: 22px">
          <b>{{ transaction?.amount.toFixed(2) + " €" }}</b>
        </div>
      </div>
      <div class="padding-horizontal padding-bottom">
        <div v-if="!isSwipeOpen" class="margin-top text-align-center">
          Swipe up for more details
        </div>
      </div>
    </div>
    <f7-block-title class="margin-top">More details:</f7-block-title>
    <f7-list>
      <f7-list-item title="userId">
        <template #after>
          <b>{{ transaction?.userId }}</b>
        </template>
      </f7-list-item>
      <f7-list-item title="timestamp">
        <template #after>
          <b>{{ transaction?.timestamp }}</b>
        </template>
      </f7-list-item>
      <f7-list-item title="categoryId">
        <template #after>
          <b>{{ transaction?.categoryId }}</b>
        </template>
      </f7-list-item>
      <f7-list-item title="description">
        <template #after>
          <b>{{ transaction?.description }}</b>
        </template>
      </f7-list-item>
    </f7-list>
    <f7-button large fill>Edit</f7-button>
  </f7-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { DD_Transaction } from "../models/transaction";
import {
  f7BlockTitle,
  f7List,
  f7ListItem,
  f7Button,
  f7Toolbar,
  f7Link,
  f7Sheet,
} from "framework7-vue";

const props = defineProps<{ transaction?: DD_Transaction }>();
const emits = defineEmits(["close"]);

const isSwipeOpen = ref<boolean>(false);

const isOpen = ref<boolean>(false);
watch(
  () => props.transaction,
  () => (isOpen.value = !!props.transaction)
);
</script>

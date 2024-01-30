<template>
  <f7-page>
    <Navbar />

    <f7-card
      title="Balance"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
      :raised="true"
    ></f7-card>

    <f7-card
      title="Last 7 days"
      content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
      footer="Card footer"
      :raised="true"
    ></f7-card>
    <f7-block-title>Expenses</f7-block-title>
    <f7Card
      :raised="true"
      v-for="(item, index) in transactions"
      :key="index"
      @click="handleCardClick(item.id)"
    >
      <f7List strong inset-md inset-ios dividers-ios media-list>
        <f7-list-item
          swipeout
          :title="item.description"
          :subtitle="item.amount.toFixed(2) + ' €'"
          :text="'ID = ' + item.id"
        >
          <template #media>
            <img
              style="border-radius: 17px"
              src="https://cdn.framework7.io/placeholder/fashion-88x88-3.jpg"
              width="44"
            />
          </template>
          <f7-swipeout-actions right>
            <f7-swipeout-button
              delete
              confirm-text="Are you sure you want to delete this item?"
              >Delete</f7-swipeout-button
            >
          </f7-swipeout-actions>
        </f7-list-item>
      </f7List>
    </f7Card>

    <f7-sheet
      v-model:opened="showTransaction"
      @on-sheet:closed="showTransaction = false"
      style="height: auto"
      swipe-to-close
      swipe-to-step
      push
      backdrop
    >
      <f7-toolbar>
        <div slot="before-inner">
          {{
            tempTransaction.day +
            "/" +
            tempTransaction.month +
            1 +
            "/" +
            tempTransaction.year
          }}
        </div>
        <div slot="after-inner">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
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
            <b>{{ tempTransaction.id }}</b>
          </div>
          <div style="font-size: 22px">
            <b>{{ tempTransaction.amount.toFixed(2) + " €" }}</b>
          </div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <div class="margin-top text-align-center">
            Swipe up for more details
          </div>
        </div>
      </div>
      <f7-block-title class="margin-top">More details:</f7-block-title>
      <f7-list>
        <f7-list-item title="userId">
          <template #after>
            <b>{{ tempTransaction.userId }}</b>
          </template>
        </f7-list-item>
        <f7-list-item title="timestamp">
          <template #after>
            <b>{{ tempTransaction.timestamp }}</b>
          </template>
        </f7-list-item>
        <f7-list-item title="categoryId">
          <template #after>
            <b>{{ tempTransaction.categoryId }}</b>
          </template>
        </f7-list-item>
        <f7-list-item title="description">
          <template #after>
            <b>{{ tempTransaction.description }}</b>
          </template>
        </f7-list-item>
      </f7-list>
      <f7-button large fill>Edit</f7-button>
    </f7-sheet>
  </f7-page>
</template>

<script setup lang="ts">
import {
  f7Page,
  f7Card,
  f7BlockTitle,
  f7List,
  f7ListItem,
  f7SwipeoutActions,
  f7SwipeoutButton,
  f7Button,
  f7Toolbar,
  f7Link,
  f7Sheet,
} from "framework7-vue";
import { DD_Transaction } from "../models/transaction";

import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { onMounted } from "vue";

const transactions = ref<DD_Transaction[]>([]); //ha un tipo?
const showTransaction = ref(false); //ha un tipo?
const tempTransaction = ref<DD_Transaction>({
  id: "",
  userId: "",
  timestamp: 0,
  year: 0,
  month: 0,
  day: 0,
  categoryId: "",
  amount: 0,
  description: "",
});

onMounted(() => {
  transactions.value = generateRandomTransactions();
  console.log(transactions.value);
});

function generateRandomTransaction(): DD_Transaction {
  const deltatime: number = Math.random() * 1000000000; //move some days back
  const definedRndDate: Date = new Date(new Date().getTime() - deltatime);

  const randomTransaction: DD_Transaction = {
    id: Math.random().toString(36).substring(7),
    userId: Math.random().toString(36).substring(7),
    timestamp: definedRndDate.getTime(),
    year: definedRndDate.getFullYear(),
    month: definedRndDate.getMonth(),
    day: definedRndDate.getDay(),

    categoryId: Math.random().toString(36).substring(7),
    amount: Math.random() * 100,
    description: "Transaction" + (Math.random() * 100).toFixed(0).toString(),
  };
  return randomTransaction;
}

function generateRandomTransactions(): DD_Transaction[] {
  const transactions: DD_Transaction[] = [];
  for (let i = 0; i < 5; i++) {
    transactions.push(generateRandomTransaction());
  }
  return transactions;
}

const handleCardClick = (id: string) => {
  const transaction = transactions.value.find((t) => t.id === id);
  if (transaction) {
    tempTransaction.value = transaction;
    showTransaction.value = true;
    console.log(tempTransaction.value);
  } else {
    console.error("Transaction not found");
    showTransaction.value = false;
  }
};
</script>

<style scoped></style>

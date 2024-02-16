<template>
  <f7-page>
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

    <f7List inset-md inset-ios dividers-ios media-list class="my-list">
      <f7-list-item
        swipeout
        :title="item.description"
        :subtitle="item.amount.toFixed(2) + ' €'"
        :text="'ID = ' + item.id"
        v-for="(item, index) in transactions"
        :key="index"
        @click="handleCardClick(item.id)"
        @swipeout:delete="deleteTransaction(item.id)"
        :style="{
          background: '#FDF2F2FF',
          borderRadius: '1rem',
          boxShadow: '0px 2px 5px rgb(23 26 31 / 39%)',
        }"
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
            @click="(e:Event)=>e.stopPropagation()"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
    </f7List>

    <TransactionDetail
      :transaction="transactions.find((t) => t.id === selectedTransactionId)"
      @close="() => (selectedTransactionId = undefined)"
    />

    <f7-fab
      position="left-bottom"
      @click="transactions.push(generateRandomTransaction())"
    >
      <i class="i-mdi-robot-angry w-8 h-8 text-color-primary"></i>
    </f7-fab>

    <f7-fab position="right-bottom" @click="goToAdd">
      <i class="i-mdi-plus-thick w-8 h-8 text-color-primary"></i>
    </f7-fab>
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
  f7Fab,
} from "framework7-vue";
import { DD_Transaction } from "../models/transaction";

import { ref } from "vue";
import { onMounted } from "vue";
import TransactionDetail from "../components/TransactionDetail.vue";
import { API } from "../api";

import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ROUTE_NAMES } from "../router/routes";

const userStore = useUserStore();
const router = useRouter();

const transactions = ref<DD_Transaction[]>([]);
const selectedTransactionId = ref<string>();

onMounted(() => {
  getListTransactions();
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

const getListTransactions = () => {
  if (userStore.user?.id) {
    API.Database.Users.Transactions.getUsertransactions(
      userStore.user?.id
    ).then((res) => (transactions.value = res));
  }
};

function generateRandomTransactions(): DD_Transaction[] {
  const transactions: DD_Transaction[] = [];
  for (let i = 0; i < 2; i++) {
    transactions.push(generateRandomTransaction());
  }
  return transactions;
}

const handleCardClick = (id: string) => {
  selectedTransactionId.value = id;
};

const goToAdd = () => {
  router.push({ name: ROUTE_NAMES.add });
};

function deleteTransaction(id: string) {
  const toDelete = transactions.value.find((t) => t.id === id);
  if (userStore.user?.id && toDelete != undefined) {
    API.Database.Users.Transactions.deleteUserTransaction(
      userStore.user?.id,
      toDelete
    ); //TODO: check if it is right
    //TODO: update what has been stored before?
    //TODO: update possible values of Total and Last 7 days etc
  }
}
</script>

<style lang="scss">
.my-list {
  ul {
    gap: 1rem !important;
    display: flex !important;
    flex-direction: column !important;
  }
}
</style>

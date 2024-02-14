<template>
  <f7Card title="New Expense" :content="userStore.user?.displayName">
    <f7-list strong-ios dividers-ios inset-ios>
      <f7-list-input
        label="Amount"
        pattern="(\d+(?:\d{3})*(?:\.\d{1,2})?)"
        floating-label
        inputmode="number"
        v-model:value="newTransaction.amount"
        clear-button
        :error-message="
          newTransaction.amount < 0 ? 'Amount cannot be negative' : ''
        "
        error-message-force
        required
      >
      </f7-list-input>
      <f7-list-input
        label="Description"
        type="text"
        floating-label
        v-model:value="newTransaction.description"
        clear-button
        validate
      >
      </f7-list-input>
      <f7-list-input
        type="datepicker"
        :value="tempDate"
        @calendar:change="tempDate = $event"
        :calendar-params="{
          header: true,
          openIn: 'customModal',
          footer: false,
          closeOnSelect: true,
          toolbar: false,
          firstDay: 1,
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2124, 11, 31),
          dateFormat: { month: 'short', day: '2-digit', year: 'numeric' },
        }"
      />

      <f7-list-input
        label="Category"
        type="select"
        options="categories"
        v-model:value="newTransaction.categoryId"
        @input:clear="newTransaction.categoryId = ''"
      >
        <optgroup v-for="category in categories">
          <option v-bind:value="category.id">{{ category.title }}</option>
        </optgroup>
      </f7-list-input>
    </f7-list>
    <f7-card-footer>
      <f7-button @click="clear()">Clear</f7-button>
      <f7-button @click="save()">Save</f7-button>
    </f7-card-footer>
  </f7Card>
  <f7-block v-if="categories">
    <f7BlockTitle>Categories</f7BlockTitle>
    {{ JSON.stringify(categories.map((c) => c.title).join(", ")) }}
  </f7-block>
  <f7-block v-if="transactions">
    <f7BlockTitle>Transactions</f7BlockTitle>
    {{
      JSON.stringify(
        transactions
          .map((c) => `${c.description} (${c.categoryId}): ${c.amount}`)
          .join(", ")
      )
    }}
  </f7-block>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { API } from "../api";
import {
  f7ListInput,
  f7CardFooter,
  f7List,
  f7Card,
  f7Button,
  f7BlockTitle,
  f7Block,
} from "framework7-vue";
import { useUserStore } from "../stores/user";
import { DD_Category } from "../models/categories";
import { DD_Transaction } from "../models/transaction";

const userStore = useUserStore();
const tempDate = ref<Date[]>([new Date()]);

const categories = ref<DD_Category[]>([]);
const transactions = ref<DD_Transaction[]>([]); // TODO: to be removed, just to check if it works

const getUserCategories = () => {
  if (userStore.user?.id) {
    API.Database.Users.Categories.getUserCategories(userStore.user?.id).then(
      (res) => (categories.value = res)
    );
  }
};

// TODO: to be removed, just to check if it works
const getListTransactions = () => {
  if (userStore.user?.id) {
    API.Database.Users.Transactions.getUsertransactions(
      userStore.user?.id
    ).then((res) => (transactions.value = res));
  }
};

const newTransaction = ref<DD_Transaction>({
  id: crypto.randomUUID(),

  userId: userStore.user?.id || "",
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  timestamp: new Date().getTime(),

  categoryId: "",
  amount: 0,
  description: "",
});

const clear = () => {
  newTransaction.value.categoryId = "";
  newTransaction.value.amount = 0;
  newTransaction.value.description = "";
  tempDate.value = [new Date()];
};

const validate = (): boolean => {
  // TODO: implement validation
  console.log("Validation is not implemented yet!");
  if (true) {
    newTransaction.value.timestamp = new Date(
      tempDate.value[0].toString()
    ).getTime();
    newTransaction.value.day = new Date(tempDate.value[0].toString()).getDate();
    newTransaction.value.month = new Date(
      tempDate.value[0].toString()
    ).getMonth();
    newTransaction.value.year = new Date(
      tempDate.value[0].toString()
    ).getFullYear();
  }
  console.log("Transaction", newTransaction.value);

  return true;
};

const save = () => {
  if (validate() && userStore.user?.id)
    API.Database.Users.Transactions.createUserTransaction(
      userStore.user.id,
      newTransaction.value
    )
      .then(getListTransactions) // TODO: to be removed, just to check if it works
      .catch((err) => console.error("failed creation transaction", err));

  clear();
  newTransaction.value.id = crypto.randomUUID();
};

getListTransactions(); // TODO:  to be removed, just to check if it works
getUserCategories();
</script>

<style scoped>
/* Your styles go here */
</style>

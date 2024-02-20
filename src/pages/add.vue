<template>
  <f7Card title="New Expense" :content="userStore.user?.displayName">
    <f7-list
      form
      id="testForm"
      @submit="onsubmit"
      strong-ios
      dividers-ios
      inset-ios
    >
      <f7-list-input
        label="Amount"
        floating-label
        autofocus
        type="number"
        step="0.01"
        :value="tempAmount"
        clear-button
        required
        @input="onInputAmount"
        validate
      >
      </f7-list-input>
      <f7-list-input
        label="Description"
        type="text"
        pattern=".{3,}"
        error-message="Insert at least 3 characters"
        floating-label
        required
        :value="newTransaction.description"
        @input="newTransaction.description = $event.target.value"
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
        v-model:value="newTransaction.categoryId"
        label="Category"
        type="select"
        options="categories"
        required
      >
        <optgroup v-for="category in categories">
          <option :value="category.id">{{ category.title }}</option>
        </optgroup>
      </f7-list-input>

      <f7-card-footer>
        <f7-button type="button" @click="clear">Clear</f7-button>
        <f7-button type="submit">Save</f7-button>
      </f7-card-footer>
    </f7-list>
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
  f7,
} from "framework7-vue";
import { useUserStore } from "../stores/user";
import { DD_Category } from "../models/categories";
import { DD_Transaction } from "../models/transaction";

const userStore = useUserStore();

const tempDate = ref<Date[]>([new Date()]);
const tempAmount = ref<string>("");

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
  newTransaction.value.description = "";
  tempDate.value = [new Date()];
  tempAmount.value = "";
};

const saveTransaction = () => {
  if (userStore.user?.id)
    API.Database.Users.Transactions.createUserTransaction(
      userStore.user.id,
      newTransaction.value
    )
      .then(getListTransactions) // TODO: to be removed, just to check if it works
      .catch((err) => console.error("failed creation transaction", err));

  clear();
  newTransaction.value.id = crypto.randomUUID();
};

const onsubmit = (event: Event) => {
  const isValid = f7.input.validateInputs("#testForm");
  if (isValid) {
    // convert tempDate to the specific format for date in the transaction
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

    //check if tempAmount has -. If true, tempAmount = 0, then convert tempAmount to number
    if (tempAmount.value.includes("-")) {
      console.log("Amount is negative -> set to 0");
      tempAmount.value = "0";
    }
    try {
      newTransaction.value.amount = parseFloat(tempAmount.value);
    } catch (e) {
      console.error("Error while converting amount to number", e);
    }
    console.log("Transaction", newTransaction.value);

    // then save the transaction
    saveTransaction();
  }
  event.preventDefault();
  // save();
};

//the following is used to modify the input field for amount to accept only 2 decimal digits
const onInputAmount = (event: any) => {
  tempAmount.value = event.target?.value;
  if (tempAmount.value.includes(".")) {
    //if number has a decimal part
    let decimal = tempAmount.value.split(".")[1];
    if (decimal.length > 2) {
      //not more than 2 decimal digits
      tempAmount.value = tempAmount.value.slice(0, -decimal.length + 2);
      event.target.value = tempAmount.value; //update value shown in the input field
    }
  }
};

getListTransactions(); // TODO:  to be removed, just to check if it works
getUserCategories();
</script>

<style scoped>
/* Your styles go here */
</style>

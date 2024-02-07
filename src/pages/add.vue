<template>
  <f7Card title="New Expense" :content="userStore.user?.displayName">
    <f7-list strong-ios dividers-ios inset-ios>
      <f7-list-input
        label="Amount"
        type="text"
        floating-label
        v-model:value="newTransaction.amount"
        clear-button
      >
      </f7-list-input>
      <f7-list-input
        label="Description"
        type="text"
        floating-label
        v-model:value="newTransaction.description"
        clear-button
      >
      </f7-list-input>
      <f7-list-input
        type="datepicker"
        @calendar:change="handleDateChange($event)"
        readonly
        :value="[new Date()]"
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
        floating-label
        clear-button
        options="categories"
        v-model:value="newTransaction.categoryId"
        @input:clear="newTransaction.categoryId = ''"
      >
        <option key="maschio">daImplementare</option>
      </f7-list-input>
    </f7-list>
    <f7-card-footer>
      <f7-button @click="clear()">Clear</f7-button>
      <f7-button @click="save()">Save</f7-button>
    </f7-card-footer>
  </f7Card>
  <f7BlockTitle>Categories</f7BlockTitle>
  <f7-block v-if="categories">
    {{ JSON.stringify(categories.map((c) => c.title).join(", ")) }}
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
import { watch } from "vue";

const userStore = useUserStore();
const categories = ref<DD_Category[]>([]);
const tempDate = ref<Date>(new Date());
if (userStore.user?.id) {
  API.Database.Users.getUserCategories(userStore.user?.id).then(
    (res) => (categories.value = res)
  );
}

const generateRandomValue = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const newTransaction = ref<DD_Transaction>({
  id: generateRandomValue(),

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
};

const save = () => {
  console.log("Da implementare");
  console.log("andrei a salvare la categoria: ", newTransaction.value);
};

//add a watcher to the date
watch(tempDate, (newDate) => {
  console.log("newDate", newDate);
  newTransaction.value.day = tempDate.value.getDate();
  newTransaction.value.month = tempDate.value.getMonth();
  newTransaction.value.year = tempDate.value.getFullYear();
  newTransaction.value.timestamp = tempDate.value.getTime();
});

const handleDateChange = (newDate: Date) => {
  tempDate.value = new Date(newDate);
};
</script>

<style scoped>
/* Your styles go here */
</style>

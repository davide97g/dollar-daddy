<template>
  <f7Card title="New category" :content="userStore.user?.displayName">
    <f7-list strong-ios dividers-ios inset-ios>
      <f7-list-input
        label="Title"
        type="text"
        v-model:value="newCategory.title"
        clear-button
      >
      </f7-list-input>
      <f7-list-input
        label="Color"
        type="colorpicker"
        v-model:value="newCategory.color"
        clear-button
      >
      </f7-list-input>
      <f7-list-item
        checkbox
        title="Exluded from stats"
        name="excludedFromStats"
        checkbox-icon="end"
        v-model:checked="newCategory.excludedFromStats"
      ></f7-list-item>
      <f7-list-input
        label="budget?"
        type="select"
        placeholder="budget?"
        disabled
        clear-button
      >
      </f7-list-input>
      <f7-list-input
        label="Parentid"
        type="select"
        floating-label
        clear-button
        options="categories"
        v-model:value="newCategory.parentCategoryId"
        @input:clear="newCategory.parentCategoryId = ''"
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
  f7ListItem,
  f7Card,
  f7Button,
  f7BlockTitle,
  f7Block,
} from "framework7-vue";
import { useUserStore } from "../stores/user";
import { DD_Category } from "../models/categories";

const userStore = useUserStore();
const categories = ref<DD_Category[]>([]);
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

const newCategory = ref<DD_Category>({
  id: generateRandomValue(),
  userId: userStore.user?.id || "",
  title: "",
  excludedFromStats: false,
  color: "",
  parentCategoryId: "",
});

const clear = () => {
  newCategory.value.title = "";
  newCategory.value.excludedFromStats = false;
  newCategory.value.color = "";
  newCategory.value.parentCategoryId = "";
};

const save = () => {
  console.log("Da implementare");
  console.log("andrei a salvare la categoria: ", newCategory.value);
};
</script>

<style scoped>
/* Your styles go here */
</style>

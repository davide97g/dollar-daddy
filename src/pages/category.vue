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
        :value="newCategory.color"
        @colorpicker:change="(v) => (newCategory.color = v.hex)"
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
        placeholder="budget?"
        clear-button
        :value="newCategory.budget?.weekly"
        @update:value="(x) =>{
          if(!newCategory.budget) newCategory.budget = {monthly:0,};
          newCategory.budget!.monthly=x;
        }"
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
    <f7-list strong-ios dividers-ios inset-ios>
      <f7-list-input
        v-for="category in categories"
        label="Title"
        type="text"
        floating-label
        clear-button
        :value="category.title"
        disabled
      />
    </f7-list>
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

const getUserCategories = () => {
  if (userStore.user?.id) {
    API.Database.Users.Categories.getUserCategories(userStore.user?.id).then(
      (res) => (categories.value = res)
    );
  }
};

const newCategory = ref<DD_Category>({
  id: crypto.randomUUID(),
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
  newCategory.value.id = crypto.randomUUID();
};

const save = () => {
  if (userStore.user?.id)
    API.Database.Users.Categories.createUserCategory(
      userStore.user.id,
      newCategory.value
    )
      .then(getUserCategories)
      .catch((err) => console.error("failed creation category", err));
  clear();
};

getUserCategories();
</script>

<style scoped>
/* Your styles go here */
</style>

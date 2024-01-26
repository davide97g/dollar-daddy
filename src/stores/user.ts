import type { DD_User } from "../models/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<DD_User | null>();
  const setUser = (_user: DD_User | null) => (user.value = _user);
  return { user, setUser };
});

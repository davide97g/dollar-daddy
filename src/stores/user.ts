import type { User } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>();
  const setUser = (_user: User | null) => (user.value = _user);
  return { user, setUser };
});

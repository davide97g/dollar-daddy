import { computed, ref } from "vue";

// ? loading logic
const loading = ref(false);
export const setLoading = (_loading: boolean) => (loading.value = _loading);
export const isLoading = computed(() => loading.value);

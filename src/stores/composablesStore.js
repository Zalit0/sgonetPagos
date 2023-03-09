import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useComposablesStore = defineStore('composable', () => {
  const singleDoc = ref(null);

  return { singleDoc };
});

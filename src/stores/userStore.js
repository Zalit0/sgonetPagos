import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('users', () => {
  const funciona = ref('Vengo desde Pinia');

  return { funciona };
});

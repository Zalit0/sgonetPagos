<script setup>
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore();
const { funciona } = userStore;
</script>

<template>
  <h1>Hola Mundo</h1>

  {{ funciona }}
</template>

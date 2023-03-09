<script setup>
import { useFirebaseHook } from '../composable/useFirebase';
const firebaseHook = useFirebaseHook();
const { getSingle } = firebaseHook;
getSingle('clientes', '28898654');
</script>

<template>
  <h1>Hola Mundo</h1>
  <hr />
</template>

<script setup>
import { ref } from 'vue';
import { useFirebaseHook } from '../composables/useFirebase';
const firebaseHook = useFirebaseHook();
const { getSingle, resultado } = firebaseHook;
const cliente=ref(null)

async function cargarCliente() {
try {
await getSingle('clientes', '28898654');
console.log(resultado.value);
cliente.value = resultado.value;
console.log(cliente.value);
if(cliente.value.abono){
  getSingle('abonos',cliente.value.abono)
}
} catch (error) {
}


}


cargarCliente()
</script>

<template>
  <h1>Hola Mundo</h1>
  <hr />

  {{cliente?.abono}}
  {{ resultado }}
</template>

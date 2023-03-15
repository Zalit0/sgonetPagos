<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../stores/adminStore';
const adminStore=useAdminStore()
const {clientes, abonos, barrios} =storeToRefs(adminStore)

</script>

<template>
  <div class="container">
  <div class="row">
  <div class="col-6">
  <TodosAbonos/>
  </div>
  <div class="col-6">
  <TodosBarrios :barrios="barrios"></TodosBarrios>
  </div>
  </div>
  <TodosClientes :clientes="clientes"></TodosClientes>
  
  </div>
    
</template>
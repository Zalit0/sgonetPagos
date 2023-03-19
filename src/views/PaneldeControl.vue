<script setup>
import { storeToRefs } from 'pinia';
import AgregarFacturas from '../components/AgregarFacturas.vue';
import { useAdminStore } from '../stores/adminStore';
const adminStore=useAdminStore()
const {clientes,loading} =storeToRefs(adminStore)

</script>

<template>
  <div v-if="loading" class=" mt-5 text-center align-items-center">
  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">

</div>   <span class="">Cargando...</span>
  </div>
<div v-else>
  <div class="row">
  <div class="col-12 col-md-5 pe-1">
  <div class="border">
  <TodosAbonos/>
  </div>
  <div class="border">
  <TodosBarrios></TodosBarrios>
  </div>
  </div>
  <div class="col-12 col-md-7 ps-1">
  <AgregarFacturas></AgregarFacturas>
  </div>
  </div>
  <hr>
  <TodosClientes :clientes="clientes"></TodosClientes>
</div>    
</template>
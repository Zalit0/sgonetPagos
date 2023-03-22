<script setup>
import { useAdminStore } from '../stores/adminStore';
import { storeToRefs } from 'pinia';

const adminStore=useAdminStore()
const {abonos} = storeToRefs(adminStore)
const {eliminarAbono, agregarAbono}=adminStore  

</script>

<template>
  
        <div class="table-responsive">
  <div class="button-group d-flex justify-content-between align-items-center bg-dark  mt-2">
        <h2 class="m-0 ms-4 text-white">Abonos</h2>
  <button class="btn btn-success btn-sm text-center"  @click="agregarAbono">Agregar Abono</button>    
  </div>
  <table class="table table-hover table-sm table-bordered table-responsive">
  <thead class="table-dark">
    <tr>
      <th scope="col">Abono</th>
      <th scope="col">Precio</th>
      <th scope="col">Bajada</th>
      <th scope="col">Subida</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody class="align-middle text-center">
    <tr v-for="(abono, index) in abonos" :key="abono.id">
      <th scope="row"><span >{{ abono.name }}</span></th>
      <td><span v-if="abono.precio==0">Proximamente</span><span v-else>${{ abono.precio }}</span></td>
      <td><span>{{ abono.bajada }} MB</span></td>
      <td><span>{{ abono.subida }} MB</span></td>
      <td><span><button class="btn btn-danger btn-sm px-1 py-0" @click="eliminarAbono(abono.id)">Eliminar</button></span></td>
    </tr>
    </tbody>
  </table>
  </div>
</template>
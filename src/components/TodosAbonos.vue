<script setup>
import { useAdminStore } from '../stores/adminStore';
import { storeToRefs } from 'pinia';

const adminStore=useAdminStore()
const {abonos} = storeToRefs(adminStore)
const {eliminarAbono, agregarAbono}=adminStore  
    
</script>

<template>
  
        <h2>Abonos</h2>
        <div class="container">
  <table class="table table-hover table-sm table-bordered">
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
    <div class="btn-group" role="group" >
    <button class="btn btn-success btn-sm text-center"  @click="agregarAbono">Agregar Abono</button>    
    </div>
  </div>
</template>
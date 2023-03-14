<script setup>
import { ref } from 'vue';
import { useAdminStore } from '../stores/adminStore';
const adminStore=useAdminStore()
const {ordenar}=adminStore
defineProps(["abonos"])
const editar=ref(false)
const guardar=()=>{
    ordenar()
    editar.value= !editar.value
}
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
    </tr>
  </thead>
  <tbody>
    <tr v-for="(abono, index) in abonos" :key="abono.id">
      <th  scope="row"><input type="text" class="form-control" v-model="abono.name" v-if="editar"><span v-if="!editar">{{ abono.name }}</span></th>
      <td><input type="text" class="form-control" v-model="abono.precio" v-if="editar"><span v-if="!editar">${{ abono.precio }}</span></td>
      <td><input type="text" class="form-control" v-model="abono.bajada" v-if="editar"><span v-if="!editar">{{ abono.bajada }}</span></td>
      <td><input type="text" class="form-control" v-model="abono.subida" v-if="editar"><span v-if="!editar">{{ abono.subida }}</span></td>
    </tr>
    </tbody>
  </table>
    <div class="btn-group" role="group" >
    <button class="btn btn-warning btn-sm" v-if="!editar" @click="editar= !editar">Editar</button>
    <button class="btn btn-danger btn-sm text-center" v-if="editar" @click="abonos.push({id:'',name:'',precio:'',subida:'',bajada:''})">Agregar Abono</button> 
    <button class="btn btn-warning btn-sm text-center" v-if="editar" @click="guardar">Guardar</button> 
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAdminStore } from '../stores/adminStore';
const adminStore=useAdminStore()
const {ordenar}=adminStore
const props = defineProps({abonos:Array})
const editar=ref(false)
const guardar=()=>{
    ordenar()
    editar.value= !editar.value
    console.log(props.abonos)
}

//agregamos un nuevo abono al array abonos
const agregarAbono=()=>{
  //preguntamos la cantidad de megas y la ponemos en el id
  let id=prompt('De cuantos megas es el nuevo abono?');
  //si el valor colocado es un numero continuamos 
  if (!isNaN(id)){
    id = id.trim()
    const even = (element) => element.id === id;
    //comprobamos si el Id ya existe
    if(!props.abonos.some(even)){
      props.abonos.push({id:id ,name:id+' Megas',precio:'',subida:'',bajada:''})
    }
    else{
      alert("El id ya existe")
    }
  }
  //si no es un numero alertamos
  else{
    alert('Debes colocar un numero')
  }
}
</script>

<template>
  
        <h2>Abonos</h2>
        <div class="container">
  <table class="table table-hover table-sm table-bordered">
  <thead class="table-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Abono</th>
      <th scope="col">Precio</th>
      <th scope="col">Bajada</th>
      <th scope="col">Subida</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(abono, index) in abonos" :key="abono.id">
      <td><input type="text" class="form-control" v-model="abono.id" v-if="editar" disabled><span v-if="!editar">{{ abono.id }}</span></td>
      <th  scope="row"><input type="text" class="form-control" v-model="abono.name" v-if="editar" disabled><span v-if="!editar">{{ abono.name }}</span></th>
      <td><input type="text" class="form-control" v-model="abono.precio" v-if="editar"><span v-if="!editar">${{ abono.precio }}</span></td>
      <td><input type="text" class="form-control" v-model="abono.bajada" v-if="editar"><span v-if="!editar">{{ abono.bajada }} MB</span></td>
      <td><input type="text" class="form-control" v-model="abono.subida" v-if="editar"><span v-if="!editar">{{ abono.subida }} MB</span></td>
    </tr>
    </tbody>
  </table>
    <div class="btn-group" role="group" >
    <button class="btn btn-warning btn-sm" v-if="!editar" @click="editar= !editar">Editar</button>
    <button class="btn btn-danger btn-sm text-center" v-if="editar" @click="agregarAbono">Agregar Abono</button> 
    <button class="btn btn-warning btn-sm text-center" v-if="editar" @click="guardar">Guardar</button> 
    </div>
  </div>
</template>
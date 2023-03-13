<script setup>
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useAdminStore } from '../stores/adminStore';



const adminStore=useAdminStore()
const {clientes, searchQuery, clientesFiltrados} =storeToRefs(adminStore)

</script>

<template>
Clientes Filtrados{{ clientesFiltrados }}
<hr>
{{ clientes }}
    
    

<div class="searchBar">
     <!-- Filter Search -->
     <div class="input-group mb-5">
       <input  type="search" class="form-control" v-model='searchQuery' placeholder="Student's Name" aria-label="Recipient's username" aria-describedby="button-addon2">
      </div>
    </div>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</template>

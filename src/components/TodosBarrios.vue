<script setup>
const props=defineProps(["barrios"])
const editar=false
</script>

<template>
    <h2>Barrios</h2>
        <table class="table table-sm table-bordered">
        <thead class="table-dark">
        <tr>
        <th >Barrio</th>
        <th >Zonas</th>
        </tr>
        </thead>
        <tbody class="align-middle">
        <tr v-for="(barrio, index) in barrios" :key="barrio.id">
        <th ><input type="text" class="form-control" v-model="barrio.name" v-if="editar"><span v-if="!editar">{{ barrio.name }}</span></th>
        <td>
        <tr v-for="(zona, index) in barrio.zonas">
        <th>
        {{ zona }}
        </th>
        </tr>
        </td>
        </tr>
         </tbody>
        </table>
    
</template>
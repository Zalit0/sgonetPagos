<script setup>
import { storeToRefs } from 'pinia';
import { useFirebaseHook } from '../composables/useFirebase';
import { useAdminStore } from '../stores/adminStore';

const firebase = useFirebaseHook()
const { addDoc, borrarDoc } = firebase
const adminStore = useAdminStore()
const { agregarBarrio, cargarDatos } = adminStore
const { barrios } = storeToRefs(adminStore)

const editaZona = async (barrio) => {
    try {
        let zona = prompt('Cual es la zona que quieres agregar')
        if (zona == null) { return } // si preciona el boton cancelar paramos la ejecucion del codigo
        zona = zona.trim()
        zona = zona.toUpperCase()
        if (barrio.zonas.indexOf(zona) > -1) {
            alert('La zona ya existe')
            return
        } else {
            barrio.zonas.push(zona)
            const data = { name: barrio.name, zonas: barrio.zonas }
            await addDoc('barrios', barrio.id, data)
            console.log(barrio)
        }
    } catch (error) {
        console.log(error)
    }

}
const eliminarZona = async (barrio) => {
    try {
        let zona = prompt('Cual es la zona que quieres eliminar?')
        if (zona == null) { return } // si preciona el boton cancelar paramos la ejecucion del codigo
        zona = zona.trim()
        zona = zona.toUpperCase()
        if (barrio.zonas.indexOf(zona) > -1) {
            const zonas = barrio.zonas.filter(element => element != zona)
            console.log('zonas que quedan: ' + zonas)
            const data = { name: barrio.name, zonas: zonas }
            await addDoc('barrios', barrio.id, data)
            cargarDatos()

        } else {
            alert('La zona no existe')
            return
        }
    } catch (error) {
        console.log(error)
    }
}
const borrarBarrio = async (id, index) => {
    try {
        if (confirm('¿Estás seguro que deseas eliminar este barrio?')) {
            // Si el usuario hace clic en "Aceptar", realiza la acción
            borrarDoc("barrios", id)
            barrios.value.splice(index, 1)
        } else {
            // Si el usuario hace clic en "Cancelar", no hace nada
        }
    } catch (error) {
        
    }
    
}
</script>

<template>

    <div class=" mt-3 button-group d-flex justify-content-between align-items-center bg-dark">
    <h2 class="m-0 ms-4 text-white">Barrios</h2>
        <button class="btn btn-sm btn-success" @click="agregarBarrio">Agregar Barrio</button>
    </div>
    <table class="table table-sm table-bordered">
        <thead class="table-dark">
            <tr>
                <th>Barrio</th>
                <th>Zonas</th>
            </tr>
        </thead>
        <tbody class="align-middle text-center">
            <tr v-for="(barrio, index) in barrios" :key="index">
                <td><span>{{ barrio.name }}</span> <button class="btn-sm btn-secondary py-0 px-1 float-end"
                        @click="borrarBarrio(barrio.id, index)">Eliminar</button> </td>
                <td>
            <tr class="d-flex justify-content-center">
                <td>
                    <span v-for="(zona, index) in barrio.zonas"> - {{ zona }}</span>
                </td>
            </tr>
            <tr class="d-flex justify-content-center">
                <td>
                    <button class="btn-sm btn-success py-0 px-1" @click="editaZona(barrio)">Agregar Zona</button><button
                        class="btn-sm btn-secondary py-0 px-1" @click="eliminarZona(barrio)">Eliminar Zonas</button>
                </td>
            </tr>
            </td>
            </tr>
        </tbody>

    </table>
</template>
<script setup>
import { ref, onBeforeMount} from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '../stores/adminStore';
import { updateDoc, doc, deleteDoc } from '@firebase/firestore';
import {db} from '../firebaseConfig'
const route= useRoute()
const router= useRouter()
const adminStore=useAdminStore()
const {ctaCte, clientes} =storeToRefs(adminStore)
const cliente = ref(clientes.value.filter(item=>item.id==route.params.id))
cliente.value= {...cliente.value[0]}
const facturas= ref(ctaCte.value.filter(item=>item.dni==cliente.value.id))
const comprobarCliente=()=>{
    if(cliente.value.name){
       
    }
    else{
        router.push('/admin')
    }
}

onBeforeMount(() => {
comprobarCliente();
});
const modificarCta = async (obj) => {
    try {
        const docRef = doc(db, 'facturas', obj.id)
        await updateDoc(docRef,{estado: obj.estado})
        console.log('actualizando ',docRef)
    } catch (error) {
        console.log(error)
    }
}
const eliminarFactura= async(id)=>{
    try {
        await deleteDoc(doc(db,"facturas",id))
        console.log('eliminado ',id)
        ctaCte.value = ctaCte.value.filter(e=> e.id!=id)
        facturas.value = facturas.value.filter(e=> e.id!=id)
    } catch (error) {
        console.log('hubo un error eliminando el documento')
    }
}

</script>
<template>
<h2>
</h2>
 
 <h3>Cliente: {{ cliente.name }}
 <button class=" float-end btn btn-success" @click="router.push('agregarUnaFactura/'+cliente.id)">Agregar Factura</button>
 <button class=" float-end btn btn-warning" @click="router.push('/admin')">Volver</button>
 </h3>

        <table class="table table-warning table-sm table-hover">
        <thead class="table-dark">
            <tr>
                <th>Nombre y Apellido</th>
                <th> Abono </th>
                <th> Precio </th>
                <th>Mes y Año</th>
                <th>Estado</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cta in facturas" :key="cta.id" class="align-middle">
                <td >{{ cta.name }}</td>
                <td >{{ cta.abono }} Megas</td>
                <td >${{ cta.precio }}</td>
                <td >{{ cta.mes }}</td>
                <td ><select v-model="cta.estado" class="form-select form-select-sm align-middle" @change="modificarCta(cta)">
                        <option value="Pagado">Pagado</option>
                        <option value="Verificando Pago">Verificando Pago</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Vencido">Vencido</option>
                        <option value="Sin Cargo">Sin Cargo</option>
                    </select></td>
                <td ><button class="btn btn-danger btn-sm " @click="eliminarFactura(cta.id)">
                Eliminar
                </button></td>
            </tr>
        </tbody>

    </table>
        
    
</template>
<script setup>
import { ref, onBeforeMount} from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '../stores/adminStore';
import { updateDoc, doc } from '@firebase/firestore';
import {db} from '../firebaseConfig'
const route= useRoute()
const router= useRouter()
const adminStore=useAdminStore()
const {ctaCte, clientes} =storeToRefs(adminStore)
const cliente = ref(clientes.value.filter(item=>item.id==route.params.id))
cliente.value= {...cliente.value[0]}
const facturas= ctaCte.value.filter(item=>item.dni==cliente.value.id)
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

</script>
<template>
<h2>
</h2>
<h3>Cliente: {{ cliente.name }}</h3>

        <table class="table table-warning table-sm table-hover">
        <thead class="table-dark">
            <tr>
                <th>Nombre y Apellido</th>
                <th> Abono </th>
                <th> Precio </th>
                <th>Mes y Año</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cta in facturas" :key="cta.id" class="align-items-center">
                <td>{{ cta.name }}</td>
                <td>{{ cta.abono }} Megas</td>
                <td>${{ cta.precio }}</td>
                <td>{{ cta.mes }}</td>
                <td><select v-model="cta.estado" class="form-select form-select-sm" @change="modificarCta(cta)">
                        <option value="Pagado">Pagado</option>
                        <option value="Verificando Pago">Verificando Pago</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Vencido">Vencido</option>
                    </select></td>
            </tr>
        </tbody>

    </table>
        
    
</template>
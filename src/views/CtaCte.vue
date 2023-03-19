<script setup>
import { useFirebaseHook } from '../composables/useFirebase';
import { useRoute, useRouter } from 'vue-router';
import { ref, onBeforeMount} from 'vue';


const firebase = useFirebaseHook()
const {cargarCtaCte}=firebase
const route= useRoute()
const router= useRouter()
const cliente=route.params.id

const facturas=ref('')

const cargarFacturas = async()=>{
    try {
        facturas.value = await cargarCtaCte(route.params.id)
        console.log(facturas.value)
        if (facturas.value.length==0){
            router.push('/admin')
        }
    } catch (error) {
        console.log(error)
    }
}
onBeforeMount(() => {
    cargarFacturas()
})

</script>
<template>
    {{ cliente }}
Facturas:

<ul>
<li v-for="( factura, index) in facturas" :key="index">
{{ factura.mes }} - {{ factura.anio }} - {{ factura.estado }}
</li>
</ul>
        
    
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '../stores/adminStore';
import { updateDoc, doc,addDoc,collection } from '@firebase/firestore';
import { db } from '../firebaseConfig'
const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const { ctaCte, clientes, abonos } = storeToRefs(adminStore)
const cliente = ref(clientes.value.filter(item => item.id == route.params.id))
cliente.value = { ...cliente.value[0] }
const comprobarCliente = () => {
    if (cliente.value.name) {

    }
    else {
        router.push('/admin')
    }
}

onBeforeMount(() => {
    comprobarCliente();
});
const ctaCteNueva = ref({})
ctaCteNueva.value = {
    name: cliente.value.name,
    dni: cliente.value.id,
    abono: "",
    precio: null,
    mes: "Concepto",
    estado: "Pendiente"
}
const agregarFactura = () => {
    // Definimos los datos del pago

    async function subirAML(cliente) {
        const paymentData = {
            items: [
                {
                    title: `Servicio de Internet ${ctaCteNueva.value.mes}`,
                    quantity: 1,
                    description: `${ctaCteNueva.value.mes}`,
                    currency_id: 'ARS',
                    unit_price: Number(ctaCteNueva.value.precio),
                },
            ],
            external_reference: cliente.id,
            auto_return: 'all',
            back_urls: {
                failure:
                    'https://pagos.santiagonet.com.ar/pago',
                pending:
                    'https://pagos.santiagonet.com.ar/pago',
                success:
                    'https://pagos.santiagonet.com.ar/pago',
            }
        };
        try {
            const response = await fetch('https://api.mercadopago.com/checkout/preferences',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer APP_USR-8339804475849150-032217-a6db7bf1214748e98287073dbb5742e3-91771248',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(paymentData)
                }
            )
            const data = await response.json()
            console.log('Id de mercadolibre' + data.id + ' ClienteId: ' + cliente.id)
            const docRef = doc(db, 'facturas', cliente.id)
            await updateDoc(docRef, { mlId: data.id })
            console.log('Cargado a ML y  guardado id en base de datos')
        } catch (error) {
            console.log(error)
        }
    }
    async function cargar() {
        try {
            const docRef = await addDoc(collection(db, "facturas"), ctaCteNueva.value)
            console.log(docRef)
            ctaCte.value.push({ id: docRef.id, ...ctaCteNueva.value })
            console.log('Documento cargado con la id: ', docRef.id)
            subirAML(docRef)
            router.push('/cta-cte/'+cliente.value.id)
        } catch (error) {
            console.log(error)
        }
    }
    cargar()
    console.log(ctaCteNueva)
}
</script>
<template>
    <h2>
    </h2>

    <h3>Cliente: {{ cliente.name }}
        <button class=" float-end btn btn-warning" @click="router.go(-1)">Volver</button>
    </h3>

    <div class="container">
        Formulario Creacion de Factura

        {{ ctaCteNueva }}
        <div class="row">
            <div class="col-6">

                <form class="mx-auto" @submit.prevent="agregarFactura()">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Concepto</label>
                        <input class="form-control" id="exampleFormControlTextarea1" :placeholder="ctaCteNueva.mes" v-model="ctaCteNueva.mes">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlSelect1" class="form-label">Abono</label>
                        <select class="form-select" aria-label="Default select example" v-model="ctaCteNueva.abono">
                            <option selected value="">Seleccione una opcion...</option>
                            <option value="Especial">Especial</option>
                            <option v-for="(abono,index) in abonos" :key="index" :value="abono.name">{{ abono.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlSelect1" class="form-label">Estado</label>
                        <select class="form-select" aria-label="Default select example" v-model="ctaCteNueva.estado">
                            <option value="Pagado">Pagado</option>
                            <option value="Verificando Pago">Verificando Pago</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencido">Vencido</option>
                            <option value="Sin Cargo">Sin Cargo</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Precio</label>
                        <input type="number" step=".01" class="form-control" id="precio"
                            placeholder="Ingrese el monto" v-model="ctaCteNueva.precio">
                    </div>

                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>


            </div>

        </div>
    </div>
</template>
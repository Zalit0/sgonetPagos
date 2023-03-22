<script setup>
import { db } from '../firebaseConfig'
import { addDoc, collection, updateDoc, doc } from '@firebase/firestore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAdminStore } from '../stores/adminStore';

const adminStore = useAdminStore()
const { clientes, abonos, ctaCte } = storeToRefs(adminStore)
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
const hoy = new Date()
let anioActual = Number(hoy.getFullYear())
let anioAnterior = anioActual - 1
let anioSiguiente = anioActual + 1
const anios = [anioAnterior, anioActual, anioSiguiente]
const mes = ref(meses[hoy.getMonth() + 1])
const anio = ref(Number(anioActual))


const agregarFacturas = () => {
    const vto = mes.value + anio.value

    if (ctaCte.value.some(item => item.mes == vto)) {
        alert('El vto que estas intentando agregar masivamente ya existe')
        return
    } else {
        clientes.value.forEach(cliente => {
            let ctaCteNueva = {}
            let abono = abonos.value.filter(element => element.id == cliente.abono)
            ctaCteNueva = {
                name: cliente.name,
                dni: cliente.id,
                abono: cliente.abono,
                precio: abono[0].precio,
                mes: vto,
                estado: "Pendiente"
            }
            async function cargar() {
                const docRef = await addDoc(collection(db, "facturas"), ctaCteNueva)
                console.log('Documento cargado con la id: ', docRef.id)
                try {

                } catch (error) {
                    console.log(error)
                }
            }
            cargar()
            console.log(ctaCteNueva)
        });

    }
}
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
    <div class="input-group input-group-sm mt-2">
        <select class="form-select" aria-label="Elije un Mes" v-model="mes">
            <option v-for="(item, index) in meses" :key="index" :value="item">{{ item }}</option>
        </select>
        <select class="form-select" aria-label="Elije un año" v-model="anio">
            <option v-for="(item, index) in anios" :value="item">{{ item }}</option>
        </select>
        <button class="btn btn-warning shadow-none m-0 " @click="agregarFacturas">Agregar Facturas</button>
    </div>
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
        <template v-for="cta in ctaCte" :key="cta.id">
            <tr v-if="cta.estado!='Pagado'" class="align-items-center">
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
        </template>
        </tbody>

    </table>
</template>
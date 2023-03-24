<script setup>
import { ref, onBeforeMount } from 'vue';
import {db} from '../firebaseConfig'
import {doc, updateDoc} from 'firebase/firestore'

const props = defineProps(['cta'])
const estado = ref(props.cta.estado)
const pago= ref(null)

const checkPaymentStatus = async (paymentId) => {
  return fetch(`https://api.mercadopago.com/v1/payments/search?external_reference=${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer APP_USR-8339804475849150-032217-a6db7bf1214748e98287073dbb5742e3-91771248`,
    }
  })
    .then(response => response.json())
    .then(data => {
      // Devolvemos el estado del pago (aprobado o rechazado)
      return data.results[0].status;
    })
    .catch(error => {
      console.error('Error checking payment status:', error);
      throw error;
    })
}

const comprobarPago=async()=>{
    if (props.cta.estado=='PendienteML'){
        console.log('consultando estado del pago en Mercadopago')
          checkPaymentStatus(props.cta.id)
          .then(status => {
            // Actualizamos el estado del pago en la UI
            if(status=='approved'){
                updateDoc(doc(db,'facturas',props.cta.id),{estado: 'Pagado'})
                estado.value='Pagado'
                console.log('modificando', status);
            }else {
                updateDoc(doc(db,'facturas',props.cta.id),{estado: 'Pendiente'})
                console.log('modificando', status);
            }
          })
          .catch(error => {
            console.log('Error checking payment status:', error);
          })
        
      }
}
onBeforeMount(() => {
    comprobarPago()
})
const actualizarEstado = async (obj) => {
    try {
        const docRef = doc(db, 'facturas', obj.id)
        await updateDoc(docRef, { estado: 'PendienteML' })
        console.log('actualizando ', docRef)
    } catch (error) {
        console.log(error)
    }
}

const informarPago=(cta)=>{
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

     window.open(`https://api.whatsapp.com/send?phone=+543855212030&text=Quiero%20informar%20el%20pago%20del%20Cliente%20${cta.name}%20correspondiente%20al%20mes%20${cta.mes}%20del%20abono%20${cta.abono}%20MEGAS%20con%20vencimiento%20el%20dia%206%20de%20${cta.mes}`, "Informar Pago", params);
}

const createPayment=async (cta)=>{
    if(confirm('Te estamos por dirigir a la pagina de mercadopago.. una vez realizado el pago retornaras automaticamente a nuestro sitio')){
        try {
            await actualizarEstado(cta)
            window.open(`https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?preference-id=${cta.mlId}`, '_self')
            
        } catch (error) {
            console.log(error)
        }
}
}
</script>
<template>
    <div class="item-wrapper">
        <div class="item-img">
            <img :src="`/img/${cta.abono}MEGAS.jpg`" alt="SGONET DIGITAL">
        </div>
        <div class="item-content">
            <h3 class="item-title mbr-fonts-style display-9 color-success"><strong>{{ cta.mes }}</strong></h3>

            <p class="mbr-text mbr-fonts-style mt-3 display-7"><strong>Vencimiento</strong>: 06 de {{ cta.mes }}<br><strong>ABONO {{
                cta.abono }} MEGAS</strong>: ${{ cta.precio }}&nbsp;<br><strong>NOTA</strong>: Si abonaste por transferencia por favor envía el comprobante de pago haciendo click en el boton de "Informar Pago"</p>
        </div>
        <div class="mbr-section-btn item-footer mt-2"><div v-if="estado == 'Pendiente'" class="input-group">
         <button class="btn item-btn btn-success display-7 text-transform-capitalize" @click="createPayment(cta)"> Pagar </button>  
         <button class="btn item-btn btn-sm btn-black display-7 text-transform-capitalize" @click="informarPago(cta)"> Informar Pago </button>  
         </div>
            <button class="btn item-btn btn-black display-7 text-transform-capitalize" v-else-if="estado != 'Pagado'">{{ estado }} </button>  <button class="btn item-btn btn-black display-7 text-transform-capitalize" v-else disabled>Pagado</button></div>
            {{ pago }}
    </div>
</template>
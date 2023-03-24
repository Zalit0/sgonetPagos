<script setup>
import { db } from "../firebaseConfig";
import { updateDoc, doc } from '@firebase/firestore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import router from '../router';
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore();
const { cliente } = storeToRefs(userStore);

const route = useRoute();

const irPanelCliente=()=>{
  cliente.value = JSON.parse(localStorage.getItem('cliente'))
  router.push('/client-area')
}
// const checkPaymentStatus = async (paymentId) => {
//   return fetch(`https://api.mercadopago.com/v1/payments/search?external_reference=clupWGaubl3fY98CKKKq`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer TEST-1832942212664586-032214-893fff97eba29660b6e2b634a5d13443-1333094029`,
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Devolvemos el estado del pago (aprobado o rechazado)
//       return data;
//     })
//     .catch(error => {
//       console.error('Error checking payment status:', error);
//       throw error;
//     })
// }

// if(true){
//   checkPaymentStatus('1313515589')
//   .then(status => {
//     // Actualizamos el estado del pago en la UI
//     console.log('Pago', status);
//   })
//   .catch(error => {
//     console.error('Error checking payment status:', error);
//   })
// }
  
const status=route.query.status
const idDoc=route.query.external_reference
if(status=='approved'){
   const docRef= doc(db,'facturas',idDoc)
   updateDoc(docRef,{estado: 'Pagado'})
   console.log('documento actualizado')
}else{
  const docRef= doc(db,'facturas',idDoc)
   updateDoc(docRef,{estado: 'Pendiente'})
   console.log('documento actualizado')
}

</script>

<template>
  <div class="row">
  <div class="row" v-if="status=='rejected'">
    <div class="col-md-12">
      <p><img src="https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-no.jpg" alt="Pago Rechazado"></p>
    </div>
  </div>
  <div align="row" v-else-if ="status=='approved'">
    <div class="col-md-12">
      <p><img src="https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-ok.jpg" alt="Pago Ok"></p>
    </div>
  </div>
  <div align="row" v-else-if =" status=='pending'">
    <div class="col-md-12">
      <p><img src="https://www.santiagonet.com.ar/sitio/pagos/mercadopago-pago-proceso.jpg" alt="Pago en Proceso"></p>
    </div>
  </div>
  <div class="row d-flex justify-content-center">
  <div class="col-md-6 d-flex justify-content-center">
  <button class="btn btn-success" @click="irPanelCliente">Volver a su apartado Privado</button>
  </div>
  </div>
  </div>
</template>
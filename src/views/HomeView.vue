<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { getCliente } = userStore
const {cliente}=storeToRefs(userStore)
const dni = ref(null)
const obtenerCliente=async (dni)=>{
  await getCliente(dni)
    if(cliente.value){
      
    }else{
    alert('El DNI no corresponde a un abonado en Servicio')
  }
}
// const client = ref(null);
// const getClient = async () => {
//   const q = query(collection(db, 'clientes/28898654/facturas'), );
//   try {
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       console.log('cargando el cliente a la variable reactiva');
//       client.value = {
//         id: doc.id,
//         ...doc.data(),
//       };
//       console.log(client.value);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
// getClient();

</script>

<template>
  <div class="container p-5" >
  <div class="row">
  <div class="col-12 text-center">
  <h1 >Por favor ingrese el numero de DNI del abonado.</h1>
  </div>
  </div>
  <form @submit.prevent="obtenerCliente(dni)">
  <div class="row justify-content-center">
  <div class=" col-md-12 col-xl-4">
  <input type="text" v-model="dni" class="form-control" placeholder="Ingrese su DNI" aria-label="Ingrese su DNI" aria-describedby="button-addon2">
  </div>
  <div class="col-md-12 col-xl-2 d-grid gap-2">
    <button class="btn btn-primary" :disabled="!dni">Ingresar</button>
  </div>
  </div>
  </form>
  </div>
</template>

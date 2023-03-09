import { defineStore } from 'pinia';
// import {db} from '../firebaseConfig';
// import {query,getDoc,doc,where}from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseHook } from '../composables/useFirebase';

export const useUserStore = defineStore('users', () => {
  const Firebase= useFirebaseHook()
  const {getSingle,resultado} = Firebase
  const cliente=ref(null)
  const router= useRouter()
  const loading=ref(false)

  async function getCliente(dni) {
    try {
    await getSingle('clientes', dni);
    console.log(resultado.value);
    cliente.value = resultado.value;
    console.log(cliente.value);
    if(cliente.value.abono){
      getSingle('abonos',cliente.value.abono)
    }
    } catch (error) {
    }
    
    
    }

// // Obtenemos el documento donde se encuentra la informacion del cliente
// const getCliente=async(dni)=>{
//   dni=dni.trim()
// const docRef=doc(db,'clientes', dni)
//   try {
//   const docSnapshot= await getDoc(docRef)
// if(docSnapshot.exists()){
//   loading.value=true
//   cliente.value={id:docSnapshot.id,...docSnapshot.data()}
//   const abono=await getDoc(doc(db,'abonos',cliente.value.abono))
//   cliente.value.abono=abono.data().name
//   router.push('/client-area')
  
// }else{

//   const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  
//   const alert = (message, type) => {
//     const wrapper = document.createElement('div')
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       '</div>'
//     ].join('')
    
//     alertPlaceholder.append(wrapper)
//   }
//   alert('!El numero de documento no corresponde a un abonado en servicio!', 'danger')
// }
// } catch (error) {
//   console.log(error)
// }finally{
//   loading.value=false
// }
// }

//Hacemos el Reset
function $reset(){
  cliente.value= null
  router.push('/')
}


  return { cliente,getCliente,$reset,loading };
});

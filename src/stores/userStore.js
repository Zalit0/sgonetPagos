import { defineStore } from 'pinia';
// import {db} from '../firebaseConfig';
// import {query,getDoc,doc,where}from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseHook } from '../composables/useFirebase';
import { useAdminStore } from './adminStore';

export const useUserStore = defineStore('users', () => {
  const adminStore=useAdminStore()
  const {loginAdmin}=adminStore
  const Firebase = useFirebaseHook();
  const { getSingle} = Firebase;
  const cliente = ref(null);
  const router = useRouter();
  const loading = ref(false);

  async function getCliente(dni) {
    loading.value = false;
    if(dni.trim()=='info@opticacroma.com.ar'){
      dni=dni.trim()
      const login= await loginAdmin(dni)
      if(login){
        alert('ud no es admin')
      }
    }else{

      try {
        cliente.value=await getSingle('clientes', dni);
        if (cliente.value) {
          const resultado = await getSingle('abonos', cliente.value.abono);
          cliente.value.abono = resultado.name;
          router.push('/client-area');
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
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
  function $reset() {
    cliente.value = null;
    router.push('/');
  }

  return { cliente, getCliente, $reset, loading };
});

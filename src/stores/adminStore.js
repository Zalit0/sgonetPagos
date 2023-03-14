import { defineStore } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useFirebaseHook } from "../composables/useFirebase";

export const useAdminStore = defineStore("admin", () => {
  const firebase = useFirebaseHook();
  const { getColeccion} = firebase;
  const clientes = ref([]);
  const barrios=ref([])
  const abonos=ref([])
  
  const cargarClientes = async () => {
    try {
      clientes.value = await getColeccion("clientes");
      } catch (error) {
      console.log(error);
    }
  };
  async function cargarDatos(){
    try{
      barrios.value=await getColeccion('barrios')
      if(barrios){
        abonos.value=await getColeccion('abonos')
      }
    }catch(e){
      console.log(`Error en cargarAbonos ${e}`)
    }
  }
  onBeforeMount(() => {
    cargarClientes();
    cargarDatos()
  });
  
  const ordenar=()=>{
    abonos.value=abonos.value.sort((a,b)=>{
        if (Number(a.precio) < Number(b.precio)) {
    return -1;
  }
  if (Number(a.precio) > Number(b.precio)) {
    return 1;
  }
  return 0;
    });
}

  return { clientes, barrios, abonos, cargarClientes,ordenar };
});

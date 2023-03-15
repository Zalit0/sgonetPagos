import { defineStore } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useFirebaseHook } from "../composables/useFirebase";

export const useAdminStore = defineStore("admin", () => {
  const firebase = useFirebaseHook();
  const { getColeccion, addDoc, borrarDoc} = firebase;
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

  const ordenar=()=>{
    abonos.value=abonos.value.sort((a,b)=>{
        if (Number(a.id) < Number(b.id)) {
    return -1;
  }
  if (Number(a.id) > Number(b.id)) {
    return 1;
  }
  return 0;
    });
}

  async function cargarDatos(){
    try{
      barrios.value=await getColeccion('barrios')
      if(barrios){
        abonos.value=await getColeccion('abonos')
        ordenar()
      }
    }catch(e){
      console.log(`Error en cargarAbonos ${e}`)
    }
  }


  onBeforeMount(() => {
    cargarClientes();
    cargarDatos()
  });
  
const guardarAbono=async ()=>{
    try {
      const consulta=await getColeccion("abonos")
      abonos.value.forEach((abono)=>{
        const even= (element)=>element.id===abono.id
        console.log('Consulta: '+consulta)
        console.log(!consulta.some(even))
        if (!consulta.some(even)) {
          const data={name:abono.name,precio:abono.precio,bajada:abono.bajada,subida:abono.subida}
          addDoc("abonos",abono.id,data)
          console.log(`Abono ${abono.name} Agregado`)
        }        
      })
    } catch (error) {
      alert(error)
    }finally{
      ordenar()
      console.log(abonos.value)
    }
  }

//agregamos un nuevo abono al array abonos
const agregarAbono=()=>{
  //preguntamos la cantidad de megas y la ponemos en el id
  let id=prompt('De cuantos megas es el nuevo abono?');
  id = id.trim()
    while (id == null || /\D/.test(id) || id == "") {
    id = prompt("Solo ingrese numeros. De cuantos megas es el nuevo abono?: ");
  };
    const even = (element) => element.id === id;
    //comprobamos si el Id ya existe
    if(!abonos.value.some(even)){
      
    }
    else{
      alert("El abono ya existe")
      return
    }
    let precio=prompt('Precio?');
    precio = precio.trim()
    while (precio == null || /\D/.test(precio) || precio == "") {
    
    precio = prompt("Solo ingrese numeros. Ingrese el Precio: ");
    };
    let bajada=prompt('Cuantos megas de Bajada?');
    bajada = bajada.trim()
    while (bajada == null || /\D/.test(bajada) || bajada == "") {
    
    bajada = prompt("Solo ingrese numeros. Ingrese los megas de Bajada: ");
    };
    let subida=prompt('Cuantos megas de Subida?');
    subida = subida.trim()
    while (subida == null || /\D/.test(subida) || subida == "") {
    
    subida = prompt("Solo ingrese numeros. Ingrese los megas de Subida: ");
    };
    //el valor colocado es un numero continuamos 
    abonos.value.push({id ,name:id+' Megas',precio,subida,bajada})
    guardarAbono()
  }


const eliminarAbono=(i)=>{
borrarDoc("abonos",i)
  abonos.value=abonos.value.filter(element => element.id != i)
}

  return { clientes, barrios, abonos, cargarClientes,ordenar, eliminarAbono, agregarAbono };
});

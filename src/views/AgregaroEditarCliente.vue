<script setup>
import { ref} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import { useFirebaseHook } from '../composables/useFirebase';
import {db} from '../firebaseConfig'
import {getDoc,doc} from 'firebase/firestore'
import { useAdminStore } from '../stores/adminStore';
import { storeToRefs } from 'pinia';


const route=useRoute()
const router=useRouter()
const firebaseHook = useFirebaseHook();
const {getColeccion, addDoc, customAlert } = firebaseHook;
const adminStore=useAdminStore()
const {clientes, barrios, abonos}=storeToRefs(adminStore)
const {cargarClientes} = adminStore
const zonas= ref(null)
const cliente=ref({id:null,name:null,domicilio:null,barrio:null,zona:null,abono:null,tel:null})
// const name = ref(null);
// const domicilio = ref(null);
// const barrio = ref(null);
// const zona = ref(null);
// const abono = ref(null);
// const tel = ref(null);
const parametros= route.params.id == undefined ? true:false


//Si la ruta tiene parametros comprobamos si existe el cliente
async function comprobarCliente(){
  if(route.params.id!=undefined){
    const consulta = await getDoc(doc(db, "clientes", route.params.id));
      if (consulta.data() == undefined) {
        router.push('/campo-prueba')
        alert('Cliente inexistente')
      } else {
        cliente.value={id:consulta.id,...consulta.data()}
        agregarZona(cliente.value.barrio)
        console.log('El cliente esta listo para ser editado');
      }
}
}
comprobarCliente()

//cargamos un nuevo cliente
async function agregarCliente(id,data){
  try{
    const consulta = await getDoc(doc(db, "clientes", id));
      if (consulta.data() == undefined) {
        await addDoc("clientes",id,data)
        clientes.value.push(data)
        router.push('/campo-prueba')
      } else {
        alert('El DNI ya se encuentra registrado');
      }
  }catch(e){
    console.log(e)
  }
}
//Grabamos modificaciones del cliente en base de datos
async function modificarCliente(id, data){
  try{
      await addDoc("clientes",id,data)
      clientes.value= cargarClientes()
      setTimeout(()=>router.push('/campo-prueba'), 2000 )
      
  }catch (e){
    console.log(e)
  }
}

//quitar espacios
const quitarEspacios=()=>{
  cliente.value.id = cliente.value.id.trim()
};

//agregamos las zonas al Select
const agregarZona=(i)=>{
  barrios.value.forEach(element=>{ 
    if(element.name==i){
      zonas.value=element
  }; 
  })
}

    const agregaroEditar=()=>{
      if (parametros){
        agregarCliente(cliente.value.id,cliente.value)
      }else{
        modificarCliente(cliente.value.id,cliente.value)
        customAlert('El cliente fue editado exitosamente','success')
      }
    }

// async function cargarCliente() {
// try {
// await getSingle('clientes', '28898654');
// console.log(resultado.value);
// cliente.value = resultado.value;
// console.log(cliente.value);
// if(cliente.value.abono){
//   getSingle('abonos',cliente.value.abono)
// }
// } catch (error) {
// }

// }

// cargarCliente()
</script>

<template>
  <h1 class="mt-4" v-if="route.params.id">Editar Cliente</h1>
  <h1 class="mt-4" v-else>Cargar Cliente</h1>
    <hr />
  <form @submit.prevent="agregaroEditar()">
    <div class="form-group">
      <!-- DNI -->
      <label for="id_id" class="control-label fw-bold">DNI</label>
      <input
      required
      :disabled="!parametros"
        v-model="cliente.id"
        @keyup.space="quitarEspacios"
        id="id_id"
        type="text"
        class="form-control"
        placeholder="Numero de Documento"
      />
    </div>
    <div class="form-group">
      <!-- Nombre Completo -->
      <label for="name_id" class="control-label fw-bold">Nombre Completo</label>
      <input
      required
        v-model="cliente.name"
        id="name_id"
        type="text"
        class="form-control"
        placeholder="Apellido y Nombre"
      />
    </div>

      <!-- Domicilio -->
    <div class="form-group">
      <label for="domicilio_id" class="control-label fw-bold">Domicilio</label>
      <input
      required
        id="domicilio_id"
        v-model="cliente.domicilio"
        type="text"
        class="form-control"
        placeholder="Introduce el domicilio de Instalacion"
      />
    </div>
      <div class="row ">
      <!-- Abono -->
  <div class="col-md-4 col-sm-4 col-xs-4">
                 
    <div class="form-group">
     <label for="abono_id" class="control-label fw-bold">Abono</label>
      <select required class="form-control" id="abono_id" v-model="cliente.abono">
        <option v-for="(abono, index) in abonos" :value="abono.id">{{abono.name}} - ${{abono.precio}}</option>
      </select>
     </div>
  </div>
      <!-- Barrio -->
  <div class="col-md-4 col-sm-4 col-xs-4">
    <div class="form-group">
      <label for="barrio_id" class="control-label fw-bold">Barrio</label>
      <select required class="form-control" id="barrio_id" v-model="cliente.barrio"  @change="agregarZona(cliente.barrio)" >
        <option v-for="(barrio,index) in barrios" :key="index" :value="barrio.name">{{barrio.name}}</option>
      </select>
    </div>  
  </div>
      <!-- Zona -->
  <div class="col-md-4 col-sm-4 col-xs-4">
          
    <div class="form-group">
      <label for="zone_id" class="control-label fw-bold">Zona</label>
      <select required v-if="cliente.barrio" class="form-control" id="zona_id"  v-model="cliente.zona">
        <option  v-for="(zona,index) in zonas?.zonas" :key="index" :value="zona">{{zona}}</option>
      </select>
    </div>
   </div>


</div>
      <!-- Telefono-->
    <div class="form-group">
      <label for="tel_id" class="control-label fw-bold">Telefono</label>
      <input
      required
        type="text"
        class="form-control"
        id="tel_id"
        placeholder="Numero de Telefono"
        v-model="cliente.tel"
      />
    </div>

      <!-- Submit Button -->
    <div class="input-group" >
      <button type="submit" class="btn btn-success me-2" v-if="route.params.id" id:>
        Editar Cliente
      </button>
      
      <button type="submit" class="btn btn-success" v-else id:>
        Registrar Nuevo Cliente
      </button>
    <button @click="$router.push('/campo-prueba')" class="btn btn-warning"> Volver </button>
    </div>
  </form>
</template>


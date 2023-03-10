<script setup>
import { ref } from 'vue';
import { useFirebaseHook } from '../composables/useFirebase';
const firebaseHook = useFirebaseHook();
const { getSingle,getColeccion,resultadoArray, resultado } = firebaseHook;
const barrios= ref(null)
const name = ref(null);
const domicilio = ref(null);
const barrio = ref(null);
const zona = ref(null);
const abono = ref(null);
const tel = ref(null);
async function cargarBarrios(){
  try{
await getColeccion('barrios')
barrios.value=resultadoArray.value

  }catch(e){
console.log(`Error en cargarAbonos ${e}`)
  }
}
cargarBarrios()
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
  <h1>Hola Mundo</h1>
  <hr />
  <form>
    <div class="form-group">
      <!-- Nombre Completo -->
      <label for="name_id" class="control-label fw-bold">Nombre Completo</label>
      <input
        v-model="name"
        id="name_id"
        type="text"
        class="form-control"
        placeholder="Apellido y Nombre"
      />
    </div>

    <div class="form-group">
      <!-- Domicilio -->
      <label for="domicilio_id" class="control-label fw-bold">Domicilio</label>
      <input
        id="domicilio_id"
        v-model="domicilio"
        type="text"
        class="form-control"
        placeholder="Introduce el domicilio de Instalacion"
      />
    </div>
      <div class="row ">
        <div class="col-md-4 col-sm-4 col-xs-4">
                 
    <div class="form-group">
      <!-- Abono -->
      <label for="abono_id" class="control-label fw-bold">Abono</label>
      <select class="form-control" id="abono_id">
        <option value="AL">Alabama</option>
      </select>
    </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4">
    <div class="form-group">
      <!-- Barrio -->
      <label for="barrio_id" class="control-label fw-bold">Barrio</label>
      <select class="form-control" id="barrio_id" v-model="barrio">
        <option v-for="(barrio,index) in barrios" :key="index" :value="barrio.name">{{barrio.name}}</option>
      </select>
    </div>  
              </div>
         <div class="col-md-4 col-sm-4 col-xs-4">
          
    <div class="form-group">
      <!-- Zona -->
      <label for="zone_id" class="control-label fw-bold">Zona</label>
      <select v-if="barrio" class="form-control" id="zona_id"  v-model="zona">
        <option  v-for="(zona,index) in barrio.zonas" :key="index" :value="zona">{{zona}}</option>
      </select>
    </div>
              </div>


</div>
    <div class="form-group">
      <!-- Telefono-->
      <label for="tel_id" class="control-label fw-bold">Telefono</label>
      <input
        type="text"
        class="form-control"
        id="tel_id"
        placeholder="Numero de Telefono"
      />
    </div>

    <div class="form-group">
      <!-- Submit Button -->
      <button type="submit" class="btn btn-success" id:>
        Registrar Nuevo Cliente
      </button>
    </div>
  </form>
</template>


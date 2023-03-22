import _default from 'ant-design-vue';
import { defineStore } from 'pinia';
import { ref, onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseHook } from '../composables/useFirebase';

export const useAdminStore = defineStore('admin', () => {
  const firebase = useFirebaseHook();
  const router=useRouter()
  const { getColeccion, addDoc, borrarDoc, iniciarSesion } = firebase;
  const clientes = ref([]);
  const barrios = ref([]);
  const abonos = ref([]);
  const ctaCte = ref([]);
  const loading= ref(false)
  const filtro=ref('')
  const admin=ref(null)



  const cargarClientes = async () => {
    try {
      clientes.value = await getColeccion('clientes');
    } catch (error) {
      console.log(error);
    }
  };

  const ordenar = () => {
    abonos.value = abonos.value.sort((a, b) => {
      if (Number(a.id) < Number(b.id)) {
        return -1;
      }
      if (Number(a.id) > Number(b.id)) {
        return 1;
      }
      return 0;
    });
  };

  async function cargarDatos() {
    loading.value=true
    try {
      clientes.value = await getColeccion('clientes');
      barrios.value = await getColeccion('barrios');
      ctaCte.value= await getColeccion('facturas')
      ctaCte.value = ctaCte.value.sort((a, b) => {
        if (a.mes < b.mes) {
          return -1;
        }
        if (a.mes > b.mes) {
          return 1;
        }
        return 0;
      });
      if (barrios) {
        abonos.value = await getColeccion('abonos');
        ordenar();
      }
    } catch (e) {
      console.log(`Error en cargarAbonos ${e}`);
    }finally{
      loading.value=false
    }
  }

  onBeforeMount(() => {
    cargarDatos();
    });

  const guardarAbono = async () => {
    try {
      const consulta = await getColeccion('abonos');
      abonos.value.forEach((abono) => {
        const even = (element) => element.id === abono.id;
        console.log('Consulta: ' + consulta);
        console.log(!consulta.some(even));
        if (!consulta.some(even)) {
          const data = {
            name: abono.name,
            precio: abono.precio,
            bajada: abono.bajada,
            subida: abono.subida,
          };
          addDoc('abonos', abono.id, data);
          console.log(`Abono ${abono.name} Agregado`);
        }
      });
    } catch (error) {
      alert(error);
    } finally {
      ordenar();
      console.log(abonos.value);
    }
  };

  //agregamos un nuevo abono al array abonos
  const agregarAbono = () => {
    //preguntamos la cantidad de megas y la ponemos en el id
    let id = prompt('De cuantos megas es el nuevo abono?');
    id = id.trim();
    if (id == null) {
      return;
    } // si preciona el boton cancelar paramos la ejecucion del codigo
    while (id == null || /\D/.test(id) || id == '') {
      id = prompt(
        'Solo ingrese numeros. De cuantos megas es el nuevo abono?: '
      );
      if (id == null) {
        return;
      }
    }
    const even = (element) => element.id === id;
    //comprobamos si el Id ya existe
    if (!abonos.value.some(even)) {
    } else {
      alert('El abono ya existe');
      return;
    }
    let precio = prompt('Precio?');
    if (precio == null) {
      return;
    } // si preciona el boton cancelar paramos la ejecucion del codigo
    precio = precio.trim();
    while (precio == null || /\D/.test(precio) || precio == '') {
      precio = prompt('Solo ingrese numeros. Ingrese el Precio: ');
    }
    let bajada = prompt('Cuantos megas de Bajada?');
    if (bajada == null) {
      return;
    } // si preciona el boton cancelar paramos la ejecucion del codigo
    bajada = bajada.trim();
    while (bajada == null || /\D/.test(bajada) || bajada == '') {
      bajada = prompt('Solo ingrese numeros. Ingrese los megas de Bajada: ');
    }
    let subida = prompt('Cuantos megas de Subida?');
    if (subida == null) {
      return;
    } // si preciona el boton cancelar paramos la ejecucion del codigo
    subida = subida.trim();
    while (subida == null || /\D/.test(subida) || subida == '') {
      subida = prompt('Solo ingrese numeros. Ingrese los megas de Subida: ');
    }
    //el valor colocado es un numero continuamos
    abonos.value.push({ id, name: id + ' Megas', precio, subida, bajada });
    guardarAbono();
  };

  const eliminarAbono = (i) => {
    if (confirm('¿Estás seguro que deseas eliminar este abono?')) {
      // Si el usuario hace clic en "Aceptar", realiza la acción
      borrarDoc('abonos', i);
      abonos.value = abonos.value.filter((element) => element.id != i);
    } else {
      // Si el usuario hace clic en "Cancelar", no hace nada
    }
  };

  const agregarBarrio = async () => {
    try {
      let barrio = prompt('Como se llama el barrio?');
      barrio = barrio.trim();
      if (barrio == null) {
        return;
      } // si preciona el boton cancelar paramos la ejecucion del codigo
      let barrioObjeto = { name: barrio };
      barrio = barrio.toLocaleLowerCase();
      barrio = barrio.replace(' ', '-');
      barrioObjeto.id = barrio;
      let zona = prompt('Agrega una zona.');
      if (zona == null) {
        alert('Debes ingresar al menos una zona');
        return;
      } // si preciona el boton cancelar paramos la ejecucion del codigo
      zona = zona.trim();
      barrioObjeto.zonas = [zona.toUpperCase()];
      let loop = true;
      do {
        let zona2 = prompt(
          'Deseas agregar otra zona? Si no quieres agregar mas presiona Cancelar.'
        );
        if (zona2) {
          zona2 = zona2.trim();
          zona2 = zona2.toUpperCase();
          if (barrioObjeto.zonas.indexOf(zona2) > -1) {
            alert('La zona ya existe');
          } else {
            barrioObjeto.zonas.push(zona2);
            zona2 = null;
          }
        } else {
          loop = false;
        }
      } while (loop);
      const constructor = {
        name: barrioObjeto.name,
        zonas: barrioObjeto.zonas,
      };
      await addDoc('barrios', barrioObjeto.id, constructor);
      barrios.value.push(barrioObjeto);
    } catch (error) {
      alert(e);
    }
  };
  const loginAdmin = async(user)=>{
    console.log('iniciando login desde el store de admin')
    let pass=prompt('Ingresa tu contraseña')
    if(pass){
      try {
        const login = await iniciarSesion(user, pass)
        if (login=='error'){
          alert('Error Usuario o Contraseña')
        }
        else{
          admin.value=login
          router.push('/admin')
        }
      } catch (error) {
        
      }
    }else{
      return 'cancel'
    }
  }

  return {
    clientes,
    barrios,
    abonos,
    ctaCte,
    loading,
    admin,
    cargarClientes,
    ordenar,
    eliminarAbono,
    agregarAbono,
    agregarBarrio,
    cargarDatos,
    loginAdmin
  };
});

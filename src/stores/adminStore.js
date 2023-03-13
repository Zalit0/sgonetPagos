import { defineStore } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useFirebaseHook } from "../composables/useFirebase";

export const useAdminStore = defineStore("admin", () => {
  const firebase = useFirebaseHook();
  const { getColeccion, resultadoArray } = firebase;
  const clientes = ref([]);
  const searchQuery = ref("");
  
  const clientesFiltrados = computed(() => {
    clientes.value.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });

  const cargarClientes = async () => {
    try {
      clientes.value = await getColeccion("clientes");
      } catch (error) {
      console.log(error);
    }
  };
  onBeforeMount(() => {
    cargarClientes();
  });
  


  return { clientes, clientesFiltrados };
});

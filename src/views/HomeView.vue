<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, query, where } from 'firebase/firestore';
const userStore = useUserStore();
const { funciona } = userStore;
const client = ref(null);
const getClient = async () => {
  const q = query(collection(db, 'clientes'), where('dni', '==', 28898654));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log('cargando el cliente a la variable reactiva');
      client.value = {
        id: doc.id,
        ...doc.data(),
      };
      console.log(client.value);
    });
  } catch (e) {
    console.log(e);
  }
};
getClient();
</script>

<template>
  <h1>Hola Mundo</h1>
  {{ funciona }}
  {{ client?.id }}
  {{ client?.name }}
</template>

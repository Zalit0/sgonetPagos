import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { ref } from 'vue';
import { db } from '../firebaseConfig';
const resultado = ref(null);
const resultadoArray = ref([]);

export const useFirebaseHook = () => {
  const customAlert = (msj, tipo) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const alert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');

      alertPlaceholder.append(wrapper);
    };
    alert(msj, tipo);
  };
  const getColeccion = async (coleccion) => {
    const q = query(collection(db, coleccion));
    try {
      resultadoArray.value = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resultadoArray.value.push({ id: doc.id, ...doc.data() });
      });
      return resultadoArray.value
    } catch (e) {
      alert(e);
    }
  };
  const getSingle = async (coleccion, docID) => {
    try {
      const docRef = doc(db, coleccion, docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resultado.value = { id: docSnap.id, ...docSnap.data() };
      } else {
        const alertPlaceholder = document.getElementById(
          'liveAlertPlaceholder'
        );

        const alert = (message, type) => {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>',
          ].join('');

          alertPlaceholder.append(wrapper);
        };
        if ((coleccion = 'clientes')) {
          alert(
            '!El numero de documento no corresponde a un abonado en servicio!',
            'danger'
          );
        } else if ((coleccion = 'abonos')) {
          alert('!El abono introducido no existe!', 'danger');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const addDoc = async (coleccion, docID, obj) => {
    try {
      const cliente = doc(db, coleccion, docID);
      await setDoc(cliente, obj);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getColeccion,
    getSingle,
    resultado,
    addDoc,
    customAlert,
  };
};

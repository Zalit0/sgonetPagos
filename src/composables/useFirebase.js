import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref } from 'vue';
import { db } from '../firebaseConfig';
const resultado = ref(null);


export const useFirebaseHook = () => {
  const customAlert = (msj, tipo) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const alert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>',
        '</div>',
      ].join('');

      alertPlaceholder.append(wrapper);
    };
    alert(msj, tipo);
   
  };
  const getColeccion = async (coleccion) => {
    const q = query(collection(db, coleccion));
    try {
      let resultadoArray=[]
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resultadoArray.push({ id: doc.id, ...doc.data() });
      });
      return resultadoArray
    } catch (e) {
      alert(e);
    }
  };
  const getSingle = async (coleccion, docID) => {
    try {
      const docRef = doc(db, coleccion, docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('returnando objeto')
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("returnando false")
        return false    
        };
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
  const borrarDoc = async (coleccion, docID)=>{
    try {
      deleteDoc(doc(db,coleccion,docID))
      console.log('documento Borrado')
    } catch (error) {
      alert("El documento no pudo eliminarse "+error)
    }
  }

  return {
    getColeccion,
    getSingle,
    resultado,
    addDoc,
    customAlert,
    borrarDoc
  };
};

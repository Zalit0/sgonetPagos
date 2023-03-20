import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { db, auth } from "../firebaseConfig";
import { useAdminStore } from "../stores/adminStore";
import { storeToRefs } from "pinia";



export const useFirebaseHook = () => {
  const adminStore=useAdminStore()
  const {admin}=storeToRefs(adminStore)
  const resultado = ref(null);


  const customAlert = (msj, tipo) => {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

    const alert = (message, type) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    };
    alert(msj, tipo);
  };
  const getColeccion = async (coleccion) => {
    const q = query(collection(db, coleccion));
    try {
      let resultadoArray = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resultadoArray.push({ id: doc.id, ...doc.data() });
      });
      return resultadoArray;
    } catch (e) {
      alert(e);
    }
  };
  const getSingle = async (coleccion, docID) => {
    try {
      const docRef = doc(db, coleccion, docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("returnando objeto");
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("returnando false");
        return false;
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
  const borrarDoc = async (coleccion, docID) => {
    try {
      deleteDoc(doc(db, coleccion, docID));
      console.log("documento Borrado");
    } catch (error) {
      alert("El documento no pudo eliminarse " + error);
    }
  };
  const cargarCtaCte = async (cliente)=>{
    const q = query(collection(db, `clientes/${cliente}/facturas`));
    try {
      let resultadoArray = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resultadoArray.push({ id: doc.id, ...doc.data() });
      });
      return resultadoArray;
    } catch (e) {
      alert(e);
    }
};
const iniciarSesion=async (usuario, pass)=>{
  try {
    const { user } = await signInWithEmailAndPassword( auth,
      usuario,
      pass
  );
  console.log(user.email+''+user.uid)
  return user.email    
  } catch (error) {
    console.log(error)
    return 'error'
  }
};
const cerrarSesion=async ()=>{
  try {
    await signOut(auth)
    admin.value=null

  } catch (error) {
    console.log('error al cerrar sesion: '+error)
  }
};
const currentUser=()=>{
  return new Promise((resolve, reject) => {
      const unsubcribe = onAuthStateChanged(
          auth,
          (user) => {
              if (user) {
                  admin.value = user.email
              }
              resolve(user);
          },
          (e) => reject(e)
      );
      // Según la documentación, la función onAuthStateChanged() devuelve
      // La función de cancelación de suscripción para el observador
      unsubcribe();
    });
  }

  return {
    getColeccion,
    getSingle,
    resultado,
    addDoc,
    customAlert,
    borrarDoc,
    cargarCtaCte,
    iniciarSesion,
    cerrarSesion,
    currentUser
  };
};

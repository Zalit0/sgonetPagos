import { getDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';
import { db } from '../firebaseConfig';
const resultado=ref(null)

export const useFirebaseHook = () => {

  const getSingle = async (coleccion, docID) => {
    try {
      const docRef = doc(db, coleccion, docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resultado.value = {id:docSnap.id,...docSnap.data()}
      } else {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  
        const alert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          
          alertPlaceholder.append(wrapper)
        }
        if(coleccion='clientes'){
        alert('!El numero de documento no corresponde a un abonado en servicio!', 'danger')
        }else if(coleccion='abonos'){
          alert('!El abono introducido no existe!', 'danger')
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { getSingle,resultado };
};

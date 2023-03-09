import { getDoc, doc } from 'firebase/firestore';
import { storeToRefs } from 'pinia';
import { db } from '../firebaseConfig';
import { useComposablesStore } from '../stores/composablesStore';

export const useFirebaseHook = async () => {
  const composablesStore = useComposablesStore;
  const { singleDoc } = storeToRefs(composablesStore);

  const getSingle = async (coleccion, docID) => {
    try {
      const docRef = doc(db, coleccion, docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(doc.data());
      } else {
        alert('el documento no existe');
      }
    } catch (e) {
      console.log(error);
    }
  };

  return { getSingle };
};

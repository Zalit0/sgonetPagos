// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2qrWGF5QhD2bPhjhFz9WJEEqfy7LCkiE',
  authDomain: 'santiagonet-pagos.firebaseapp.com',
  projectId: 'santiagonet-pagos',
  storageBucket: 'santiagonet-pagos.appspot.com',
  messagingSenderId: '126153446968',
  appId: '1:126153446968:web:3fdcb405ba0f7b5b7478cd',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };

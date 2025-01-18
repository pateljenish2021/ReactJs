import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDCNr0eS1Bcg-8-ICRjBwdhMVMmQIUFHL8",
  authDomain: "bank-app-2c70d.firebaseapp.com",
  projectId: "bank-app-2c70d",
  storageBucket: "bank-app-2c70d.firebasestorage.app",
  messagingSenderId: "658507496919",
  appId: "1:658507496919:web:1ab93553a0354516575f92"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;
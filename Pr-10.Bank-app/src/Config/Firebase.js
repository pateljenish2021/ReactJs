
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider, FacebookAuthProvider,  GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAW6icZ3V1WSwUrbPliU35VlftKlH6vxo",
  authDomain: "jajja-bank-app.firebaseapp.com",
  projectId: "jajja-bank-app",
  storageBucket: "jajja-bank-app.appspot.com",
  messagingSenderId: "165227390733",
  appId: "1:165227390733:web:ed1898ba92d34b85ac3244",
  measurementId: "G-EHHKQ561B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
export {auth, analytics,firestore,provider,facebookProvider,githubProvider};

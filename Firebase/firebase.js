// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoR-OSIW296NvRN__1p9u-aDlOR_IEDAQ",
  authDomain: "reproductor-d06c1.firebaseapp.com",
  projectId: "reproductor-d06c1",
  storageBucket: "reproductor-d06c1.appspot.com",
  messagingSenderId: "782203489444",
  appId: "1:782203489444:web:40f2131cb7b7627d45aa31"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoc4GOs26_brDOuO_06r8gEIpXdawnyvE",
  authDomain: "solo-c9c9d.firebaseapp.com",
  projectId: "solo-c9c9d",
  storageBucket: "solo-c9c9d.firebasestorage.app",
  messagingSenderId: "635582598242",
  appId: "1:635582598242:web:40ab8b002875e28ae8d53b",
  measurementId: "G-C53WPQYDJE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbZL5_Mmtdg5DdLTY5i0Mu21sf_03lLxY",
  authDomain: "notion-clone-db100.firebaseapp.com",
  projectId: "notion-clone-db100",
  storageBucket: "notion-clone-db100.firebasestorage.app",
  messagingSenderId: "76385022635",
  appId: "1:76385022635:web:f3852a279359b644407dee",
  measurementId: "G-R58T5XNX9P"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore(app)

// Export instance of Firebase Database
export { db }
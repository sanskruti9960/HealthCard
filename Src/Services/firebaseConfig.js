// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKwPZstPGtVuL7qbWKK07LW1KDLAqDQgA",
  authDomain: "internpro-e969e.firebaseapp.com",
  projectId: "internpro-e969e",
  storageBucket: "internpro-e969e.appspot.com",
  messagingSenderId: "678464281008",
  appId: "1:678464281008:web:97cee81e6d2bd54cb39e75",
  measurementId: "G-HY93SK54FN"
};

// ✅ initialize only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

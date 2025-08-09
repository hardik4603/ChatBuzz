// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatbuzz-83e83.firebaseapp.com",
  projectId: "chatbuzz-83e83",
  storageBucket: "chatbuzz-83e83.firebasestorage.app",
  messagingSenderId: "729363499714",
  appId: "1:729363499714:web:4610e1e8f6b7f79ad6495b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
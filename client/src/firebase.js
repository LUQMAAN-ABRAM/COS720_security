// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cos720-c218a.firebaseapp.com",
  projectId: "cos720-c218a",
  storageBucket: "cos720-c218a.appspot.com",
  messagingSenderId: "123488605275",
  appId: "1:123488605275:web:766c2a6ef1fb04e9785b7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
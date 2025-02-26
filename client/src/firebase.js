// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e7507.firebaseapp.com",
  projectId: "mern-estate-e7507",
  storageBucket: "mern-estate-e7507.firebasestorage.app",
  messagingSenderId: "1088506309967",
  appId: "1:1088506309967:web:3587f2d7d05940bf72a93a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log(app);

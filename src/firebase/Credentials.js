// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3V0x1vcKGbQ3VaPwrnlpizr05dZwqRYA",
  authDomain: "tpilab33.firebaseapp.com",
  projectId: "tpilab33",
  storageBucket: "tpilab33.appspot.com",
  messagingSenderId: "978365715595",
  appId: "1:978365715595:web:571d36812b5934ffcc308e",
  measurementId: "G-YJ6QWT1R19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);

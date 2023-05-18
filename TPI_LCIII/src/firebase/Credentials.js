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
  apiKey: "AIzaSyBIrrwcVaPH4vdtkIWl2rOzU2LGeEJZZnk",
  authDomain: "tpii-cuenta2.firebaseapp.com",
  projectId: "tpii-cuenta2",
  storageBucket: "tpii-cuenta2.appspot.com",
  messagingSenderId: "294754356168",
  appId: "1:294754356168:web:85ae87b95239e6a6df8efd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLKEBJhhC6e_aKjLG6UmKDq-7oJxpIKJU",
  authDomain: "tpi-labiii.firebaseapp.com",
  projectId: "tpi-labiii",
  storageBucket: "tpi-labiii.appspot.com",
  messagingSenderId: "601828406842",
  appId: "1:601828406842:web:b29bdaf9317ef8be9a6703",
  measurementId: "G-N285LPRVM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app);

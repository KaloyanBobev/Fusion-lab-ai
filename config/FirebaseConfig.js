// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fusion-lab-ai.firebaseapp.com",
  projectId: "fusion-lab-ai",
  storageBucket: "fusion-lab-ai.firebasestorage.app",
  messagingSenderId: "969141784887",
  appId: "1:969141784887:web:f348afaa9543d236220ab2",
  measurementId: "G-7B4BTEDDCY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFireStore(app, "default");
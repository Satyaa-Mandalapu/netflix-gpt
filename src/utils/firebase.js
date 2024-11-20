// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp3CJl9zkHujtOLlgYxxiBDBPAgKfxrTA",
  authDomain: "netflixgpt-d0e0a.firebaseapp.com",
  projectId: "netflixgpt-d0e0a",
  storageBucket: "netflixgpt-d0e0a.firebasestorage.app",
  messagingSenderId: "212906067042",
  appId: "1:212906067042:web:e3c77b3a903115b01bfd3b",
  measurementId: "G-VZM3MLM0LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
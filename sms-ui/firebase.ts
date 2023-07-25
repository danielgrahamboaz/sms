// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0CcogoW1EvJS-wDoNCOwsTTSKxU_P8v0",
    authDomain: "scolar-42492.firebaseapp.com",
    projectId: "scolar-42492",
    storageBucket: "scolar-42492.appspot.com",
    messagingSenderId: "540904084064",
    appId: "1:540904084064:web:1c62c6764ecec7328fa905",
    measurementId: "G-MJ3PF57SP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
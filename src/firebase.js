// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnWNayavYEw73BLy8qZn2rlGiKGJM7u24",
    authDomain: "teller-app-659a2.firebaseapp.com",
    projectId: "teller-app-659a2",
    storageBucket: "teller-app-659a2.appspot.com",
    messagingSenderId: "389685917635",
    appId: "1:389685917635:web:de5d84b5ab0cf7018a6f76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
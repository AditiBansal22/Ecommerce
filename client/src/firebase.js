// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYpybRFI7CfaAzjDrXCaZIPZLhnBlTpBE",
  authDomain: "ecommerce-b513f.firebaseapp.com",
  projectId: "ecommerce-b513f",
  storageBucket: "ecommerce-b513f.appspot.com",
  messagingSenderId: "870726059858",
  appId: "1:870726059858:web:96420f9f7b0f5134345c8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
onAuthStateChanged(auth, (user) => {
 // deal with authentication changes 
});

 export const googleAuthProvider =  new GoogleAuthProvider();
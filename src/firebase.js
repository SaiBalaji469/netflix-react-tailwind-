// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnBv3R4QzFxiJshXhuAIHkM7lucRe6MLM",
  authDomain:  "netflix-react-6777e.firebaseapp.com",
  projectId:  "netflix-react-6777e",
  storageBucket:  "netflix-react-6777e.appspot.com",
  messagingSenderId:  "263346144692",
  appId: "1:263346144692:web:2176282e93fb7685f01ee1",
  // measurementId: "G-VNWRSF1B2V"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const db = getFirestore(app);
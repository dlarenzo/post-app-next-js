require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// NEXT_PUBLIC_API_KEY = "AIzaSyDPZk8v72BIDq-DbkZyNq-wwvERDig0QuU";
// NEXT_PUBLIC_AUTH_DOMAIN = "post-app-f1227.firebaseapp.com";
// (NEXT_PUBLIC_PROJECT_ID = "post-app-f1227"),
//   (NEXT_PUBLIC_STORAGE_BUCKET = "post-app-f1227.appspot.com");
// NEXT_PUBLIC_MESSAGING_SENDER_ID = "132703251195";
// NEXT_PUBLIC_APP_ID = "1:132703251195:web:e625286c22a4cf7257de5e";

const firebaseConfig = {
  apiKey: "AIzaSyDPZk8v72BIDq-DbkZyNq-wwvERDig0QuU",
  authDomain: "post-app-f1227.firebaseapp.com",
  projectId: "post-app-f1227",
  storageBucket: "post-app-f1227.appspot.com",
  messagingSenderId: "132703251195",
  appId: "1:132703251195:web:e625286c22a4cf7257de5e",
};

// Initialize Firebase
// const getValue = () => {
//   return console.log(firebaseConfig);
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// getValue();
export { auth, db };

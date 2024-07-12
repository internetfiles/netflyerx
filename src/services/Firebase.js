// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf3qFVtecLVc3IgTA4T_CoYLExVYFQ--g",
  authDomain: "oval-tv-72403.firebaseapp.com",
  databaseURL: "https://oval-tv-72403-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oval-tv-72403",
  storageBucket: "oval-tv-72403.appspot.com",
  messagingSenderId: "185929904872",
  appId: "1:185929904872:web:1b6c36b9903c0e66f10f5d",
  measurementId: "G-57KX0158SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

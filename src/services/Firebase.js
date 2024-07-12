// src/services/Firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCf3qFVtecLVc3IgTA4T_CoYLExVYFQ--g",
  authDomain: "oval-tv-72403.firebaseapp.com",
  projectId: "oval-tv-72403",
  storageBucket: "oval-tv-72403.appspot.com",
  messagingSenderId: "185929904872",
  appId: "1:185929904872:web:1b6c36b9903c0e66f10f5d",
  measurementId: "G-57KX0158SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth
export { auth };

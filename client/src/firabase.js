// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'scholart-8c488.firebaseapp.com',
  projectId: 'scholart-8c488',
  storageBucket: 'scholart-8c488.appspot.com',
  messagingSenderId: '546774216373',
  appId: '1:546774216373:web:6b4bed43057fa3128b18fc',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

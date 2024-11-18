// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'blog-app-710a6.firebaseapp.com',
  projectId: 'blog-app-710a6',
  storageBucket: 'blog-app-710a6.firebasestorage.app',
  messagingSenderId: '628747110476',
  appId: '1:628747110476:web:9ae1483b122e0c9f904ce9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

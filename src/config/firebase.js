import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWRaGnEBfNa2-PzdVdssIxxayfFuvJFOk",
  authDomain: "myanime-8e4f9.firebaseapp.com",
  projectId: "myanime-8e4f9",
  storageBucket: "myanime-8e4f9.firebasestorage.app",
  messagingSenderId: "1079961728778",
  appId: "1:1079961728778:web:7a1225b6ce308a397cacf3",
  measurementId: "G-FQ8E44CP65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK2dOl3-HQI84rBC5ZcSFxBOxXywzVxUw",
  authDomain: "nuwi-play.firebaseapp.com",
  projectId: "nuwi-play",
  storageBucket: "nuwi-play.firebasestorage.app",
  messagingSenderId: "551409827309",
  appId: "1:551409827309:web:21760403b0faab7c8d7be4",
  measurementId: "G-Z7VWBZ4DBM"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);

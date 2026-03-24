import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlxHKNCcndWcq__0mYBStkE0RPDvAEC8s",
  authDomain: "dinner-planner-4f305.firebaseapp.com",
  projectId: "dinner-planner-4f305",
  storageBucket: "dinner-planner-4f305.firebasestorage.app",
  messagingSenderId: "449247924207",
  appId: "1:449247924207:web:778fafbf827921ddc5b01a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

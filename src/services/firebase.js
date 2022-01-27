// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpaYbpewthpqtrpSVb5PhdjBH43TpYs3s",
  authDomain: "fakeflix-1c1d2.firebaseapp.com",
  projectId: "fakeflix-1c1d2",
  storageBucket: "fakeflix-1c1d2.appspot.com",
  messagingSenderId: "984913583197",
  appId: "1:984913583197:web:457fe9ff6b7ec59b8481b4",
  measurementId: "G-0PB2MZ8QCZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
console.log(analytics);

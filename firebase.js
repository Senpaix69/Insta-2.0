// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2JUoj6AT0T5S0VyF70DgcNjN296HzjnA",
  authDomain: "insta-by-senpai.firebaseapp.com",
  projectId: "insta-by-senpai",
  storageBucket: "insta-by-senpai.appspot.com",
  messagingSenderId: "1003166109328",
  appId: "1:1003166109328:web:cc416ccdc4503cb098d215"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
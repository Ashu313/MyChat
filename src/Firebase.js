// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage}from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN4on7CpUXGOYqgdgB67jAcil1IWAjXaM",
  authDomain: "chat-app-51cd3.firebaseapp.com",
  projectId: "chat-app-51cd3",
  storageBucket: "chat-app-51cd3.appspot.com",
  messagingSenderId: "657405318052",
  appId: "1:657405318052:web:981420c00c04900c786731",
  databaseURL:'https://chat-app-51cd3-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore();
export const database=getDatabase(app);
// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Auth
import { getAuth } from "firebase/auth";


// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyACMkYsXGekMnbziGc78QvVhRwgmysFKEQ",
  authDomain: "kisansahay-5bc38.firebaseapp.com",
  projectId: "kisansahay-5bc38",
  storageBucket: "kisansahay-5bc38.firebasestorage.app",
  messagingSenderId: "43050956237",
  appId: "1:43050956237:web:5c296a71032c58d5278084",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// ✅ THIS LINE WAS MISSING
export const auth = getAuth(app);

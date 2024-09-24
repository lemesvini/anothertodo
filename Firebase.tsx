// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVVUnrL9D50rjXOHPYVwnjiTtX89VtcyU",
  authDomain: "anothertodo-6a5e8.firebaseapp.com",
  projectId: "anothertodo-6a5e8",
  storageBucket: "anothertodo-6a5e8.appspot.com",
  messagingSenderId: "688274811350",
  appId: "1:688274811350:web:c54d69436336623dfa5c77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);